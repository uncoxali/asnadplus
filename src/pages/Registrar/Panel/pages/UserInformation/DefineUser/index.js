import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { cloneDeep } from "lodash";
import formControls from "./_formControls";
import InputGroup from "../../../../../../components/InputGroup";
import InputGroupDropdown from "../../../../../../components/InputGroupDropdown";
import { getStates } from "../../../../../../redux/states";
import { connect } from "react-redux";
import axios from "../../../../../../boot/axios";
import { notification } from "../../../../../../global/functions";

const tags = {
  InputGroup,
  InputGroupDropdown,
};

class DefineUser extends Component {
  constructor() {
    super();
    this.state = {
      isGetUserProfile: false,
      formControls,
      body: {
        name: "",
        nationcode: "",
        customer_etehadies: "",
        username: "",
        type_action: "",
        contract_group: "",
        state_id: "",
        city_id: "",
      },
    };
  }
  // اطلاعات کاربر را دریافت میکند
  getUserProfile = async () => {
    const { city_class_member } = this.props;
    const userId = city_class_member.member.id;
    const url = `customers/${userId}`;
    await axios.get(url).then((res) => {
      const data = res.data.data;
      this.getCities(data.detail.state.id).then(() => {
        const body = {
          name: data.name || "",
          nationcode: data.nationcode || "",
          customer_etehadies: data.customer_etehadies.data[0].name || "",
          username: data.username || "",
          type_action: data.detail.type_action || "",
          contract_group: data.detail.contract_group || "",
          state_id: data.detail.state.id || "",
          city_id: data.detail.city.id || "",
          password: data.password || "",
        };
        this.setState({ body, isGetUserProfile: true });
      });
    });
  };
  // استان ها را در منوی مورد نظر ست میکند
  setStates = async (states = []) => {
    const index = formControls.findIndex((e) => e.value === "state_id");
    formControls[index].items = states;
    await this.setState({ formControls });
  };
  // شهرها را گرفته و ست میکند
  getCities = async (id = 0) => {
    const { body } = cloneDeep(this.state);
    const url = "location/cities";
    const data = {
      state_id: id,
    };
    body.city_id = "";
    await await axios.post(url, data).then(({ data }) => {
      const index = formControls.findIndex((e) => e.value === "city_id");
      formControls[index].items = data.data;
    });
    await this.setState({ body, formControls });
  };
  // داده های وارد شده را چک میکند
  checkBody = () => {
    const { body } = this.state;
    for (let item in body) {
      const formControl = formControls.find((e) => e.value === item);
      const conditions =
        body[item].length === 0 && formControl.isOptional === undefined;
      if (conditions) {
        if (body["nationcode"].length !== 10) {
          notification({ text: "کد ملی باید 10 رقمی باشد" });
          return false;
        }
        notification({ text: `${formControl.label} را وارد کنید.` });
        return false;
      }
    }
    return true;
  };
  // تغییرات اعمال شده را ارسال میکند
  submitEdit = () => {
    if (this.checkBody()) {
      const { city_class_member } = this.props;
      const { body } = this.state;
      const userId = city_class_member.member.id;
      const url = `customer/${userId}`;
      axios.put(url, body).then(({ data }) => {
        notification({ text: data.msg, type: "success" });
      });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    const prevStates = prevState.body.state_id;
    const states = this.state.body.state_id;
    const { isGetUserProfile, body } = this.state;
    const conditions =
      prevStates !== "" && prevStates !== states && isGetUserProfile;
    if (conditions) {
      this.getCities(body.state_id);
    }
  }

  componentDidMount() {
    getStates((states) => {
      this.setStates(states).then(() => {
        this.getUserProfile();
      });
    });
  }
  render() {
    const { body, formControls } = cloneDeep(this.state);
    return (
      <div className="DefineUser">
        <header>
          <label>تعریف کاربر</label>
        </header>
        <Row className="mx-auto">
          {formControls.map((item, index) => (
            <Col
              key={index}
              xs="12"
              md={index === 4 ? "12" : "6"}
              className="my-1"
            >
              {React.createElement(tags[item.tag], {
                ...item,
                label: `${item.label}${item.isOptional ? " (اختیاری)" : ""}`,
                value: body[item.value],
                disabled:true,
                setValue: (value) => {
                  body[item.value] = value;
                  this.setState({ body });
                },
              })}
            </Col>
          ))}
        </Row>
        {/* <Button onClick={this.submitEdit} type="submit" variant="warning">
          ویرایش
        </Button> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    states: state.states,
    city_class_member:state.city_class_member
  };
};

export default connect(mapStateToProps, null)(DefineUser);
