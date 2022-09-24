import NextNProgress from "nextjs-progressbar";
import { ReactNode } from "react";

type LoadingProps = {
  children: ReactNode; // 👈️ type children
};

const LoaderWrapper: any = ({ children }: LoadingProps) => {
  return (
    <>
      <NextNProgress />
      <main>{children}</main>
    </>
  );
};

export default LoaderWrapper;
