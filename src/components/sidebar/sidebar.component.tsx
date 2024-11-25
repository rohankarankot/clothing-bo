import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const SidebarComponent = () => {
  return (
    <div className="sidebar w-1/4 px-4 sticky top-20 bottom-0 h-full overflow-y-auto">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Product</AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-4">
              <Link to={"/"}>
                <li>All</li>
              </Link>
              <Link to={"/add-product"}>
                <li>Add New</li>
              </Link>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="orders">
          <AccordionTrigger>Orders</AccordionTrigger>
          <AccordionContent>
            <ul>
              <li>All</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="reservations">
          <AccordionTrigger>Reservations</AccordionTrigger>
          <AccordionContent>
            <ul>
              <li>All</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SidebarComponent;
