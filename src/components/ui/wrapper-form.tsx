import * as React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Home } from "lucide-react";

import { Button } from "@/components/ui/button";

export function WrapperForm({
  title,
  description,
  children,
  href,
  label,
  message,
  ...props
}: React.ComponentProps<"section"> & {
  title: string;
  description: string;
  href: string;
  label: string;
  message: string;
}) {
  return (
    <section
      className="max-w-md mx-auto p-0 space-y-6"
      aria-label={title}
      tabIndex={-1}
      {...props}
    >
      <div className="flex items-center justify-center">
        <Button variant="outline" size="icon">
          <Link to="/">
            <Home className="size-4" />
            <span className="sr-only">Home</span>
          </Link>
        </Button>
      </div>
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-primary mb-1">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      {children}
      <div className="flex items-center justify-between gap-2">
        {message && (
          <span className="text-sm text-muted-foreground">{message}</span>
        )}
        {href && (
          <Button variant="outline" size="sm" className="group">
            <Link to={href} className="flex items-center gap-2">
              <ChevronLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden md:block">{label}</span>
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
}
WrapperForm.displayName = "WrapperForm";
