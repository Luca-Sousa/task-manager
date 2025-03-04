"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";
import { Button } from "@/app/_components/ui/button";
import { faqs_category } from "@/app/_constants/data-faqs";
import { useState } from "react";

const FAQContent = () => {
  const [activeCategory, setActiveCategory] = useState("Geral");

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  const filteredFAQs =
    activeCategory === "Geral"
      ? faqs_category.flatMap((category) => category.faqs)
      : faqs_category.find((category) => category.Category === activeCategory)
          ?.faqs || [];

  return (
    <div className="flex w-[calc(100vw-6px)] flex-col gap-5 px-4 md:w-[calc(100vw-262px)] 2xl:w-full">
      <div className="flex items-center gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {faqs_category.map((items, index) => (
          <Button
            variant={
              activeCategory === items.Category ? "default" : "secondary"
            }
            key={index}
            onClick={() => handleCategoryClick(items.Category)}
          >
            {items.Category}
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-5 pb-4">
        {filteredFAQs.map((item, index) => (
          <div key={index} className="flex flex-col gap-5">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger className="rounded-xl border border-accent px-4 py-3 hover:bg-primary/60 focus:bg-primary/60 xl:text-base">
                  {item.title}
                </AccordionTrigger>

                <AccordionContent className="px-4 py-3 text-muted-foreground xl:text-base">
                  {item.response}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQContent;
