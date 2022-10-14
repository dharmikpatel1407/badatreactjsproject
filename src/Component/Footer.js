import React, { useState, useEffect } from "react";
// import Link from "@material-ui/core/Link";
import { withRouter, Link } from "react-router-dom";
import Swal from "sweetalert2";
// import ABOUT_US from "../AppAsset/About-us2.png";
import ABOUT_US from "../Pages/images/about-us.png"
import WHY_USE_BADHAT from "../AppAsset/Why-use-badhat.jpg";
import "../AppAsset/CSS/Footer.css";

const Footer = ({ history }) => {
  const [display, setDisplay] = useState(
    window.location.href.includes("/product/")
  );

  useEffect(() => {
    setDisplay(window.location.href.includes("/product/"));
  }, []);

  const onClickHandle = () => {
    // Swal({
    //   text: "Hello world!",
    // });
     Swal.fire({
      title:"How Zulk works",
      text: "Zulk helps retailers in finding quality products at best margin. Suppliers can sell in Zulk with ease of a few clicks.",
      // imageUrl: true ? ABOUT_US : WHY_USE_BADHAT,
      // imageWidth: "600",
      // imageHeight: "100%",
      // imageAlt: param,
      showConfirmButton: false,
      showCloseButton: true,
    });
  };
  return (
    <div className="footerContainer">
      <div
        style={{
          width: "30%",
          marginTop: "10px",
          marginLeft: "1%",
          marginRight: "2%",
          textAlign: "center",
          fontSize: "15px",
        }}
      >
        <Link
          // component="button"
          // variant="body3"
          onClick={() => onClickHandle()}
          style={{ textDecoration: "none", color: "black" }}
        >
          How to use Zulk
        </Link>
      </div>
      <div
        style={{
          width: "30%",
          marginTop: "10px",
          marginLeft: "2%",
          marginRight: "2%",
          textAlign: "center",
          fontSize: "15px",
        }}
      >
        <Link
          // component="button"
          // variant="body3"
          to="/help"
          style={{ textDecoration: "none", color: "black" }}
        >
          Help
        </Link>
      </div>
      <div
        style={{
          width: "30%",
          marginTop: "10px",
          marginLeft: "2%",
          marginRight: "2%",
          textAlign: "center",
          fontSize: "15px",
        }}
      >
        <Link
          // component="button"
          // variant="body3"
          to="/privacy-policy"
          style={{ textDecoration: "none", color: "black" }}
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default withRouter(Footer);
