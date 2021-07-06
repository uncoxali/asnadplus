import React, { Suspense } from "react";
import { Route, Switch } from "react-router";
import Loading from "../../components/Loading";

const Panel = React.lazy(() => import("../../pages/Registrar/Panel"));

export default function Registrar() {
  const base = "/registrar";
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path={`${base}`} component={Panel} />
      </Switch>
    </Suspense>
  );
}
