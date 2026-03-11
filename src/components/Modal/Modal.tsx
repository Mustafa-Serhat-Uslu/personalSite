import { useEffect, useState, useCallback, type ReactNode } from "react";

type ModalProps = {
  id: string;
  title?: string;
  children: ReactNode;
};

export function Modal({ id, title, children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hash = `#${id}`;

  const close = useCallback(() => {
    history.pushState(null, "", window.location.pathname + window.location.search);
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const checkHash = () => setIsOpen(window.location.hash === hash);
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, [hash]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") close();
      };
      window.addEventListener("keydown", onKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKeyDown);
      };
    }
    document.body.style.overflow = "";
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={close} />
      <div className="relative z-10 mx-4 flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl bg-stone-200 shadow-xl">
        <div className="flex items-center justify-between border-b border-stone-300 px-5 py-4">
          {title && <h2 className="text-lg font-bold">{title}</h2>}
          <button
            onClick={close}
            className="ml-auto text-2xl leading-none text-stone-500 hover:text-stone-800"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-4">{children}</div>
      </div>
    </div>
  );
}
