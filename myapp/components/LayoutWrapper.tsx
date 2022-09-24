import { Space } from "antd";
import { ReactNode } from "react";
import NavbarWrapper from "./NavbarWrapper";

type LayoutProps = {
  children?: ReactNode; // 👈️ type children
};

const LayoutWrapper: any = ({ children }: LayoutProps) => {
  return (
    <>
      <NavbarWrapper />
      <main>
        <section>
          <div className="container py-4">{children}</div>
        </section>
      </main>
    </>
  );
};

export default LayoutWrapper;
