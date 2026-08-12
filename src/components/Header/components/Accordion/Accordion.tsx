import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export type AccordionItem = {
  titleLeft: string;
  titleRight: string;
  content: string[];
  links?: string[];
  actionLink?: { label: string; href: string };
};

// easeOutQuint — moves off the mark immediately, then a long soft landing
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
// easeInOut — closing should feel like it's being pulled shut, not dropped
const EASE_IN: [number, number, number, number] = [0.4, 0, 0.6, 1];
const OPEN_DURATION = 0.4;
const CLOSE_DURATION = 0.28;

// some links in the data omit the protocol, which makes them resolve as relative paths
const toHref = (link: string) =>
  /^(https?:)?\/\//.test(link) ? link : `https://${link}`;

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
  const reduceMotion = useReducedMotion();
  const id = useId();
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;

  const seconds = (value: number) => (reduceMotion ? 0 : value);

  return (
    <div>
      <button
        id={buttonId}
        type="button"
        onClick={onButtonClick}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={`group relative flex w-full items-start justify-between gap-3 rounded-md py-2 pl-3 pr-2 text-left transition duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500/40 sm:hover:bg-white/50 sm:hover:shadow-md ${isOpen ? "bg-white/40" : ""}`}
      >
        {/* accent bar that grows in while open */}
        <span
          aria-hidden="true"
          className={`absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-stone-600 transition-transform duration-300 ease-out motion-reduce:transition-none ${isOpen ? "scale-y-100" : "scale-y-0"}`}
        />
        <span className="min-w-0 text-sm font-medium transition-transform duration-300 ease-out motion-reduce:transform-none sm:text-base sm:group-hover:translate-x-1">
          {titleLeft}
        </span>
        <span className="flex shrink-0 items-center gap-1.5 text-xs font-thin text-stone-600 sm:gap-3 sm:text-base">
          <span className="whitespace-nowrap">{titleRight}</span>
          <ChevronDownIcon
            aria-hidden="true"
            className={`w-4 transform transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:w-6 ${isOpen ? "rotate-180" : "sm:group-hover:translate-y-0.5"}`}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: seconds(CLOSE_DURATION), ease: EASE_IN },
                opacity: { duration: seconds(CLOSE_DURATION * 0.6) },
              },
            }}
            transition={{
              height: { duration: seconds(OPEN_DURATION), ease: EASE_OUT },
              opacity: { duration: seconds(OPEN_DURATION * 0.7) },
            }}
            className="overflow-hidden"
          >
            {/* the inner slide keeps the text from feeling like it's being unrolled */}
            <motion.div
              initial={{ y: -8 }}
              animate={{ y: 0 }}
              exit={{ y: -8 }}
              transition={{
                duration: seconds(isOpen ? OPEN_DURATION : CLOSE_DURATION),
                ease: isOpen ? EASE_OUT : EASE_IN,
              }}
              className="pb-1 pl-4 pr-2 pt-4"
            >
              <ul className="flex list-disc flex-col gap-3 pl-4 marker:text-stone-400">
                {links?.map((link, index) => (
                  <li key={index}>
                    <a
                      href={toHref(link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-words text-stone-600 underline decoration-stone-400 underline-offset-2 transition-colors hover:text-stone-900 hover:decoration-stone-600"
                    >
                      {link}
                    </a>
                  </li>
                ))}
                {content?.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
              {actionLink && (
                <a
                  href={actionLink.href}
                  className="mt-4 inline-block text-base font-bold text-blue-800 underline decoration-blue-400 underline-offset-2 hover:decoration-blue-600 sm:text-lg"
                >
                  {actionLink.label}
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
    <section className="mt-4 rounded-2xl bg-stone-400 bg-opacity-20 px-2 py-3 sm:px-4">
      <h2 className="mb-4 text-center text-xl font-bold">{title}</h2>
      <div className="mx-auto flex w-full flex-col gap-1 sm:gap-2">
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
