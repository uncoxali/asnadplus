import { Component } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { cloneDeep } from "lodash";
import InputGroup from "../../../../../../components/InputGroup";
import {
  getShowCustomer,
  setFundSetting,
} from "../../../../../../redux/showCustomer";
import { notification } from "../../../../../../global/functions";

const formControls = [
  {
    label: "موجودی ابتدای دوره انبار",
    value: "initail_fund_inventory",
  },
  {
    label: "موجودی پایان دوره انبار",
    value: "finally_fund_inventory",
  },
];

class Inventory extends Component {
  constructor() {
    super();
    this.state = {
      fundSetting: {
        id: "",
        initial_fund_balance: "",
        initail_fund_inventory: "",
        finally_fund_inventory: "",
        fiscal_year: { id: "", year: "" },
      }
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
  // اطلاعات دوره انبار را چک میکند
  checkData = () => {
    const { fundSetting } = cloneDeep(this.state);
    const conditions =
      String(fundSetting.initail_fund_inventory).length > 0 &&
      String(fundSetting.finally_fund_inventory).length > 0;
    if (!conditions) {
      notification({ text: "لطفا از درستی اطلاعات وارد مطمین شوید." });
    }
    return conditions;
  };

  setFundSetting = (e) => {
    e.preventDefault();
    if (this.checkData()) {
      const { fundSetting } = cloneDeep(this.state);
      const userId = this.props.city_class_member.member.id;
      setFundSetting(userId, fundSetting);
    }
  };
  componentDidMount() {
    this.getAllFundSetting();
  }
  render() {
    const { fundSetting } = cloneDeep(this.state);
    return (
      <div className="Inventory">
        <header>
          <label>موجودی انبار</label>
        </header>
        <Form onSubmit={this.setFundSetting}>
          <Row>
            {formControls.map((item, index) => (
              <Col key={index} xs="12" md="6" className="my-2">
                <InputGroup
                  label={item.label}
                  value={fundSetting[item.value]}
                  type="number"
                  setValue={(value) => {
                    fundSetting[item.value] = value;
                    this.setState({ fundSetting });
                  }}
                />
              </Col>
            ))}
          </Row>
          <Button type="submit" variant="success">
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
  return {};
};

export default connect(mapStateToProps, mapActionToProps)(Inventory);
