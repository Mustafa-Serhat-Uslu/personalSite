import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export type AccordionItem = {
  titleLeft: string;
  titleRight: string;
  content: string[];
  links?: string[];
  actionLink?: { label: string; href: string };
};

const AccordionItem = ({
  item,
  isOpen,
  onButtonClick,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onButtonClick: () => void;
}) => {
  const { titleLeft, titleRight, content, links, actionLink } = item;
  return (
    <button onClick={onButtonClick} className="text-left">
      <div className="flex items-center justify-between rounded-md pl-2 sm:hover:shadow">
        <span className="text-sm font-medium sm:text-base">{titleLeft}</span>
        <div className="flex items-center justify-between text-xs font-thin text-opacity-60 sm:gap-3 sm:text-base">
          {titleRight}
          <ChevronDownIcon
            className={`transform transition-transform duration-500 ${isOpen && "rotate-180"} w-4 sm:w-6`}
          />
        </div>
      </div>
      <div
        className={`transition-max-height ${isOpen ? "max-h-screen" : "max-h-0"} overflow-hidden duration-500 ease-in-out`}
      >
        {
          <div className={`flex flex-col pl-5 pt-5`}>
            {links?.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                className="-indent-3 text-gray-600"
              >
                &#x2022; {link}
              </a>
            ))}
            {content?.map((item, index) => (
              <span key={index} className="pt-3 -indent-3">
                &#x2022; {item}
              </span>
            ))}
            {actionLink && (
              <a
                href={actionLink.href}
                onClick={(e) => e.stopPropagation()}
                className="mt-4 text-base font-bold text-blue-800 underline decoration-blue-400 underline-offset-2 hover:decoration-blue-600 sm:text-lg"
              >
                {actionLink.label}
              </a>
            )}
          </div>
        }
      </div>
    </button>
  );
};

export const Accordion = ({
  title,
  items,
}: {
  title?: string;
  items: AccordionItem[];
}) => {
  const [openPanelIndex, setOpenPanelIndex] = useState(-1);

  return (
    <section className="mt-4 rounded-2xl bg-stone-400 bg-opacity-20 px-2 py-3">
      <h2 className="mb-5 text-center text-xl font-bold">{title}</h2>
      <div className="mx-0 flex w-11/12 min-w-full flex-col gap-4 sm:mx-auto sm:min-w-96">
        {items.map((item, i) => (
          <AccordionItem
            key={i}
            item={item}
            isOpen={openPanelIndex === i}
            onButtonClick={() => {
              if (openPanelIndex === i) {
                setOpenPanelIndex(-1);
                return;
              }
              setOpenPanelIndex(i);
            }}
          />
        ))}
      </div>
    </section>
  );
};
