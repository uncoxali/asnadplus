import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { cloneDeep } from "lodash";
import axios from "../../../../../../boot/axios";
import InputGroup from "../../../../../../components/InputGroup";
import InputGroupDropdown from "../../../../../../components/InputGroupDropdown";
import Table from "../../../../../../components/Table";
import ButtonGroup from "../../../../../../components/ButtonGroup";
import Modal from "../../../../../../components/Modal";
import { notification } from "../../../../../../global/functions";
import { connect } from "react-redux";
class DefineProduct extends Component {
  constructor() {
    super();
    this.types = [
      { name: "کالا", id: "merchandise" },
      { name: "خدمات", id: "service" },
    ];
    this.state = {
      showCost: "",
      products: [],
      removeProduct: null,
      editProduct: null,
      data: {
        name: "",
        code: "",
        cost: 0,
        type: "merchandise",
      },
    };
  }
  // مبلغ وارد شده را به صورت عدد در دیتا و به صورت جداکانه در صفحه نمایش میدهد
  setCost = (value = "") => {
    const { data } = cloneDeep(this.state);
    const cost = Number(value.replace(/[^0-9]/g, ""));
    data.cost = cost;
    this.setState({ data, showCost: cost.toLocaleString() });
  };
  // گرفتن همه کالاها و سرویس‌ها
  getData = () => {
    const { city_class_member } = this.props;
    const userId = city_class_member.member.id;
    const url = `customers/${userId}/merchandise`;
    axios.get(url).then(({ data }) => {
      this.setState({ products: data.data });
    });
  };
  // نام را چک میکند
  checkName = () => {
    const { name } = this.state.data;
    const condition = name.length > 0;
    if (!condition) {
      notification({ text: "لطفا نام کالا / خدمات را وارد کنید" });
    }
    return condition;
  };
  // کد را چک میکند
  checkCode = () => {
    const { code } = this.state.data;
    const condition = code.length > 0;
    if (!condition) {
      notification({ text: "لطفا کد کالا / خدمات را وارد کنید" });
    }
    return condition;
  };
  // مبلغ را چک میکند
  checkCost = () => {
    const { cost } = this.state.data;
    const condition = cost > 0;
    if (!condition) {
      notification({ text: "مبلغ کالا / خدمات وارد شده نامعتبر است" });
    }
    return condition;
  };
  // کالا / خدمات را پس از تایید اطلاعات ثبت میکند
  submit = () => {
    const { data, products } = cloneDeep(this.state);
    const { city_class_member } = this.props;
    const userId = city_class_member.member.id;
    const url = `customers/${userId}/merchandise`;
    const condition = this.checkName() && this.checkCode() && this.checkCost();
    if (condition) {
      axios.post(url, data).then(({ data }) => {
        notification({ text: data.msg, type: "success" });
        this.setState({ products: [...products, data.data] });
        this.clearData();
      });
    }
  };
  // پاک کردن داده ها
  clearData = () => {
    const data = {
      code: "",
      cost: 0,
      name: "",
      type: "merchandise",
    };
    this.setState({ data, showCost: "" });
  };
  // نوع کالا یا خدمات رو نمایش میدهد
  showType = (name) => {
    return name === "merchandise" ? "کالا" : "خدمت";
  };
  // دیالوگ اطمینان از حذف کالا / خدمات را نمایش / مخفی میدهد
  setModalRemoveProduct = (item = null) => {
    this.setState({ removeProduct: item });
  };
  // عملیات حذف کالا یا خدمات را تایید میکند
  submitRemoveProduct = () => {
    const { city_class_member } = this.props;
    const { removeProduct, products } = cloneDeep(this.state);
    const userId = city_class_member.member.id;
    const url = `customers/${userId}/merchandise/${removeProduct.id}`;
    axios.delete(url).then(({ data }) => {
      const index = products.findIndex((e) => e.id === removeProduct.id);
      products.splice(index, 1);
      this.setState({ products });
      notification({ text: data.msg, type: "success" });
      this.setModalRemoveProduct(null);
    });
  };
  // آیدی کالا / خدمات را برای ویرایش ست میکند
  setEditProduct = (item = null) => {
    if (item === null) {
      const data = {
        name: "",
        code: "",
        cost: 0,
        type: "merchandise",
      };
      this.setCost("");
      this.setState({ editProduct: null, data });
    } else {
      const data = {
        name: item.name,
        code: item.code,
        cost: item.cost,
        type: item.type,
      };
      this.setCost(String(item.cost));
      this.setState({ editProduct: item, data });
    }
  };
  // تغییرات اعمال شده را ثبت میکند
  submitEdit = () => {
    const { city_class_member } = this.props;
    const { data, editProduct, products } = cloneDeep(this.state);
    const userId = city_class_member.member.id;
    const url = `customers/${userId}/merchandise/${editProduct.id}`;
    axios.put(url, data).then(({ data }) => {
      const index = products.findIndex((e) => e.id === editProduct.id);
      products[index] = data.data;
      notification({ text: data.msg, type: "success" });
      this.setState({ products });
      this.setEditProduct(null);
    });
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    const { data, showCost, products, removeProduct, editProduct } = cloneDeep(
      this.state
    );
    const name = data.type === "service" ? "خدمات" : "کالا";
    const showProducts = products.length > 0;
    const showModalRemoveProduct = removeProduct !== null;
    const showButtonEditProduct = editProduct !== null;
    return (
      <div className="DefineProduct">
        <header>
          <label>معرفی کالا / خدمات</label>
        </header>
        <Row>
          <Col xs="12" md="6" className="my-1">
            <InputGroupDropdown
              label="نوع"
              setValue={(value) => {
                data.type = value;
                this.setState({ data });
              }}
              value={data.type}
              items={this.types}
            />
          </Col>
          <Col xs="12" md="6" className="my-1">
            <InputGroup
              className="my-2"
              label={`نام ${name}`}
              value={data.name}
              setValue={(value) => {
                data.name = value;
                this.setState({ data });
              }}
            />
          </Col>
          <Col xs="12" md="6" className="my-1">
            <InputGroup
              label={`کد ${name}`}
              value={data.code}
              type="text-en"
              setValue={(value) => {
                data.code = value;
                this.setState({ data });
              }}
            />
          </Col>
          <Col xs="12" md="6" className="my-1">
            <InputGroup
              label="مبلغ"
              value={showCost}
              type="tel"
              setValue={this.setCost}
            />
          </Col>
          <Col xs="12">
            {showButtonEditProduct ? (
              <ButtonGroup
                className="submit"
                buttons={[
                  {
                    label: "لغو",
                    variant: "danger",
                    onClick: () => this.setEditProduct(null),
                  },
                  {
                    label: "ثبت تغییر",
                    variant: "warning",
                    onClick: () => this.submitEdit(),
                  },
                ]}
              />
            ) : (
              <Button type="submit" onClick={this.submit} variant="success">
                ثبت
              </Button>
            )}
          </Col>
          <Col xs="12">
            {showProducts ? (
              <Table>
                <thead>
                  <tr>
                    <th>نوع</th>
                    <th>نام</th>
                    <th>کد</th>
                    <th>مبلغ</th>
                    <th>-</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item, index) => (
                    <tr key={index}>
                      <td>{this.showType(item.type)}</td>
                      <td>{item.name}</td>
                      <td>{item.code}</td>
                      <td>{item.cost.toLocaleString()}</td>
                      <td>
                        <ButtonGroup
                          size="sm"
                          buttons={[
                            {
                              label: "حذف",
                              variant: "danger",
                              onClick: () => this.setModalRemoveProduct(item),
                            },
                            {
                              label: "ویرایش",
                              variant: "warning",
                              onClick: () => this.setEditProduct(item),
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
              show={showModalRemoveProduct}
              onHide={() => this.setModalRemoveProduct(null)}
              title="هشدار"
              bodyText={
                showModalRemoveProduct
                  ? `آیا از حذف ${this.showType(removeProduct["type"])} ${
                      removeProduct["name"]
                    } اطمینان دارید؟`
                  : null
              }
              type="warning"
              buttons={[
                {
                  label: "خیر",
                  variant: "danger",
                  onClick: () => this.setModalRemoveProduct(null),
                },
                {
                  label: "بله",
                  variant: "success",
                  onClick: this.submitRemoveProduct,
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

export default connect(mapStateToProps, null)(DefineProduct);
