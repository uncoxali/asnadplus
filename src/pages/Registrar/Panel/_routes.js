import React from "react";
const routes = [
  {
    name: "dashboard",
    pathname: "/",
    component: React.lazy(() => import("./pages/Dashboard")),
  },
  {
    name: "define user",
    pathname: "/user/define-user",
    component: React.lazy(() => import("./pages/UserInformation/DefineUser")),
  },
  {
    name: "define bank account",
    pathname: "/user/define-bank-account",
    component: React.lazy(() =>
      import("./pages/UserInformation/DefineBankAccount")
    ),
  },
  {
    name: "define user bank account",
    pathname: "/user/define-user-bank-account",
    component: React.lazy(() =>
      import("./pages/UserInformation/DefineUserBankAccount")
    ),
  },
  {
    name: "define product",
    pathname: "/user/define-product",
    component: React.lazy(() =>
      import("./pages/UserInformation/DefineProduct")
    ),
  },
  {
    name: "define person",
    pathname: "/user/define-person",
    component: React.lazy(() => import("./pages/UserInformation/DefinePerson")),
  },
  {
    name: "funds",
    pathname: "/user/funds",
    component: React.lazy(() => import("./pages/UserInformation/Funds")),
  },
  {
    name: "inventory",
    pathname: "/user/inventory",
    component: React.lazy(() => import("./pages/UserInformation/Inventory")),
  },
  {
    name: "fiscal year selection",
    pathname: "/user/fiscal-year-selection",
    component: React.lazy(() =>
      import("./pages/UserInformation/FiscalYearSelection")
    ),
  },
  {
    name: "registration of purchase and settlement",
    pathname: "/registration-of-purchase-and-settlement",
    component: React.lazy(() =>
      import("./pages/RegistrationOfPurchaseAndSettlement")
    ),
  },
  {
    name: "registration of sales and settlement",
    pathname: "/registration-of-sales-and-settlement",
    component: React.lazy(() =>
      import("./pages/RegistrationOfSalesAndSettlement")
    ),
  },
  {
    name: "registration fee and settlement",
    pathname: "/registration-fee-and-settlement",
    component: React.lazy(() => import("./pages/RegistrationFeeAndSettlement")),
  },
  {
    name: "registration of payment checks",
    pathname: "/registration-of-payment-checks",
    component: React.lazy(() => import("./pages/RegistrationOfPaymentChecks")),
  },
  {
    name: "payment of installments",
    pathname: "/payment-of-installments",
    component: React.lazy(() => import("./pages/PaymentOfInstallments")),
  },
  {
    name: "cash payment to the bank",
    pathname: "/cash-payment-to-the-bank",
    component: React.lazy(() => import("./pages/CashPaymentToTheBank")),
  },
  {
    name: "withdrawal from the bank",
    pathname: "/withdrawal-from-the-bank",
    component: React.lazy(() => import("./pages/WithdrawalFromTheBank")),
  },
];
export default routes;
