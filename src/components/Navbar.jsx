import React from "react";

const Navbar = () => {
  return (
    <div className="bg-slate-600 p-5">
      <nav className="w-[90%] mx-auto flex justify-between items-center text-white ">
        <h2 className="text-2xl font-bold">Ecommerce 🛒</h2>
        <ul className="flex gap-8 items-center">
          <li>Login</li>
          <li className="border-2 border-slate-300 px-4 py-1  cursor-pointer hover:bg-white hover:text-black">
            Get Started
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
