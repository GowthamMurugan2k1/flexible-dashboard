"use client";
import {
  LayoutDashboard,
  UserRound,
  SwatchBook,
  Proportions,
  ClipboardList,
  Signature,
  WalletCards,
  Power,
  Settings,
  ChevronLeft,
  ChevronRight,
  CalendarRange,
} from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

function SideNav() {
  const { open, toggleSidebar } = useSidebar();
  const path = usePathname();
  console.log(path);

  return (
    <>
      <Sidebar
        collapsible="icon"
        variant="floating"
        className="sticky top-0 h-[90%] "
      >
        <SidebarContent>
          <div className="bg-[var(--foreground)] relative h-full p-2 rounded-t-xl flex flex-col gap-4 ">
            {/* top */}

            {sidebarData.map((item) => (
              <SidebarMenuButton
                tooltip={item.title}
                key={item.id}
                className={`hover:bg-[var(--font-color)]/20 ${
                  path === item.href ? "bg-[var(--font-color)]/20  py-2" : " "
                }`}
              >
                <Link
                  href={item.href}
                  className={`flex text-[var(--font-color)] gap-4 w-full text-nowrap rounded-lg text-sm cursor-pointer `}
                >
                  <span>{item.icon}</span> {item.title}
                </Link>
              </SidebarMenuButton>
            ))}
          </div>
        </SidebarContent>

        {/* bottom */}
        <SidebarFooter className="p-0">
          <div className="bg-[var(--foreground)]  flex flex-col justify-end gap-4  rounded-b-xl p-2">
            <Link href={"#"}>
              <Button
                variant={"ghost"}
                className={`flex justify-start text-[var(--font-color)] gap-4 cursor-pointer  p-2 w-full text-nowrap rounded-lg text-sm hover:bg-[var(--font-color)]/20 hover:text-[var(--font-color)]`}
              >
                <span>
                  <Settings size={18} />
                </span>
                Settings
              </Button>
            </Link>
            <Button className="bg-[var(--btn-CTA)] flex justify-center gap-4 p-4 rounded-xl text-white cursor-pointer hover:bg-[var(--btn-CTA)]/80">
              <span>
                <Power />
              </span>
              {open && "Log out"}
            </Button>
          </div>
        </SidebarFooter>
        <button
          className="text-[var(--btn-CTA)]  rounded-full shadow-xl bg-white cursor-pointer p-1 absolute top-4 -right-1"
          onClick={() => toggleSidebar()}
        >
          {open ? <ChevronLeft size={24}/> : <ChevronRight size={15}/>}
        </button>
      </Sidebar>
    </>
  );
}

export default SideNav;

export const sidebarData = [
  {
    id: 1,
    icon: <LayoutDashboard size={18} />,
    title: "Dashboard",
    href: "/",
  },
  {
    id: 2,
    icon: <UserRound size={18} />,
    title: "Accounts",
    href: "#",
  },
  {
    id: 3,
    icon: <SwatchBook size={18} />,
    title: "Batches",
    href: "#",
  },
  {
    id: 4,
    icon: <Proportions size={18} />,
    title: "Resolution",
    href: "#",
  },
  {
    id: 5,
    icon: <ClipboardList size={18} />,
    title: "Assessments",
    href: "#",
  },
  {
    id: 6,
    icon: <Signature size={18} />,
    title: "Appeal Letter",
    href: "/appeal-letter",
  },
  {
    id: 7,
    icon: <WalletCards size={18} />,
    title: "Summary",
    href: "#",
  },
  {
    id: 8,
    icon: <CalendarRange  size={18} />,
    title: "Calendar",
    href: "/calendar",
  },
];
