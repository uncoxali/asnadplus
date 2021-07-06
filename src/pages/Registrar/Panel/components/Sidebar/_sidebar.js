import {
  Person,
  CheckCircle,
  HouseDoorFill,
  PencilSquare,
} from "react-bootstrap-icons";
const sidebarItem = [
  {
    tag: "Link",
    to: "/",
    label: "داشبورد",
    icon: HouseDoorFill,
  },
  {
    tag: "Accordion",
    to: "/user",
    label: "اطلاعات اولیه مشتری",
    icon: Person,
    children: [
      {
        tag: "Link",
        to: "/user/define-user",
        label: "پروفایل مشتری",
        icon: null,
      },
      {
        tag: "Link",
        to: "/user/define-bank-account",
        label: "معرفی بانک و حساب بانکی",
        icon: null,
      },
      {
        tag: "Link",
        to: "/user/define-user-bank-account",
        label: "تعریف حساب بانکی کاربر",
        icon: null,
      },
      {
        tag: "Link",
        to: "/user/define-product",
        label: "معرفی کالا",
        icon: null,
      },
      {
        tag: "Link",
        to: "/user/define-person",
        label: "معرفی اشخاص / شرکت‌ها",
        icon: null,
      },
      {
        tag: "Link",
        to: "/user/funds",
        label: "موجودی صندوق",
        icon: null,
      },
      {
        tag: "Link",
        to: "/user/inventory",
        label: "موجودی انبار",
        icon: null,
      },
      {
        tag: "Link",
        to: "/user/fiscal-year-selection",
        label: "انتخاب سال مالی",
        icon: null,
      },
    ],
  },
  {
    tag: "Link",
    to: "/registration-of-purchase-and-settlement",
    label: "ثبت خرید و تسویه",
    icon: PencilSquare,
  },
  {
    tag: "Link",
    to: "/registration-of-sales-and-settlement",
    label: "ثبت فروش و تسویه",
    icon: PencilSquare,
  },
  {
    tag: "Link",
    to: "/registration-fee-and-settlement",
    label: "ثبت هزینه و تسویه",
    icon: CheckCircle,
  },
  {
    tag: "Link",
    to: "/registration-of-payment-checks",
    label: "ثبت چک‌های پرداختی",
    icon: Person,
  },
  {
    tag: "Link",
    to: "/payment-of-installments",
    label: "پرداخت اقساط",
    icon: Person,
  },
  {
    tag: "Link",
    to: "#",
    label: "وضعیت چک‌های دریافتی",
    icon: Person,
  },
  {
    tag: "Link",
    to: "/cash-payment-to-the-bank",
    label: "پرداخت نقدی به بانک",
    icon: Person,
  },
  {
    tag: "Link",
    to: "/withdrawal-from-the-bank",
    label: "برداشت از بانک",
    icon: Person,
  },
  {
    tag: "Link",
    to: "#",
    label: "انتقال بین بانکی",
    icon: Person,
  },
  {
    tag: "Accordion",
    to: "#",
    label: "گزارشات",
    icon: Person,
    children: [],
  },
  {
    tag: "Accordion",
    to: "#",
    label: "بازیابی و تنظیمات",
    icon: Person,
    children: [],
  },
];
export default sidebarItem;
