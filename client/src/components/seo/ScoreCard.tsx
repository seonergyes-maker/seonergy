import { motion } from "framer-motion";

interface ScoreCardProps {
  title: string;
  score: number;
  maxScore: number;
  icon?: React.ReactNode;
}

export default function ScoreCard({ title, score, maxScore, icon }: ScoreCardProps) {
  const percentage = (score / maxScore) * 100;
  
  const getColor = () => {
    if (percentage >= 80) return "text-green-500";
    if (percentage >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const getGradient = () => {
    if (percentage >= 80) return "from-green-500/20 to-green-500/5";
    if (percentage >= 60) return "from-amber-500/20 to-amber-500/5";
    return "from-red-500/20 to-red-500/5";
  };

  return (
    <div className={`rounded-xl border border-border bg-gradient-to-br ${getGradient()} p-6`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && <div className="text-primary">{icon}</div>}
          <h3 className="font-display font-bold text-lg">{title}</h3>
        </div>
        <div className={`font-display text-3xl font-bold ${getColor()}`}>
          {score}<span className="text-xl text-muted-foreground">/{maxScore}</span>
        </div>
      </div>
      
      <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${percentage >= 80 ? 'bg-green-500' : percentage >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
        />
      </div>
      
      <p className="text-xs text-muted-foreground mt-2">
        {percentage >= 80 ? "¡Excelente trabajo!" : percentage >= 60 ? "Hay margen de mejora" : "Necesita atención urgente"}
      </p>
    </div>
  );
}
