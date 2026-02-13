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
    microcopy: "You have a partner and plans for tonight.",
  },
  {
    id: "pathB",
    title: "Relationship, No Date",
    microcopy: "You have a partner, but no plans for tonight.",
  },
  {
    id: "pathC",
    title: "No Relationship",
    microcopy: "It's just you today. No date, no partner.",
  },
];

export const RelationshipSelection: React.FC<RelationshipSelectionProps> = ({
  onSelect,
}) => {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center pt-16 px-6">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-semibold text-gray-900 mb-8 text-center"
      >
        Who are you today?
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
