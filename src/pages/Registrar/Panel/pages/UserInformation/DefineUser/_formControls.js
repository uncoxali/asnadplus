const formControls = [
  {
    tag: "InputGroup",
    label: "نام کابر",
    value: "name",
    type: "text",
  },
  {
    tag: "InputGroup",
    label: "کد ملی",
    value: "nationcode",
    type: "number",
  },
  {
    tag: "InputGroup",
    label: "نام اتحادیه / انجمن",
    value: "customer_etehadies",
    type: "text",
    disabled: true,
  },
  {
    tag: "InputGroup",
    label: "نام کاربری",
    value: "username",
    type: "text",
  },
  {
    tag: "InputGroup",
    label: "نوع فعالیت",
    value: "type_action",
    type: "text",
  },
  {
    tag: "InputGroup",
    label: "رمز عبور",
    value: "password",
    type: "texten",
    isOptional: true,
  },
  // {
  //   tag: "InputGroup",
  //   label: "شماره همراه",
  //   value: "",
  //   type: "",
  // },
  {
    tag: "InputGroup",
    label: "گروه قرارداد",
    value: "contract_group",
    type: "text",
    isOptional: true,
  },
  {
    tag: "InputGroupDropdown",
    label: "استان",
    value: "state_id",
    items: [],
  },
  {
    tag: "InputGroupDropdown",
    label: "شهرستان",
    value: "city_id",
    items: [],
  },
];

export default formControls;
