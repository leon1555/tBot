import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark mt-5 p-4 text-center antic-font-light">
      &copy; {new Date().getFullYear()} Leon Chisholm
    </footer>
  );
}
