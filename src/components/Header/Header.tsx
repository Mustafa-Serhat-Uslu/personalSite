import { useState } from "react";
// import { MobileNav } from "./components/MobileNav";
// import { DesktopNav } from "./components/DesktopNav";
import NameTitle from "./components/NameTitle";
import { HeaderContacts } from "./components/HeaderContacts";

export default function Header() {
  // const [toggled, setToggled] = useState(false);
  return (
    <nav className="lg:pb-26 relative mx-4 mt-10 flex max-w-screen-xl flex-col items-center justify-between gap-4 pb-8 font-medium sm:flex-row sm:gap-0 sm:pb-16 lg:mx-auto lg:max-w-5xl">
      <NameTitle />
      <HeaderContacts />

      {/* <MobileNav setToggled={setToggled} toggled={toggled} />
      <DesktopNav /> */}
    </nav>
  );
}
