import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
export default function Layout() {
  return (
    <div className="min-h-screen bg-[#0D0B21] flex flex-col">
      <Navbar />
      <div className="flex-1 overflow-y-auto scroll-smooth">
        <div className="max-w-[100vw] mx-auto w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
