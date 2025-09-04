import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuthStore } from "@/stores/auth-store";
import {
  IconMenu2,
  IconX,
  IconLogin,
  IconUserPlus,
  IconDashboard,
  IconShield,
  IconStethoscope,
} from "@tabler/icons-react";

export function WebsiteNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { checkAuth, checkAdmin } = useAuthStore();
  const isAuthenticated = checkAuth();
  const isAdmin = checkAdmin();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "Technology", href: "#technology" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <IconStethoscope className="text-blue-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  NeoCare
                </span>
                <span className="text-xs text-muted-foreground -mt-1">
                  Phototherapy System
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />

            {!isAuthenticated && (
              <>
                <Button variant="ghost" size="sm">
                  <Link to="/auth/sign-in" className="flex items-center gap-2">
                    <IconLogin className="mr-2 h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
                <Button size="sm">
                  <Link to="/auth/sign-up">
                    <IconUserPlus className="mr-2 h-4 w-4 flex items-center gap-2" />
                    Sign Up
                  </Link>
                </Button>
              </>
            )}

            {isAuthenticated && isAdmin && (
              <Button>
                <Link to="/dashboard" className="flex items-center gap-2">
                  <IconDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
            )}

            {isAuthenticated && !isAdmin && (
              <div className="flex items-center space-x-2">
                <IconShield className="h-4 w-4 text-green-500" />
                <span className="text-sm text-muted-foreground">Signed In</span>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ModeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <IconX className="h-6 w-6" />
              ) : (
                <IconMenu2 className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}

              <div className="pt-4 border-t space-y-2">
                {!isAuthenticated && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <Link
                        to="/auth/sign-in"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-2"
                      >
                        <IconLogin className="mr-2 h-4 w-4" />
                        Sign In
                      </Link>
                    </Button>
                    <Button size="sm" className="w-full justify-start">
                      <Link
                        to="/auth/sign-up"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-2"
                      >
                        <IconUserPlus className="mr-2 h-4 w-4" />
                        Sign Up
                      </Link>
                    </Button>
                  </>
                )}

                {isAuthenticated && isAdmin && (
                  <Button size="sm" className="w-full justify-start">
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2"
                    >
                      <IconDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </Button>
                )}

                {isAuthenticated && !isAdmin && (
                  <div className="flex items-center space-x-2 px-3 py-2">
                    <IconShield className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">
                      Signed In
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
