import React, { useEffect, useState } from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const AppFooter = () => {
  const [showFooter, setShowFooter] = useState(false);

  const handleScroll = () => {
    console.log(window.pageYOffset);
    console.log(document.documentElement.clientHeight);
    console.log(document.documentElement.scrollHeight);

    const isBottomOfPage =
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight;
    setShowFooter(isBottomOfPage);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Footer
      style={{
        backgroundColor: "#f0f2f5",
        textAlign: "center",
        display: showFooter ? "block" : "none",
      }}
    >
      <div style={{ height: "15px" }}>
        <p style={{ margin: 0 }}>© 2023 D Shop. All rights reserved.</p>
        <p style={{ margin: 0 }}></p>
      </div>
    </Footer>
  );
};

export default AppFooter;
