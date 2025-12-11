"use client";

import Link from "next/link";
import { useState } from "react";
import NavItem from "./NavItem";
import { Minus, Plus } from "lucide-react";
import { User } from "@prisma/client";

interface NavbarProps {
  user: User | null;
}

const Navbar = ({ user }: NavbarProps) => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => setMenu(!menu);

  return (
    <nav className="relative z-10 w-full text-gray-800 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mx-5 sm:mx-10 lg:mx-20">
        <div className="flex items-center text-2xl h-14">
          <Link href={"/"} className="flex items-center gap-2">
            <div className="size-8 rounded-md bg-black" />
            <h1 className="text-2xl">SecondHand</h1>
          </Link>
        </div>

        <div className="text-2xl sm:hidden flex items-center">
          <button onClick={handleMenu}>{!menu ? <Plus /> : <Minus />}</button>
        </div>

        <div className="hidden text-2xl sm:block">
          <NavItem user={user} />
        </div>
      </div>

      <div className="block sm:hidden">
        {menu && <NavItem mobile user={user} />}
      </div>
    </nav>
  );
};

export default Navbar;
