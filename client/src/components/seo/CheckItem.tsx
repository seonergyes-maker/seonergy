import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";

interface CheckItemProps {
  title: string;
  message: string;
  status: "success" | "warning" | "error";
  solution?: string;
}

export default function CheckItem({ title, message, status, solution }: CheckItemProps) {
  const getIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />;
    }
  };

  const getBgColor = () => {
    switch (status) {
      case "success":
        return "bg-green-500/10 border-green-500/20";
      case "warning":
        return "bg-amber-500/10 border-amber-500/20";
      case "error":
        return "bg-red-500/10 border-red-500/20";
    }
  };

  return (
    <div className={`rounded-lg border ${getBgColor()} p-4 mb-3`}>
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{message}</p>
          {solution && (
            <div className="mt-2 pt-2 border-t border-border/50">
              <p className="text-xs text-primary font-medium">💡 Cómo arreglarlo:</p>
              <p className="text-xs text-muted-foreground mt-1">{solution}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
