import { Divider, Menu, notification, Row } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import Link from "next/link";
import { useRouter } from "next/router";

const NavbarWrapper: any = () => {
  const router = useRouter();

  async function logout() {
    await signOut();
    notification["info"]({
      message: "Logout Successfully",
      description: "Have a Nice Day",
    });
    router.push("/auth");
  }
  const items = [
    { label: <Link href="/">Home</Link>, key: "home", icon: <HomeOutlined /> },

    {
      label: <div className="text-danger">Soul Courses</div>,
      key: "brand",
      disabled: true,
      style: { marginLeft: "auto" },
    },

    {
      label: "Profile",
      key: "profile",
      icon: <UserOutlined />,
      style: { marginLeft: "auto" },
      children: [
        { label: "My Info", key: "info" },
        { label: "Logout", key: "logout", onClick: logout },
      ],
    },
  ];
  return (
    <div className="container">
      <Menu items={items} mode="horizontal" defaultSelectedKeys={["home"]} />
    </div>
  );
};

export default NavbarWrapper;
