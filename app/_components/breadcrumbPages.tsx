"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/app/_components/ui/breadcrumb";
import { useSelectedItem } from "@/app/_contexts/SelectedItemContext";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { useState, useEffect } from "react";

const BreadcrumbPages = () => {
  const { selectedItem, selectedSubItem } = useSelectedItem();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento enquanto os dados do sessionStorage estão sendo obtidos
    const checkLoading = () => {
      const item = sessionStorage.getItem("selectedItem");
      const subItem = sessionStorage.getItem("selectedSubItem");

      if (item !== null && subItem !== null) {
        setIsLoading(false);
      }
    };

    checkLoading();
  }, [selectedItem, selectedSubItem]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {isLoading ? (
          <>
            <BreadcrumbItem className="hidden md:block">
              <Skeleton className="h-4 w-24 bg-accent" />
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <Skeleton className="h-4 w-32 bg-accent" />
            </BreadcrumbItem>
          </>
        ) : (
          <>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink>{selectedItem || ""}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{selectedSubItem || ""}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbPages;
