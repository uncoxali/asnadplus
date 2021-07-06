import { Component } from "react";
import {
  Button,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import { connect } from "react-redux";
import {
  getShowCustomer,
  setFundSetting,
} from "../../../../../../redux/showCustomer";
import axios from "../../../../../../boot/axios";
import InputGroupDropdown from "../../../../../../components/InputGroupDropdown";
import { cloneDeep } from "lodash";

class FiscalYearSelection extends Component {
  constructor() {
    super();
    this.state = {
      allYears: [],
      fundSetting: {
        id: "",
        initial_fund_balance: "",
        initail_fund_inventory: "",
        finally_fund_inventory: "",
        fiscal_year: { id: "", year: "" },
      },
    };
  }
  // اطلاعات سال های مالی فعال را دریافت میکند
  getAllYears = async () => {
    await axios.get("fiscalyear").then(({ data }) => {
      this.setState({ allYears: data.data });
    });
  };
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
  // سال مالی را ست میکند
  setFiscalyear = (e) => {
    e.preventDefault();
    const { fundSetting } = this.state;
    const { city_class_member } = this.props;
    const userid = city_class_member.member.id;
    setFundSetting(userid, fundSetting);
  };
  componentDidMount() {
    this.getAllYears().then(() => this.getAllFundSetting());
  }
  render() {
    const { allYears, fundSetting } = cloneDeep(this.state);
    return (
      <div className="FiscalYearSelection">
        <header>
          <label>انتخاب سال مالی</label>
        </header>
        <Form onSubmit={this.setFiscalyear}>
          <Row>
            <Col xs="12" md="6" className="mx-auto">
              <InputGroupDropdown
                label="سال مالی"
                items={allYears}
                value={fundSetting.fiscal_year.id}
                setValue={(value) => {
                  const activeItem = allYears.find(
                    (e) => String(e.id) === String(value)
                  );
                  fundSetting.fiscal_year = activeItem;
                  this.setState({ fundSetting });
                }}
                itemLabel="year"
                itemValue="id"
              />
            </Col>
          </Row>
          <Button type="submit" variant="success">
            فعال کردن
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
export default connect(mapStateToProps, null)(FiscalYearSelection);
