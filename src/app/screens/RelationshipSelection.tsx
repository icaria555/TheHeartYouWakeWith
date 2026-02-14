import React from "react";
import { motion } from "motion/react";
import { CardOption } from "../components/ui/CardOption";

interface RelationshipSelectionProps {
  onSelect: (selection: string) => void;
}

const OPTIONS = [
  {
    id: "pathA",
    title: "Relationship & Date",
    microcopy: "You wake beside love, and tonight you'll celebrate it.",
  },
  {
    id: "pathB",
    title: "Relationship, No Date",
    microcopy: "You wake beside love, but tonight feels uncertain.",
  },
  {
    id: "pathC",
    title: "No Relationship",
    microcopy: "You wake alone, and the day stretches quiet ahead.",
  },
];

export const RelationshipSelection: React.FC<RelationshipSelectionProps> = ({ onSelect }) => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-rose-50 flex flex-col items-center pt-16 px-6">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-semibold text-gray-900 mb-8 text-center"
      >
        What kind of Valentine's morning rises inside your heart today?
      </motion.h2>

      <div className="flex flex-col gap-6 w-full max-w-md">
        {OPTIONS.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CardOption
              title={option.title}
              microcopy={option.microcopy}
              onClick={() => onSelect(option.id)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
