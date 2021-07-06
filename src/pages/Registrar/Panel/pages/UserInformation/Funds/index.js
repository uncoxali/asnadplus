import React, { Component } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { cloneDeep } from "lodash";
import InputGroup from "../../../../../../components/InputGroup";
import { notification } from "../../../../../../global/functions";
import { getShowCustomer } from "../../../../../../redux/showCustomer";
import axios from "../../../../../../boot/axios";

class Funds extends Component {
  constructor() {
    super();
    this.state = {
      fundSetting: {
        id: "",
        initial_fund_balance: "",
        finally_fund_inventory: "",
        initail_fund_inventory: "",
        fiscal_year: { id: "", year: "" },
      },
    };
  }
  // اطلاعات صندوق را دریافت میکند
  getAllFundSetting = () => {
    const { city_class_member } = this.props;
    const userId = city_class_member.member.id;
    getShowCustomer(userId).then(() => {
      const { showCustomer } = this.props;
      this.setState({
        fundSetting: showCustomer.detail.fund_setting,
      });
    });
  };
  // اطلاعات صندوق را چک میکند
  checkInitialFundBalance = () => {
    const { initial_fund_balance } = this.state.fundSetting;
    const condition = String(initial_fund_balance).length > 0;
    if (!condition) {
      notification({ text: "موجودی اولیه صندوق را وارد کنید." });
    }
    return condition;
  };
  // اطلاعات صندوق را ارسال میکند
  setInitialFundBalance = () => {
    const { city_class_member, showCustomer, setShowCustomer } = cloneDeep(this.props);
    const body = this.state.fundSetting;
    const userId = city_class_member.member.id;
    const url = `customers/${userId}/fundsetting/${body.id}`;
    if (this.checkInitialFundBalance()) {
      axios.put(url, body).then(({ data }) => {
        notification({ text: data.msg, type: "success" });
        showCustomer.detail.fund_setting = data.data;
        setShowCustomer(showCustomer);
      });
    }
  };
  componentDidMount() {
    this.getAllFundSetting();
  }
  render() {
    const { fundSetting } = cloneDeep(this.state);
    return (
      <div className="Funds">
        <header>
          <label>موجودی صندوق</label>
        </header>
        <Form>
          <Row>
            <Col xs="12">
              <InputGroup
                type="number"
                value={fundSetting.initial_fund_balance}
                setValue={(value) => {
                  fundSetting.initial_fund_balance = value;
                  this.setState({ fundSetting });
                }}
                label="موجودی اولیه صندوق"
              />
            </Col>
          </Row>
          <Button
            onClick={this.setInitialFundBalance}
            type="submit"
            variant="success"
          >
            ثبت
          </Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showCustomer: state.showCustomer,
    city_class_member:state.city_class_member
  };
};
const mapActionToProps = (dispatch) => {
  return {
    setShowCustomer: (data) => dispatch({ type: "SET_SHOW_CUSTOMER", data }),
  };
};
export default connect(mapStateToProps, mapActionToProps)(Funds);
