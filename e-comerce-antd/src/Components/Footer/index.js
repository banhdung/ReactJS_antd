import { Typography } from "antd";
import React from "react";

export default function AppFooter() {
  return (
    <div className="appFooter">
      <Typography.Link
        href="https://www.facebook.com/banhdungdeptrai"
        target={"_blank"}
      >
        Privacy Policy
      </Typography.Link>
      <Typography.Link
        href="https://www.facebook.com/banhdungdeptrai"
        target={"_blank"}
      >
        Terms & Conditions
      </Typography.Link>
      <Typography.Link
        href="https://www.facebook.com/banhdungdeptrai"
        target={"_blank"}
      >
        Return Policy
      </Typography.Link>
      <Typography.Link href="tel:+09888888" target={"_blank"}>
        +09888888
      </Typography.Link>
    </div>
  );
}
