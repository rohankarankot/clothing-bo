import { BrowserRouter } from "react-router-dom";
import SidebarComponent from "./components/sidebar/sidebar.component";
import ContainerMain from "./components/container/container.main";
import HeaderComponent from "./components/header/header.component";

const Layout = () => {
  return (
    <>
      <HeaderComponent />
      <BrowserRouter>
        <div className="flex">
          <SidebarComponent />
          <ContainerMain />
        </div>
      </BrowserRouter>
    </>
  );
};

export default Layout;
