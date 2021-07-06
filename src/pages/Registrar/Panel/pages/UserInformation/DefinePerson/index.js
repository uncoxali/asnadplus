import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { cloneDeep } from "lodash";
import InputGroup from "../../../../../../components/InputGroup";
import InputGroupDropdown from "../../../../../../components/InputGroupDropdown";
import Table from "../../../../../../components/Table";
import ButtonGroup from "../../../../../../components/ButtonGroup";
import Modal from "../../../../../../components/Modal";
import axios from "../../../../../../boot/axios";
import formControls from "./_formControls";
import { notification } from "../../../../../../global/functions";
import { connect } from "react-redux";

const tags = {
  InputGroup,
  InputGroupDropdown,
};
class DefinePerson extends Component {
  constructor() {
    super();
    this.state = {
      formControls,
      persons: [],
      removePerson: null,
      editPerson: null,
      data: {
        name: "",
        merchant_number: "",
        nation_code: "",
        phone: "",
        state_id: "",
        city_id: "",
        address: "",
      },
    };
  }
  // استان ها را دریافت میکند
  getStates = () => {
    const url = "location/states";
    axios.post(url).then(({ data }) => {
      const index = formControls.findIndex((e) => e.value === "state_id");
      formControls[index].items = data.data;
      this.setState({ formControls });
    });
  };
  // شهر ها را دریافت میکند
  getCitie = async (id = 0) => {
    const { data } = cloneDeep(this.state);
    const url = "location/cities";
    const body = {
      state_id: id,
    };
    await axios.post(url, body).then((res) => {
      const index = formControls.findIndex((e) => e.value === "city_id");
      formControls[index].items = res.data.data;
      data.city_id = "";
      this.setState({ formControls, data });
    });
  };
  // اطلاعات رو قبل از ارسال چک میکند
  checkData = () => {
    const regexOnlyNumber = /^\d+$/;
    const { data } = this.state;
    let checkValue = true;
    const conditionNationCode = data.nation_code.length === 10;
    const conditionPhone =
      data.phone.substring(0, 1) === "0" &&
      data.phone.length === 11 &&
      regexOnlyNumber.test(data.phone);
    for (let i = 0; i < formControls.length; i++) {
      if (data[formControls[i].value].length === 0) {
        checkValue = false;
        const text = `لطفا ${formControls[i].label} را وارد کنید.`;
        notification({ text });
        break;
      }
      if (formControls[i].value === "nation_code" && !conditionNationCode) {
        checkValue = false;
        notification({ text: "کد ملی باید شامل 10 رقم باشد." });
        break;
      }
      if (formControls[i].value === "phone" && !conditionPhone) {
        checkValue = false;
        notification({ text: "شماره تماس نامعتبر است.." });
        break;
      }
    }
    return checkValue;
  };
  // پس از بررسی اطلاعات آنها را ارسال میکند
  submitPerson = () => {
    const { city_class_member } = this.props;
    const { data, persons } = this.state;
    const userId = city_class_member.member.id;
    const url = `customers/${userId}/enterprise`;
    const condition = this.checkData();
    if (condition) {
      axios.post(url, data).then(({ data }) => {
        notification({ text: data.msg, type: "success" });
        this.setState({ persons: [...persons, data.data] });
      });
    }
  };
  // گرفتن همه اطلاعات اشخاص یا شرکت ها
  getPersons = (callback = () => {}) => {
    const { city_class_member } = this.props;
    const userId = city_class_member.member.id;
    const url = `customers/${userId}/enterprise`;
    axios.get(url).then(({ data }) => {
      this.setState({ persons: data.data });
      callback();
    });
  };
  // اطلاعات شرکت / شخص را برای حذف شدن ست میکند
  setRemovePerson = (person = null) => {
    this.setState({ removePerson: person });
  };
  // عملیات حذف شخص / شرکت را تایید میکند
  submitRemovePerson = () => {
    const { removePerson, persons } = cloneDeep(this.state);
    const { city_class_member } = this.props;
    const userId = city_class_member.member.id;
    const url = `customers/${userId}/enterprise/${removePerson.id}`;
    axios.delete(url).then(({ data }) => {
      const index = persons.findIndex((e) => e.id === removePerson.id);
      persons.splice(index, 1);
      notification({ text: data.msg });
      this.setRemovePerson(null);
      this.setState({ persons });
    });
  };
  // اطلاعات شرکت / شخص را برای ویرایش شدن ست میکند
  setEditPerson = async (person = null) => {
    let { data } = cloneDeep(this.state);
    if (person === null) {
      Object.keys(data).forEach((item) => {
        data[item] = "";
      });
      this.setState({ data, editPerson: null });
    } else {
      this.getCitie(person.state.id).then(() => {
        data = {
          name: person.name,
          merchant_number: person.merchant_number,
          nation_code: person.nation_code,
          phone: person.phone,
          state_id: person.state.id,
          city_id: person.city.id,
          address: person.address,
        };
        this.setState({ editPerson: person, data });
      });
    }
  };
  // اطلاعات شرکت / شخص را برای ویرایش شدن تایید میکند
  submitEditPersone = () => {
    const { data, editPerson, persons } = cloneDeep(this.state);
    const { city_class_member } = this.props;
    const userId = city_class_member.member.id;
    const url = `customers/${userId}/enterprise/${editPerson.id}`;
    if (this.checkData()) {
      axios.put(url, data).then(({ data }) => {
        const index = persons.findIndex((e) => e.id === editPerson.id);
        persons[index] = data.data;
        notification({ text: data.msg, type: "success" });
        this.setState({ persons });
        this.setEditPerson(null);
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const prevEditPerson = prevState.editPerson;
    const editPerson = this.state.editPerson;
    const prevStates = prevState.data.state_id;
    const states = this.state.data.state_id;
    const conditionGetCities = () => {
      if (editPerson === null) {
        if (states === "") {
          return false;
        } else {
          return prevStates !== states;
        }
      } else {
        if (prevEditPerson === null || editPerson === null) {
          return false;
        } else {
          return prevStates !== states;
        }
      }
    };
    if (conditionGetCities()) {
      this.getCitie(states);
    }
  }
  componentDidMount() {
    this.getPersons(() => {
      this.getStates();
    });
  }
  render() {
    const { data, formControls, persons, removePerson, editPerson } = cloneDeep(
      this.state
    );
    const showPersons = persons.length > 0;
    const showModalRemovePerson = removePerson !== null;
    const showButtonsEditPerson = editPerson !== null;
    return (
      <div className="DefinePerson">
        <header>
          <label>معرفی اشخاص / شرکت‌ها</label>
        </header>
        <Row>
          {formControls.map((item, index) => (
            <Col
              xs="12"
              md={index === 6 ? "12" : "6"}
              key={index}
              className="my-2"
            >
              {React.createElement(tags[item.tag], {
                ...item,
                value: data[item.value],
                setValue: (value) => {
                  data[item.value] = value;
                  this.setState({ data });
                },
              })}
            </Col>
          ))}
          <Col xs="12">
            {showButtonsEditPerson ? (
              <ButtonGroup
                className="submit"
                buttons={[
                  {
                    label: "لغو",
                    variant: "danger",
                    onClick: () => this.setEditPerson(null),
                  },
                  {
                    label: "ویرایش",
                    variant: "warning",
                    onClick: () => this.submitEditPersone(),
                  },
                ]}
              />
            ) : (
              <Button
                onClick={this.submitPerson}
                type="submit"
                variant="success"
              >
                ثبت
              </Button>
            )}
          </Col>
        </Row>

        <Table show={showPersons}>
          <thead>
            <tr>
              <td>نام شخص / شرکت</td>
              <td>شماره اقتصادی</td>
              <td>کد / شناسه ملی</td>
              <td>شماره تماس</td>
              <td>استان</td>
              <td>شهرستان</td>
              <td>آدرس</td>
              <td>-</td>
            </tr>
          </thead>
          <tbody>
            {persons.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.merchant_number}</td>
                <td>{item.nation_code}</td>
                <td>{item.phone}</td>
                <td>{item.state.name}</td>
                <td>{item.city.name}</td>
                <td>{item.address}</td>
                <td>
                  <ButtonGroup
                    size="sm"
                    buttons={[
                      {
                        label: "حذف",
                        variant: "danger",
                        onClick: () => this.setRemovePerson(item),
                      },
                      {
                        label: "ویرایش",
                        variant: "warning",
                        onClick: () => this.setEditPerson(item),
                      },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal
          show={showModalRemovePerson}
          onHide={() => this.setRemovePerson(null)}
          type="warning"
          title="هشدار"
          bodyText={
            showModalRemovePerson
              ? `آیا از حذف شخص / شرکت ‌${removePerson.name} اطمینان دارید؟`
              : null
          }
          buttons={[
            {
              label: "خیر",
              variant: "danger",
              onClick: () => this.setRemovePerson(null),
            },
            {
              label: "بله",
              variant: "success",
              onClick: () => this.submitRemovePerson(),
            },
          ]}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    city_class_member: state.city_class_member,
  };
};

export default connect(mapStateToProps, null)(DefinePerson);
