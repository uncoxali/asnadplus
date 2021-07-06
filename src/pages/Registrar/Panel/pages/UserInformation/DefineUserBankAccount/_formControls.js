const formControls = [
  {
    tag: "InputGroupDropdown",
    label: "نام بانک",
    state: "bank_id",
    items: [],
  },
  {
    tag: "InputGroupDropdown",
    label: "نوع حساب",
    state: "account_type_id",
    items: [],
  },
  {
    tag: "InputGroup",
    label: "نام شعبه",
    state: "branch_name",
  },
  {
    tag: "InputGroup",
    label: "شماره حساب",
    state: "account_number",
    type:'tel'
  },
  {
    tag: "InputGroup",
    label: "شماره کارت",
    state: "card_number",
    type:'tel'
  },
  {
    tag: "InputGroup",
    label: "موجودی اولیه",
    state: "balance",
    type:'tel'
  },
];

export default formControls;
