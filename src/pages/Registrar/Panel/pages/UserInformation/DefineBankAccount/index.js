import React, { Component } from "react";
import { Col, Row, Button, ListGroup } from "react-bootstrap";
import { cloneDeep } from "lodash";
import Modal from "../../../../../../components/Modal";
import InputGroup from "../../../../../../components/InputGroup";
import ButtonGroup from "../../../../../../components/ButtonGroup";
import axios from "../../../../../../boot/axios";
import { notification } from "../../../../../../global/functions";
import { connect } from "react-redux";

class DefineBankAccount extends Component {
  constructor() {
    super();
    this.bankInput = null;
    this.accountInput = null;
    this.state = {
      newBankName: "",
      newAccountName: "",
      editingBankId: null,
      editingAccountId: null,
      removingBankId: null,
      removingAccountId: null,
      removingBankName: "",
      removingAccountName: "",
      banks: [],
      accountType: [],
    };
  }
  // چک کردن نام بانک جدید
  checkNewBankName = () => {
    const { newBankName } = this.state;
    const conditions = newBankName.length > 0;
    if (!conditions) {
      notification({ text: "نام بانک مورد نظر را وارد کنید." });
    }
    return conditions;
  };
  // ساخت بانک جدید پس از بررسی نام
  createNewBank = () => {
    const { city_class_member } = this.props;
    const { newBankName, banks } = this.state;
    const id = city_class_member.member.id;
    const body = {
      name: newBankName,
    };
    if (this.checkNewBankName()) {
      axios.post(`customers/${id}/bank`, body).then(({ data }) => {
        notification({ text: data.msg, type: "success" });
        this.setState({ banks: [...banks, data.data], newBankName: "" });
      });
    }
  };
  // گرفتن همه بانک های کاربر مورد نظر
  getAllBanks = () => {
    const { city_class_member } = this.props;
    const id = city_class_member.member.id;
    const url = `customers/${id}/bank`;
    axios.get(url).then(({ data }) => {
      this.setState({ banks: data.data });
    });
  };
  // نام و آیدی بانک را برای ویرایش کردن ست میکند
  setEditingBankId = (bank = { id: null, name: null }) => {
    this.setState({ editingBankId: bank.id, newBankName: bank.name });
  };
  // تغییرات اعمال شده در بانک مورد نظر را ثبت میکند
  submitEditBank = () => {
    const { city_class_member } = this.props;
    const { editingBankId, newBankName, banks } = cloneDeep(this.state);
    const userId = city_class_member.member.id;
    const bankId = editingBankId;
    const url = `customers/${userId}/bank/${bankId}`;
    const body = {
      name: newBankName,
    };
    if (this.checkNewBankName()) {
      axios.put(url, body).then(({ data }) => {
        const index = banks.findIndex((e) => e.id === bankId);
        banks[index].name = newBankName;
        this.setState({ banks, newBankName: "", editingBankId: null });
        notification({
          text: data.msg,
          type: "success",
        });
      });
    }
  };
  // دیالوگ اطمینان از حذف بانک را نمایش میدهد
  setRemovingBankId = (bank = { id: null, name: null }) => {
    this.setState({
      removingBankId: bank.id,
      removingBankName: bank.name,
    });
  };
  // عملیات ویرایش بانک را لغو میکند
  cancelEditBank = () => {
    this.setState({ newBankName: "", editingBankId: null });
  };
  // عملیات حذف بانک را لغو میکند
  cancelRemovingBank = () => {
    this.setState({ removingBankId: null, removingBankName: "" });
  };
  // عملیات حذف بانک را تایید میکند
  submitRemoveBank = () => {
    const { city_class_member } = this.props;
    const { removingBankId, banks } = cloneDeep(this.state);
    const userId = city_class_member.member.id;
    const bankId = removingBankId;
    const url = `customers/${userId}/bank/${bankId}`;
    axios.delete(url).then(({ data }) => {
      const index = banks.findIndex((e) => e.id === bankId);
      banks.splice(index, 1);
      this.setState({ banks, removingBankId: null, removingBankName: "" });
      notification({
        text: data.msg,
        type: "success",
      });
    });
  };

