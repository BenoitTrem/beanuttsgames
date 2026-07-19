"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-brand" onClick={() => setOpen(false)}>
        Beanutts Games
      </Link>

      <button
        className="navbar-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <div className={`navbar-links ${open ? "navbar-links-open" : ""}`}>
        <Link href="/" onClick={() => setOpen(false)}>
          Home
        </Link>
        <Link href="/games" onClick={() => setOpen(false)}>
          Games
        </Link>
        <Link href="/news" onClick={() => setOpen(false)}>
          News
        </Link>
        <Link href="/contact" onClick={() => setOpen(false)}>
          Contact
        </Link>
      </div>
    </nav>
  );
}
