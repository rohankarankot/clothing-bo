import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SidebarComponent = () => {
  return (
    <div className="sidebar w-1/4 px-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Product</AccordionTrigger>
          <AccordionContent>
            <ul>
              <li>All</li>
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
