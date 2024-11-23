import ContainerMain from "./components/container/container.main";
import HeaderComponent from "./components/header/header.component";
import SidebarComponent from "./components/sidebar/sidebar.component";

const Layout = () => {
  return (
    <div>
      <HeaderComponent />
      <div className="flex gap-2">
        <SidebarComponent />
        <ContainerMain />
      </div>
    </div>
  );
};

export default Layout;
