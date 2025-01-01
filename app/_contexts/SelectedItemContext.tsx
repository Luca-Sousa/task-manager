"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { data } from "../_constants/data_sidebar";

interface SelectedItemContextType {
  selectedItem: string | null;
  setSelectedItem: (item: string | null) => void;
  selectedSubItem: string | null;
  setSelectedSubItem: (subItem: string | null) => void;
}

const SelectedItemContext = createContext<SelectedItemContextType | undefined>(
  undefined,
);

export const SelectedItemProvider = ({ children }: { children: ReactNode }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>("Dashboard");
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(
    "Informações Gerais",
  );

  useEffect(() => {
    // Atualiza o selectedSubItem para o primeiro subitem do selectedItem, mas somente se
    // não houver um subitem selecionado pelo usuário
    if (selectedItem) {
      const item = data.navMain.find(
        (navItem) => navItem.title === selectedItem,
      );
      if (item && item.items.length > 0) {
        // Só atualiza o subitem se não houver um subitem selecionado
        if (
          !selectedSubItem ||
          !item.items.some((subItem) => subItem.title === selectedSubItem)
        ) {
          setSelectedSubItem(item.items[0].title); // Define o primeiro subitem
        }
      }
    }
  }, [selectedItem, selectedSubItem]);

  return (
    <SelectedItemContext.Provider
      value={{
        selectedItem,
        setSelectedItem,
        selectedSubItem,
        setSelectedSubItem,
      }}
    >
      {children}
    </SelectedItemContext.Provider>
  );
};

export const useSelectedItem = () => {
  const context = useContext(SelectedItemContext);
  if (!context) {
    throw new Error(
      "useSelectedItem must be used within a SelectedItemProvider",
    );
  }
  return context;
};
