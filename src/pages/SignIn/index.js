import React from "react";
import {
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
  Button,
  Dropdown,
} from "react-bootstrap";
import "./index.scss";
import lock from "../../assets/images/lock.jpg";
import { cloneDeep } from "lodash";
import { notification, setToken } from "../../global/functions";
import { accessLevel } from "../../global/accessLevel";
import axios from "../../boot/axios";
import { connect } from "react-redux";
class SignIn extends React.Component {
  constructor() {
    super();
    this.data = [
      {
        label: "نام کاربری",
        type: "text",
        value: "username",
      },
      {
        label: "رمز عبور",
        type: "password",
        value: "password",
      },
    ];
    this.state = {
      type: null,
      data: {
        username: "",
        password: "",
        type: null,
      },
    };
  }
  handleSelect = (event) => {
    const { data } = cloneDeep(this.state);
    const value = JSON.parse(event);
    data.type = value.permission;
    this.setState({ data, type: value });
  };
  dropdownLabel = () => {
    const { type } = this.state;
    if (type === null) {
      return "نوع کاربری";
    } else {
      return type.label;
    }
  };
  checkUsername = () => {
    const { username } = this.state.data;
    const conditions = username.length > 0;
    if (!conditions) {
      notification({ text: "نام کاربری نامعتبر" });
    }
    return conditions;
  };
  checkPassword = () => {
    const { password } = this.state.data;
    const conditions = password.length >= 6;
    if (!conditions) {
      notification({ text: "رمز عبور نامعتبر" });
    }
    return conditions;
  };
  checkType = () => {
    const { type } = this.state.data;
    const conditions = type !== null;
    if (!conditions) {
      notification({ text: "لطفا نوع کاربری را انتخاب کنید" });
    }
    return conditions;
  };
  checkUserRole = (role = "", roles = []) => {
    return roles.find((e) => e.name === role) !== undefined;
  };
  login = (event) => {
    event.preventDefault();
    const { history, setProfile, setIsLogin, setRole } = this.props;
    const { data } = this.state;
    if (this.checkUsername() && this.checkPassword() && this.checkType()) {
      const type = this.state.type.value;
      axios
        .post("login", data)
        .then(({ data }) => {
          if (this.checkUserRole(type, data.data.roles)) {
            axios.defaults.headers.Authorization = setToken(data.token);
            localStorage.setItem("profile", JSON.stringify(data.data));
            localStorage.setItem("role", type);
            setProfile(data.data);
            setIsLogin(true);
            setRole(type);
            history.push(`/${type}`);
          } else {
            notification({ text: "شما اجازه دسترسی به این بخش را ندارید." });
          }
        })
        .catch(({ response }) => {
          if (response) {
            notification({ text: response.data.msg });
          }
        });
    }
  };
  render() {
    const { data } = cloneDeep(this.state);
    return (
      <div className="SignIn window-height d-flex align-items-center justify-content-center">
        <Container>
          <Form onSubmit={this.login} className="px-2">
            <Row>
              <Col
                md="8"
                className="bg-white rounded shadow mx-auto overflow-hidden"
              >
                <Row>
                  <Col md="7" className="py-3 px-4">
                    <h2>ورود</h2>
                    <p>ورود به حساب کاربری</p>
                    {this.data.map((item, index) => (
                      <InputGroup dir="ltr" key={index} className="my-3">
                        <FormControl
                          type={item.type}
                          value={data[item.value]}
                          onChange={({ target }) => {
                            const value = target.value;
                            data[item.value] = value;
                            this.setState({ data });
                          }}
                        />
                        <InputGroup.Append>
                          <InputGroup.Text>{item.label}</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    ))}
                    <Row>
                      <Col xs="3">
                        <Button type="submit" variant="primary">
                          ورود
                        </Button>
                      </Col>
                      <Col xs="9" className="d-flex flex-column">
                        <Button
                          className="d-block my-auto ms-auto border-0"
                          size="sm"
                          variant="outline-primary"
                        >
                          رمز عبور خود را فراموش کرده‌اید؟
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    md="5"
                    className="position-relative px-3 py-4 d-flex flex-column bg-primary align-items-center text-center text-light"
                  >
                    <img className="bg-image" src={lock} alt="lock" />
                    <h4 className="mb-5">انتخاب نوع کاربری</h4>
                    <Dropdown onSelect={this.handleSelect} className="mt-auto">
                      <Dropdown.Toggle variant="outline-light">
                        {this.dropdownLabel()}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {accessLevel.map((item, index) => (
                          <Dropdown.Item
                            key={index}
                            eventKey={JSON.stringify(item)}
                          >
                            {item.label}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}

const mapActionToProps = (dispatch) => {
  return {
    setProfile: (data) => dispatch({ type: "SET_PROFILE", data }),
    setIsLogin: (data) => dispatch({ type: "SET_IS_LOGIN", data }),
    setRole: (data) => dispatch({ type: "SET_ROLE", data }),
  };
};

export default connect(null, mapActionToProps)(SignIn);
