import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className="flex flex-col h-screen">
    <div>
      <Header />
    </div>
    <div className="flex-grow py-10">
      <main>{props.children}</main>
    </div>
    <div>
      <Footer />
    </div>
  </div>
);

export default Layout;
