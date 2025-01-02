"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarNavigation = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-8 lg:gap-10">
      <Link
        href="#inicio"
        className={
          pathname === "inicio"
            ? "font-bold text-primary"
            : "text-muted-foreground"
        }
      >
        Início
      </Link>

      <Link
        href="#about"
        className={
          pathname === "#about"
            ? "font-bold text-primary"
            : "text-muted-foreground"
        }
      >
        About
      </Link>

      <Link
        href="#price"
        className={
          pathname === "#price"
            ? "font-bold text-primary"
            : "text-muted-foreground"
        }
      >
        Preço
      </Link>
    </div>
  );
};

export default NavbarNavigation;
