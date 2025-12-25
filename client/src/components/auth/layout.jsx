import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* //Child 1 left side only on lg screen */}
      <div className="hidden lg:flex items-center justify-center">
        {/* //space y gives a vertical spacing between elements */}
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome to Ecommerce shopping
          </h1>
        </div>
      </div>
      {/* //Child 2 right side */}
      <div
        className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 
      lg:px-8"
      >
        <Outlet />
      </div>
    </div>
  );
}