  // چک کردن نام نوع حساب
  checkNewAccountName = () => {
    const { newAccountName } = this.state;
    const conditions = newAccountName.length > 0;
    if (!conditions) {
      notification({ text: "نام حساب مورد نظر را وارد کنید." });
    }
    return conditions;
  };
  // ساخت حساب جدید پس از بررسی نام
  createNewAccountType = () => {
    const { city_class_member } = this.props;
    const { newAccountName, accountType } = this.state;
    const id = city_class_member.member.id;
    const body = {
      name: newAccountName,
    };
    if (this.checkNewAccountName()) {
      axios.post(`customers/${id}/accounttype`, body).then(({ data }) => {
        notification({ text: data.msg, type: "success" });
        this.setState({
          accountType: [...accountType, data.data],
          newAccountName: "",
        });
      });
    }
  };
  // گرفتن همه حساب های کاربر مورد نظر
  getAllAccount = () => {
    const { city_class_member } = this.props;
    const userId = city_class_member.member.id;
    axios.get(`customers/${userId}/accounttype`).then(({ data }) => {
      this.setState({ accountType: data.data });
    });
  };
  // نام و آیدی حساب را برای ویرایش کردن ست میکند
  setEditingAccountId = (accountType = { id: null, name: null }) => {
    this.setState({
      editingAccountId: accountType.id,
      newAccountName: accountType.name,
    });
  };
  // تغییرات اعمال شده در حساب مورد نظر را ثبت میکند
  submitEditAccountType = () => {
    const { city_class_member } = this.props;
    const { editingAccountId, newAccountName, accountType } = cloneDeep(
      this.state
    );
    const userId = city_class_member.member.id;
    const accountId = editingAccountId;
    const url = `customers/${userId}/accounttype/${accountId}`;
    const body = {
      name: newAccountName,
    };
    if (this.checkNewAccountName()) {
      axios.put(url, body).then(({ data }) => {
        const index = accountType.findIndex((e) => e.id === accountId);
        accountType[index].name = newAccountName;
        this.setState({
          accountType,
          newAccountName: "",
          editingAccountId: null,
        });
        notification({
          text: data.msg,
          type: "success",
        });
      });
    }
  };
  // عملیات ویرایش حساب را لغو میکند
  cancelEditAccountType = () => {
    this.setState({ newAccountName: "", editingAccountId: null });
  };
  // دیالوگ اطمینان از حذف بانک را نمایش میدهد
  setRemovingAccountType = (account = { id: null, name: null }) => {
    this.setState({
      removingAccountId: account.id,
      removingAccountName: account.name,
    });
  };
  // عملیات حذف حساب را لغو میکند
  cancelRemovingAccount = () => {
    this.setState({ removingAccountId: null, removingAccountName: "" });
  };
  // عملیات حذف حساب را تایید میکند
  submitRemoveAccountType = () => {
    const { city_class_member } = this.props;
    const { removingAccountId, accountType } = cloneDeep(this.state);
    const userId = city_class_member.member.id;
    const accountId = removingAccountId;
    const url = `customers/${userId}/accounttype/${accountId}`;
    axios.delete(url).then(({ data }) => {
      const index = accountType.findIndex((e) => e.id === accountId);
      accountType.splice(index, 1);
      this.setState({
        accountType,
        removingAccountId: null,
        removingAccountName: "",
      });
      notification({
        text: data.msg,
        type: "success",
      });
    });
  };
  componentDidMount() {
    (async () => {
      await this.getAllAccount();
      await this.getAllBanks();
    })();
  }
  render() {
    const {
      banks,
      newBankName,
      editingBankId,
      removingBankId,
      removingBankName,
      accountType,
      newAccountName,
      editingAccountId,
      removingAccountId,
      removingAccountName,
    } = this.state;

    const showBanks = banks.length > 0;
    const showEditingBankButtons = editingBankId !== null;
    const showModalRemovingBank = removingBankId !== null;

    const showAccountTypes = accountType.length > 0;
    const showEditingAccountTypeButtons = editingAccountId !== null;
    const showModalRemovingAccountType = removingAccountId !== null;

    return (
      <div className="DefineBankAccount">
        <header>
          <label>معرفی بانک و حساب بانکی</label>
        </header>
        <Row className="mx-auto">
          <Col xs="12" md="6" className="my-2 d-flex flex-column">
            <InputGroup
              label="نام بانک"
              value={newBankName}
              setValue={(value) => this.setState({ newBankName: value })}
            />
            {showEditingBankButtons ? (
              <ButtonGroup
                className="px-4 my-3 d-block mx-auto"
                buttons={[
                  {
                    label: "لغو",
                    variant: "danger",
                    onClick: this.cancelEditBank,
                  },
                  {
                    label: "ثبت تغییر",
                    variant: "warning",
                    onClick: this.submitEditBank,
                  },
                ]}
              />
            ) : (
              <Button
                onClick={this.createNewBank}
                variant="success"
                className="px-4 my-3 d-block mx-auto"
              >
                ثبت
              </Button>
            )}
            {showBanks ? (
              <ListGroup>
                {banks.map((item, index) => (
                  <ListGroup.Item
                    key={index}
                    variant={index % 2 === 0 ? "light" : "dark"}
                    className="d-flex justify-content-between"
                  >
                    {item.name}
                    <ButtonGroup
                      size="sm"
                      buttons={[
                        {
                          label: "حذف",
                          variant: "danger",
                          onClick: () => this.setRemovingBankId(item),
                        },
                        {
                          label: "ویرایش",
                          variant: "warning",
                          onClick: () => this.setEditingBankId(item),
                        },
                      ]}
                    />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : null}

            <Modal
              show={showModalRemovingBank}
              onHide={this.cancelRemovingBank}
              className="text-center"
              title="هشدار"
              type="warning"
              bodyText={` آیا از حذف بانک ${removingBankName} اطمینان دارید؟`}
              buttons={[
                {
                  variant: "danger",
                  onClick: this.cancelRemovingBank,
                  label: "خیر",
                },
                {
                  variant: "success",
                  onClick: this.submitRemoveBank,
                  label: "بله",
                },
              ]}
            />
          </Col>
          <Col xs="12" md="6" className="my-2 d-flex flex-column">
            <InputGroup
              label="نوع حساب"
              value={newAccountName}
              setValue={(value) => this.setState({ newAccountName: value })}
            />
            {showEditingAccountTypeButtons ? (
              <ButtonGroup
                className="px-4 my-3 d-block mx-auto"
                buttons={[
                  {
                    label: "لغو",
                    variant: "danger",
                    onClick: this.cancelEditAccountType,
                  },
                  {
                    label: "ثبت تغییر",
                    variant: "warning",
                    onClick: this.submitEditAccountType,
                  },
                ]}
              />
            ) : (
              <Button
                variant="success"
                className="px-4 my-3 d-block mx-auto"
                onClick={this.createNewAccountType}
              >
                ثبت
              </Button>
            )}
            {showAccountTypes ? (
              <ListGroup>
                {accountType.map((item, index) => (
                  <ListGroup.Item
                    key={index}
                    variant={index % 2 === 0 ? "light" : "dark"}
                    className="d-flex justify-content-between"
                  >
                    {item.name}
                    <ButtonGroup
                      size="sm"
                      buttons={[
                        {
                          label: "حذف",
                          variant: "danger",
                          onClick: () => this.setRemovingAccountType(item),
                        },
                        {
                          label: "ویرایش",
                          variant: "warning",
                          onClick: () => this.setEditingAccountId(item),
                        },
                      ]}
                    />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : null}
            <Modal
              show={showModalRemovingAccountType}
              onHide={this.cancelRemovingAccount}
              className="text-center"
              title="هشدار"
              type="warning"
              bodyText={` آیا از حذف نوع حساب ${removingAccountName} اطمینان دارید؟`}
              buttons={[
                {
                  variant: "danger",
                  onClick: this.cancelRemovingAccount,
                  label: "خیر",
                },
                {
                  variant: "success",
                  onClick: this.submitRemoveAccountType,
                  label: "بله",
                },
              ]}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    city_class_member: state.city_class_member,
  };
};

export default connect(mapStateToProps, null)(DefineBankAccount);
