import * as React from "react";
import { FilterIcon, Plus } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/app/_components/ui/sidebar";
// import { Calendars } from "./calendars";
import { DatePickerMenuLateral } from "./date-picker-menu-right";

// This is sample data.
// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/avatars/shadcn.jpg",
//   },
//   calendars: [
//     {
//       name: "My Calendars",
//       items: ["Personal", "Work", "Family"],
//     },
//     {
//       name: "Favorites",
//       items: ["Holidays", "Birthdays"],
//     },
//     {
//       name: "Other",
//       items: ["Travel", "Reminders", "Deadlines"],
//     },
//   ],
// };

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky top-0 hidden h-svh border-l lg:flex"
      {...props}
    >
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <div className="flex items-center gap-3 p-4">
          Filtros Avançados <FilterIcon size={18} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <DatePickerMenuLateral />
        <SidebarSeparator className="mx-0" />
        {/* <Calendars calendars={data.calendars} /> */}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Plus />
              <span>New Calendar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
