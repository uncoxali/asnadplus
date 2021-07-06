import React, { Component } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { cloneDeep } from "lodash";
import formControls from "./_formControls";
import InputGroup from "../../../../../../components/InputGroup";
import Table from "../../../../../../components/Table";
import Modal from "../../../../../../components/Modal";
import InputGroupDropdown from "../../../../../../components/InputGroupDropdown";
import ButtonGroup from "../../../../../../components/ButtonGroup";
import axios from "../../../../../../boot/axios";
import { notification } from "../../../../../../global/functions";
import { connect } from "react-redux";

const tags = {
  InputGroup,
  InputGroupDropdown,
};

class DefineUserBankAccount extends Component {
  constructor() {
    super();
    this.state = {
      formControls,
      allAccounts: [],
      removeAccountId: null,
      editAccountId: null,
      data: {
        bank_id: "",
        account_type_id: "",
        branch_name: "",
        account_number: "",
        balance: "",
        card_number: "",
      },
    };
  }
  // گرفتن اطلاعات بانک و نوع حساب کابر
  getBanksOrAccountType = (type = "bank") => {
    const { city_class_member } = this.props;
    const userId = city_class_member.member.id;
    const url = `customers/${userId}/${type}`;
    axios.get(url).then(({ data }) => {
      if (type === "bank") {
        const index = formControls.findIndex((e) => e.state === "bank_id");
        formControls[index].items = data.data;
        this.setState({ formControls });
      }
      if (type === "accounttype") {
        const index = formControls.findIndex(
          (e) => e.state === "account_type_id"
        );
        formControls[index].items = data.data;
        this.setState({ formControls });
      }
    });
  };
  // گرفتن کل حساب هایی که برای مشتری ساخته شده است
  getAllAccount = () => {
    const { city_class_member } = this.props;
    const userId = city_class_member.member.id;
    axios.get(`customers/${userId}/account`).then(({ data }) => {
      this.setState({ allAccounts: data.data });
    });
  };
  // برای چک کردن اینکه آیا داده وارد شده یا خیر
  checkData = () => {
    const { data } = this.state;
    let check = true;
    for (let item in data) {
      if (String(data[item]).length > 0) {
        check = true;
      } else {
        const errorItem = formControls.find((e) => e.state === item);
        notification({ text: `لطفا ${errorItem.label} را وارد کنید` });
        check = false;
        break;
      }
    }
    return check;
  };
  // تعریف حساب بانکی کابر
  submit = (e) => {
    e.preventDefault();
    if (this.checkData()) {
      const { city_class_member } = this.props;
      const { data, allAccounts } = this.state;
      const userId = city_class_member.member.id;
      const url = `customers/${userId}/account`;
      axios.post(url, data).then(({ data }) => {
        notification({ text: data.msg, type: "success" });
        this.setState({ allAccounts: [...allAccounts, data.data] });
        this.clearData();
      });
    }
  };
  // دیتاها رو بعد از انجام عملیات خالی میکند
  clearData = () => {
    const { data } = cloneDeep(this.state);
    Object.keys(data).forEach((item) => {
      data[item] = "";
    });
    this.setState({ data });
  };
  // آیدی  حساب رو برای حذف شدن ست میکند
  setShowModalRemoveAccount = (id) => {
    this.setState({ removeAccountId: id });
  };
  // عملیات حذف کردن حساب بانکی کاربر را لغو میکند
  setHideModalRemoveAccount = () => {
    this.setState({ removeAccountId: null });
  };
  // عملیات حذف حساب بانکی کاربر را تایید میکند
  submitRemoveAccountId = () => {
    const { city_class_member } = this.props;
    const { removeAccountId, allAccounts } = cloneDeep(this.state);
    const userId = city_class_member.member.id;
    const url = `customers/${userId}/account/${removeAccountId}`;
    axios.delete(url).then(({ data }) => {
      const index = allAccounts.findIndex((e) => e.id === removeAccountId);
      allAccounts.splice(index, 1);
      this.setState({ allAccounts, removeAccountId: null });
      notification({ text: data.msg, type: "success" });
    });
  };
  // اطلاعات حساب رو برای ویرایش شدن ست میکند
  setEditAccountData = (account) => {
    const { data } = cloneDeep(this.state);
    data.bank_id = account.bank.id;
    data.account_type_id = account.account_type.id;
    data.branch_name = account.branch_name;
    data.account_number = account.account_number;
    data.balance = String(account.balance);
    data.card_number = account.card_number;
    this.setState({ editAccountId: account.id, data });
  };
  // عملیات ویرایش اطلاعات حساب را لغو میکند
  cancelEditAccountData = () => {
    this.clearData();
    this.setState({ editAccountId: null });
  };
  // عملیات ویرایش اطلاعات حساب را تایید میکند
  submitEditAccountData = () => {
    const { data, editAccountId, allAccounts } = cloneDeep(this.state);
    const { city_class_member } = this.props;
    const userId = city_class_member.member.id;
    const url = `customers/${userId}/account/${editAccountId}`;
    axios.put(url, data).then(({ data }) => {
      const index = allAccounts.findIndex((e) => e.id === editAccountId);
      allAccounts[index] = data.data;
      notification({ text: data.msg, type: "success" });
      this.setState({ allAccounts, editAccountId: null });
      this.clearData();
    });
  };
  componentDidMount() {
    (async () => {
      await this.getAllAccount();
      await this.getBanksOrAccountType("bank");
      await this.getBanksOrAccountType("accounttype");
    })();
  }
  render() {
    const { data, formControls, allAccounts, removeAccountId, editAccountId } =
      cloneDeep(this.state);
    const showAllAccounts = allAccounts.length > 0;
    const showModalRemoveAccount = removeAccountId !== null;
    const showEditButtons = editAccountId !== null;
    return (
      <div className="DefineUserBankAccount">
        <header>
          <label>تعریف حساب بانکی کاربر</label>
        </header>
        <Form onSubmit={this.submit}>
          <Row className="mx-auto">
            {formControls.map((item, index) => (
              <Col key={index} xs="12" md="6" className="my-1">
                {React.createElement(tags[item.tag], {
                  label: item.label,
                  value: data[item.state],
                  setValue: (value) => {
                    data[item.state] = value;
                    this.setState({ data });
                  },
                  ...item,
                })}
              </Col>
            ))}
          </Row>
          {showEditButtons ? (
            <ButtonGroup
              className="d-block my-3 mx-auto"
              buttons={[
                {
                  label: "لغو",
                  variant: "danger",
                  onClick: this.cancelEditAccountData,
                },
                {
                  label: "ثبت تغییرات",
                  variant: "warning",
                  onClick: this.submitEditAccountData,
                },
              ]}
            />
          ) : (
            <Button
              type="submit"
              variant="success"
              className="px-4 d-block my-3 mx-auto"
            >
              ثبت
            </Button>
          )}
        </Form>
        {showAllAccounts ? (
          <Table>
            <thead>
              <tr>
                <th>نام بانک</th>
                <th>نام شعبه</th>
                <th>شماره حساب</th>
                <th>شماره کارت</th>
                <th>نوع حساب</th>
                <th>موجودی اولیه</th>
                <th>-</th>
              </tr>
            </thead>
            <tbody>
              {allAccounts.map((item, index) => (
                <tr key={index}>
                  <td>{item.bank.name}</td>
                  <td>{item.branch_name}</td>
                  <td>{item.account_number}</td>
                  <td>{item.card_number}</td>
                  <td>{item.account_type.name}</td>
                  <td>{item.balance}</td>
                  <td>
                    <ButtonGroup
                      size="sm"
                      buttons={[
                        {
                          label: "حذف",
                          variant: "danger",
                          onClick: () =>
                            this.setShowModalRemoveAccount(item.id),
                        },
                        {
                          label: "ویرایش",
                          variant: "warning",
                          onClick: () => this.setEditAccountData(item),
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : null}
        <Modal
          title="هشدار"
          bodyText="آیا از حذف کردن حساب اطمینان دارید؟"
          type="warning"
          show={showModalRemoveAccount}
          onHide={this.setHideModalRemoveAccount}
          buttons={[
            {
              label: "خیر",
              variant: "danger",
              onClick: this.setHideModalRemoveAccount,
            },
            {
              label: "بله",
              variant: "success",
              onClick: this.submitRemoveAccountId,
            },
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return{
    city_class_member:state.city_class_member
  }
}

export default connect(mapStateToProps,null)(DefineUserBankAccount);
