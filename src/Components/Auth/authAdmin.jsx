import React from "react";
import { useNavigate } from "react-router-dom";
import userService from "../Services/userService";

const Admin = (props) => {
    let navigate = useNavigate();
  React.useEffect(() => {
    if (!userService.isAdmin()) {
      navigate("/ailurophile-gallery/login", { replace: true });
    }
  }, []);
  return <>{props.children}</>;
};

export default Admin;