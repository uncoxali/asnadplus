import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import Loading from "../../components/Loading";

const SignIn = lazy(() => import("../../pages/SignIn"));
const Registrar = lazy(() => import("../Registrar"));

export default function MainLayout() {
  const isLogin = useSelector((state) => state.isLogin);
  const role = useSelector((state) => state.role);
  return (
    <div className="MainLayout">
      <Suspense fallback={<Loading />}>
        <Switch>
          {role !== null ? <Redirect from="/sign-in" to={`/${role}`} /> : null}
          <Route name="sign-in" path="/sign-in" component={SignIn} exact />
          {!isLogin ? <Redirect to="/sign-in" /> : null}
          <Route name="registrar" path="/registrar" component={Registrar} />
          <Redirect from="/" to={role === null ? "/sign-in" : `/${role}`} />
        </Switch>
      </Suspense>
    </div>
  );
}
