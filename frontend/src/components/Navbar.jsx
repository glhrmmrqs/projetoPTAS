"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b bg-white">
      <nav className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="font-bold text-red-600 text-lg">
          SwitchUp!
        </Link>
        <div className="flex gap-2">
          {pathname !== "/" && (
            <Link href="/">
              <Button variant="outline" className="border-red-500 text-red-600">
                Home
              </Button>
            </Link>
          )}
          {pathname !== "/login" && (
            <Link href="/login">
              <Button variant="outline" className="border-red-500 text-red-600">
                Login
              </Button>
            </Link>
          )}
          {pathname !== "/cadastro" && (
            <Link href="/cadastro">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Cadastro
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}