"use client";
import { Search ,BellDot ,Grip } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import CustomImage from "@/components/custom/Image";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm rounded-xl my-1 mx-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between ">
          {/* Left Section - Branding & Navigation */}
          <div className="flex items-center gap-8 ">
            {/* Logo Group */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex flex-col">
                <CustomImage
                  src="/headerImages/logo.svg"
                  alt="Logo"
                  width={150}
                />
              </div>
            </Link>
          </div>

          {/* CenterSection - Workspace & Search */}
          <div className="flex items-center gap-6 ">
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex gap-2 text-[var(--forgrond)] font-semibold">
                    Client Workspace:
                    <CustomImage
                      src="/headerImages/spacelogo.svg"
                      alt="Logo"
                      width={28}
                    />
                    <ChevronDown />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Workspace</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>workspace 1</DropdownMenuItem>
                  <DropdownMenuItem>workspace 2</DropdownMenuItem>
                  <DropdownMenuItem>workspace 3</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Search Bar */}
            <div className="relative w-72">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="block w-full rounded-lg border-0 py-2 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* right */}
          <div className="flex justify-evenly gap-3 ">
            <Avatar>
              <AvatarImage   src="/headerImages/spacelogo.svg"/>
              <AvatarFallback>Logo</AvatarFallback>
            </Avatar>
            <div className="bg-[#69ABEF] w-8 h-8 flex justify-center items-center rounded-full text-white">AK</div>
            <div className="border-r-2 "/>
            <button><BellDot/></button>
            <div className="border-r-2 "/>
            <button><Grip/></button>
          </div>
        </div>
      </div>
    </header>
  );
}
