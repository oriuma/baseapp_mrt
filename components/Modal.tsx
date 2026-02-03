"use client";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="
          w-full max-w-md
          border-[4px] border-zinc-700 bg-zinc-100
          shadow-[6px_6px_0_0_rgba(0,0,0,0.4)]
          p-4
          max-h-[85vh] overflow-y-auto
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 id="modal-title" className="text-lg font-bold uppercase tracking-wide text-zinc-800">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center border-2 border-zinc-600 bg-zinc-300 hover:bg-zinc-400 font-bold text-zinc-800"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
