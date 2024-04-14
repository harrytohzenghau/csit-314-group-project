import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import MainNavigation from "./MainNavigation";
import { Toaster } from "react-hot-toast";

import classes from "./Root.module.css";

const Root = () => {
  return (
    <div className={classes.wrapper}>
      <Toaster
        toastOptions={{
          className: classes.toaster,
        }}
      />
      <MainNavigation />
      <main className={classes.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;
