import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function Toast() {
  const { toast } = useShop();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-dark shrink-0" />,
    info: <Info className="w-5 h-5 text-gold shrink-0" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-subtle max-w-sm w-full">
      <div className="bg-charcoal text-ivory border border-gold/40 px-4 py-3.5 rounded-lg shadow-2xl flex items-center gap-3 backdrop-blur-md">
        {icons[toast.type] || icons.success}
        <p className="text-xs sm:text-sm font-sans tracking-wide flex-1 text-ivory">
          {toast.message}
        </p>
      </div>
    </div>
  );
}
