const formControls = [
  {
    tag: "InputGroup",
    label: "نام شخص / شرکت",
    value: "name",
    type: "text",
  },
  {
    tag: "InputGroup",
    label: "شماره اقتصادی",
    value: "merchant_number",
    type: "tel",
  },
  {
    tag: "InputGroup",
    label: "کد / شناسه ملی",
    value: "nation_code",
    type: "number",
  },
  {
    tag: "InputGroup",
    label: "شماره تماس",
    value: "phone",
    type: "number",
  },
  {
    tag: "InputGroupDropdown",
    label: "نام استان",
    value: "state_id",
    items: [],
  },
  {
    tag: "InputGroupDropdown",
    label: "نام شهر",
    value: "city_id",
    items: [],
  },
  {
    tag: "InputGroup",
    label: "آدرس",
    value: "address",
    type: "text",
  },
];

export default formControls;
