import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CheckItem from "./CheckItem";

interface Check {
  title: string;
  message: string;
  status: "success" | "warning" | "error";
  solution?: string;
}

interface SubCategory {
  title: string;
  checks: Check[];
}

interface CategorySectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  subcategories: SubCategory[];
  defaultOpen?: boolean;
}

export default function CategorySection({
  title,
  description,
  icon,
  subcategories,
  defaultOpen = false,
}: CategorySectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const totalChecks = subcategories.reduce((acc, sub) => acc + sub.checks.length, 0);
  const errorCount = subcategories.reduce(
    (acc, sub) => acc + sub.checks.filter((c) => c.status === "error").length,
    0
  );
  const warningCount = subcategories.reduce(
    (acc, sub) => acc + sub.checks.filter((c) => c.status === "warning").length,
    0
  );

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between hover-elevate transition-all"
      >
        <div className="flex items-start gap-4 text-left flex-1">
          <div className="text-primary mt-1">{icon}</div>
          <div className="flex-1">
            <h2 className="font-display text-xl md:text-2xl font-bold mb-2">{title}</h2>
            <p className="text-sm text-muted-foreground mb-3">{description}</p>
            <div className="flex flex-wrap gap-3 text-xs">
              <span className="px-2 py-1 rounded-md bg-muted text-foreground">
                {totalChecks} verificaciones
              </span>
              {errorCount > 0 && (
                <span className="px-2 py-1 rounded-md bg-red-500/20 text-red-500">
                  {errorCount} errores críticos
                </span>
              )}
              {warningCount > 0 && (
                <span className="px-2 py-1 rounded-md bg-amber-500/20 text-amber-500">
                  {warningCount} advertencias
                </span>
              )}
            </div>
          </div>
        </div>
        <ChevronDown
          className={`w-6 h-6 text-muted-foreground transition-transform flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-6">
              {subcategories.map((subcategory, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="font-display font-bold text-base text-primary border-b border-border pb-2">
                    {subcategory.title}
                  </h3>
                  {subcategory.checks.map((check, checkIdx) => (
                    <CheckItem
                      key={checkIdx}
                      title={check.title}
                      message={check.message}
                      status={check.status}
                      solution={check.solution}
                    />
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
