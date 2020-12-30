import React from "react";
import "./css/footer.css";

const Footer = () => {
  return (
    <div>
      <div className="footer-bottom">
        <p className="text-center">
          {" "}
          {new Date().getFullYear()} Copyright © Weather{" "}
        </p>
      </div>
    </div>
  );
};

export default Footer;
