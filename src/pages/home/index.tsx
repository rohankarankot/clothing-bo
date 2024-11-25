import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { MdOutlineModeEditOutline } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const Home = () => {
  const products = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    image: "https://via.placeholder.com/100", // Replace with actual image URLs
    name: `Product ${index + 1}`,
    sku: `SKU${index + 1}`,
    stockQty: Math.floor(Math.random() * 500) + 1,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate indices for slicing
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(products.length / itemsPerPage))
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="max-w-4xl mx-auto shadow-md rounded-lg p-4">
      <input
        type="text"
        placeholder="search for product"
        className="w-1/2 p-2 my-4 rounded-lg border-2 text-black"
      />
      <Button className="mx-4 p-4" variant={"outline"}>
        Search
      </Button>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 p-4">Image</th>
            <th className="border border-gray-300 p-4">Product</th>
            <th className="border border-gray-300 p-4">SKU</th>
            <th className="border border-gray-300 p-4">Stock Qty</th>
            <th className="border border-gray-300 p-4" colSpan={2}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.slice(startIndex, endIndex).map((product) => (
            <tr key={product.id}>
              <td className="border border-gray-300 p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="border border-gray-300 p-4">{product.name}</td>
              <td className="border border-gray-300 p-4">{product.sku}</td>
              <td className="border border-gray-300 p-4">{product.stockQty}</td>
              <td className="border border-gray-300 p-4">
                <MdOutlineModeEditOutline className="text-2xl cursor-pointer text-yellow-500" />
              </td>
              <td className="border border-gray-300 p-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="link" className="3xl">
                      <FaTrash className="text-lg cursor-pointer text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure? Want to delete this entry
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {Math.ceil(products.length / itemsPerPage)}
        </span>
        <Button
          variant="outline"
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(products.length / itemsPerPage)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Home;
