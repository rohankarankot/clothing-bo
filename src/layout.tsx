import { BrowserRouter } from "react-router-dom";
import SidebarComponent from "./components/sidebar/sidebar.component";
import ContainerMain from "./components/container/container.main";

const Layout = () => {
  return (
    <BrowserRouter>
      <div className="flex">
        <SidebarComponent />
        <ContainerMain />
      </div>
    </BrowserRouter>
  );
};

export default Layout;
