import { Typography } from "antd";
import React from "react";

export default function AppFooter() {
  return (
    <div className="appFooter">
      <Typography.Link
        style={{ color: "white", fontSize: "17px", marginRight: "500px" }}
        href="#"
        target={"_blank"}
      >
        © 2020 Dress Shop. All rights reserved.
      </Typography.Link>
      <Typography.Link
        style={{ color: "white", fontSize: "17px" }}
        href="#"
        target={"_blank"}
      >
        banhdung
      </Typography.Link>
    </div>
  );
}
