import { useState } from "react";
import { MobileNav } from "./components/MobileNav";
import { DesktopNav } from "./components/DesktopNav";
import NameTitle from "./components/NameTitle";
import { HeaderContacts } from "./components/HeaderContacts";

export default function Header() {
  const [toggled, setToggled] = useState(false);
  return (
    <nav className=" relative mx-10 my-10 flex items-center justify-between font-medium lg:mx-32">
      <HeaderContacts />

      <NameTitle />

      <MobileNav setToggled={setToggled} toggled={toggled} />
      <DesktopNav />
    </nav>
  );
}
