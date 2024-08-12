import { useState } from "react";
// import { MobileNav } from "./components/MobileNav";
// import { DesktopNav } from "./components/DesktopNav";
import NameTitle from "./components/NameTitle";
import { HeaderContacts } from "./components/HeaderContacts";

export default function Header() {
  // const [toggled, setToggled] = useState(false);
  return (
    <nav className="relative mx-4 mt-10 flex max-w-screen-xl items-center justify-between pb-16 font-medium lg:max-w-5xl lg:mx-auto lg:pb-26">
      <NameTitle />
      <HeaderContacts />

      {/* <MobileNav setToggled={setToggled} toggled={toggled} />
      <DesktopNav /> */}
    </nav>
  );
}
