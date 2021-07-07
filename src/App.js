import React from "react";
import { connect } from "react-redux";
import { HashRouter } from "react-router-dom";
import Loading from "./components/Loading";
import Notifications from "./components/Notifications";
import MainLayout from "./layouts/MainLayout";

function App({ loading }) {
  return (
    <React.Fragment>
      {loading ? <Loading /> : null}
      <div dir="rtl" className={`App ${loading ? "loading" : ""}`}>
        <Notifications />
        <HashRouter>
          <MainLayout />
        </HashRouter>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

export default connect(mapStateToProps, null)(App);
