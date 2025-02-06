import { NavLink } from "react-router";
import Logo from "../assets/logo";
import Search from "./search";
import { Bell } from "../assets/bell";
import { MdiUser } from "../assets/user";

export default function Navbar() {
  return (
    <div className="w-full px-[2.5%] py-2 border-b border-b-gray-300 flex justify-center">
      <nav className="flex items-center justify-between max-w-[1512px] w-full">
        <NavLink to="/" className="cursor-pointer">
          <Logo className="size-12" />
        </NavLink>

        <div className="flex items-center gap-4">
          <div className="cursor-pointer relative group">
            <Bell className="size-6 fill-black" />
            <div className="hidden group-hover:flex absolute -translate-x-[300px] top-[110%] items-center justify-center rounded-lg bg-white shadow-sm p-4 w-80 h-80">
              <p className="text-black text-base font-medium">
                You have no new notifications
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-10 flex items-center justify-center bg-gray-300 rounded-full overflow-hidden cursor-pointer">
              <MdiUser className="size-8" />
            </div>
            <div className="h-full flex flex-col">
              <h4 className="text-sm font-medium">John Doe</h4>
              <p className="text-xs">Operation Manager</p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
