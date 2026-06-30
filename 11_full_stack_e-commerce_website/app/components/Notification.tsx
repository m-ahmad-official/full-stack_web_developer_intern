// app/components/Notification.tsx
"use client";
import { useEffect } from "react";
import { useStore } from "../lib/store";
import { CheckCircle, X } from "lucide-react";

export function Notification() {
  const { notification, setNotification } = useStore();

  useEffect(() => {
    if (!notification) return;
    const t = setTimeout(() => setNotification(null), 3500);
    return () => clearTimeout(t);
  }, [notification, setNotification]);

  if (!notification) return null;

  return (
    <div className="fixed top-20 right-4 z-[200] animate-in slide-in-from-right duration-300">
      <div className="flex items-center gap-3 bg-vault-card border border-coffee-600/40 text-vault-light px-4 py-3 rounded-xl shadow-xl max-w-xs">
        <CheckCircle className="w-5 h-5 text-coffee-400 flex-shrink-0" />
        <p className="text-sm flex-1">{notification}</p>
        <button onClick={() => setNotification(null)} className="text-vault-muted hover:text-vault-light">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
