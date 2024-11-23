import { Route, Routes } from "react-router-dom";
import Home from "@/pages/home";
import AddproductComponent from "@/pages/addProduct/addproduct.component";

const ContainerMain = () => {
  return (
    <div className="container w-3/4">
      <Routes>
        <Route path="/add-product" element={<AddproductComponent />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default ContainerMain;
