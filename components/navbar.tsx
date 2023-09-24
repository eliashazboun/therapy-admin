"use client";
import React, { useState } from "react";
import { UserButton, auth } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";

import { LayoutDashboard } from "lucide-react";
import { ArrowRightFromLine,CalendarDays,Settings, Users } from "lucide-react";
import {  } from 'lucide-react';

import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavbarProps {
  name: string | null | undefined;
}

const Navbar: React.FC<NavbarProps> = ({ name }) => {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.practiceId}`,
      label: "Dashboard",
      icon: <LayoutDashboard/>,
      active: pathname === `/${params.practiceId}`,
    },
 
    {
      href: `/${params.practiceId}/calendar`,
      label: "Calendar",
      icon: <CalendarDays />,
      active: pathname === `/${params.practiceId}/calendar`,
    },
    {
      href: `/${params.practiceId}/clients`,
      label: "Clients",
      icon: <Users />,
      active: pathname === `/${params.practiceId}/clients`,
    },
    {
      href: `/${params.practiceId}/settings`,
      label: "Settings",
      icon: <Settings />,
      active: pathname === `/${params.practiceId}/settings`,
    },
  ];
  
  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-60" : "w-11"
        } duration-300 flex flex-col p-5 pt-8 items-center  border-r  h-screen relative`}
      >
        <div
          className="absolute top-20 -right-6 border  p-2 bg-white rounded-full  cursor-pointer  hover:bg-gray-100 duration-500"
          onClick={() => setOpen((prev) => !prev)}
        >
          <ArrowRightFromLine
            size={22}
            className={`${
              open && "transform -rotate-180"
            } duration-500 relative`}
          />
        </div>
        
        <div className="flex flex-col gap-x-4 items-center">
          <UserButton afterSignOutUrl="/" />
          <h3
            className={`origin-center text-xl font-bold duration-300 whitespace-nowrap ${
              !open && "scale-0"
            }`}
          >
            {name}
          </h3>
          <Separator
            className={`origin-center text-xl font-bold duration-300 whitespace-nowrap ${
              !open && "scale-0"
            }`}
          />
        
        </div>
        <div className="pt-16 flex flex-col gap-2">
          {routes.map((route,idx) => (
            <>
            {idx === 0 && <Separator/>}
            <Link
              href={route.href}
              key={route.href}
              className={cn("flex rounded-md p-2 cursor-pointer hover:bg-blue-200 items-center gap-x-4 gap-y-5",
                route.active && "bg-blue-200 underline")}
            >
              {route.icon}
              <span className={`${!open && 'hidden'} font-bold`}>{route.label}</span>

            </Link>
            <Separator/>
            </>
          ))}

        </div>

      </div>
    </div>
  );
};

export default Navbar;
