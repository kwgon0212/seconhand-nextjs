"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import NavItem from "./NavItem";
import { Minus, Plus } from "lucide-react";
import { User } from "@prisma/client";
import Image from "next/image";
import clsx from "clsx";

interface NavbarProps {
  user: User | null;
}

const Navbar = ({ user }: NavbarProps) => {
  const [menu, setMenu] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleMenu = () => setMenu(!menu);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 스크롤이 맨 위에 있으면 항상 보이기
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else {
        // 아래로 스크롤하면 숨기기, 위로 스크롤하면 보이기
        if (currentScrollY > lastScrollY) {
          // 아래로 스크롤
          setIsVisible(false);
        } else {
          // 위로 스크롤
          setIsVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 w-full text-gray-800 bg-white",
        "border-b border-gray-200 shadow-sm transition-transform duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="flex items-center justify-between mx-5 sm:mx-10 lg:mx-20">
        <div className="flex items-center text-2xl h-14">
          <Link href={"/"} className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="logo"
              width={40}
              height={40}
              className="object-cover"
              priority
            />
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
