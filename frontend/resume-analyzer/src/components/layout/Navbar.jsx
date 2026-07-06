import React, { useState, useRef, useEffect } from "react";
import { Menu, Bell, Sun, Moon, ChevronDown } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar({ onMenuClick, title = "Dashboard" }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const { user, logout, loading } = useAuth();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h1 className="font-display text-base font-semibold sm:text-lg">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? (
              <Sun className="h-[18px] w-[18px]" />
            ) : (
              <Moon className="h-[18px] w-[18px]" />
            )}
          </Button>

          <Button variant="ghost" size="icon" className="relative rounded-xl">
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
          </Button>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 rounded-xl border border-border bg-card/60 py-1.5 pl-1.5 pr-2.5 hover:bg-muted"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-gradient text-xs font-semibold text-white">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>

              <span className="hidden text-sm font-medium sm:inline">
                {loading ? "Loading..." : user?.name}
              </span>

              <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground sm:inline" />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-card shadow-xl">
                <button
                  className="block w-full px-4 py-3 text-left hover:bg-muted"
                  onClick={logout}
                  aria-label="Log out of your account"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
