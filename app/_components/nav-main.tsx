"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/_components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/app/_components/ui/sidebar";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useSelectedItem } from "../_contexts/SelectedItemContext";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const { user, isLoaded } = useUser();
  const { setSelectedItem, setSelectedSubItem, selectedSubItem, selectedItem } =
    useSelectedItem();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        {isLoaded && `Bem Vindo, ${user?.fullName || user?.username}!`}
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild
                        onClick={() => {
                          // Atualiza o item principal e o subitem
                          if (selectedItem !== item.title) {
                            setSelectedItem(item.title); // Atualiza o item principal
                            setSelectedSubItem(subItem.title); // Atualiza o subitem do novo item
                          } else {
                            // Se o item principal já estiver selecionado, apenas atualiza o subitem
                            if (selectedSubItem !== subItem.title) {
                              setSelectedSubItem(subItem.title); // Atualiza o subitem
                            }
                          }
                        }}
                      >
                        <Link href={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
