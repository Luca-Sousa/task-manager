"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

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
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);

  // Load initial state from sessionStorage or set defaults
  useEffect(() => {
    const storedSelectedItem = sessionStorage.getItem("selectedItem");
    const storedSelectedSubItem = sessionStorage.getItem("selectedSubItem");

    setSelectedItem(storedSelectedItem || "Dashboard");
    setSelectedSubItem(storedSelectedSubItem || "Informações Gerais");
  }, []);

  // Save to sessionStorage whenever the state changes
  useEffect(() => {
    if (selectedItem !== null) {
      sessionStorage.setItem("selectedItem", selectedItem);
    }
  }, [selectedItem]);

  useEffect(() => {
    if (selectedSubItem !== null) {
      sessionStorage.setItem("selectedSubItem", selectedSubItem);
    }
  }, [selectedSubItem]);

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
