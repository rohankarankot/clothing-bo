import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";
import { MdOutlineModeEditOutline } from "react-icons/md";

const Home = () => {
  return (
    <div>
      <input
        type="text"
        placeholder="search for product"
        className="w-1/2 p-2 my-4 rounded-lg border-2 text-black"
      />
      <Button className="mx-4 p-4" variant={"outline"}>
        search
      </Button>
      <table className="table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-4">Image</th>
            <th className="border border-gray-300 p-4">Product</th>
            <th className="border border-gray-300 p-4">SKU</th>
            <th className="border border-gray-300 p-4">stock Qty</th>
            <th className="border border-gray-300 p-4" colSpan={2}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-4">image</td>
            <td className="border border-gray-300 p-4">
              The Sliding Mr. Bones (Next Stop, Pottersville)
            </td>
            <td className="border border-gray-300 p-4">sdfn34lksd</td>
            <td className="border border-gray-300 p-4">3500</td>
            <td className="border border-gray-300 p-4">
              <MdOutlineModeEditOutline className="text-lg cursor-pointer text-yellow-500" />
            </td>
            <td className="border border-gray-300 p-4">
              <FaTrash className="text-lg cursor-pointer text-destructive" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Home;
