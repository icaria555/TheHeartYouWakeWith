import React from "react";
import { X, Download, Share2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { ResultCard } from "../components/ui/ResultCard";

interface ShareCardProps {
  onClose: () => void;
  resultMessage: string;
}

export const ShareCard: React.FC<ShareCardProps> = ({
  onClose,
  resultMessage,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 z-50 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white"
        >
          <X className="w-6 h-6" />
        </button>

        {/* The Card */}
        <div className="w-full shadow-2xl rounded-2xl overflow-hidden mb-6">
            <ResultCard resultKey={resultMessage} />
        </div>

        {/* Actions */}
        <div className="w-full flex gap-4">
          <Button variant="secondary" className="flex-1 gap-2 bg-white text-black hover:bg-gray-100 border-none" onClick={() => alert("Image saved! (Simulation)")}>
            <Download className="w-4 h-4" /> Save
          </Button>
           <Button variant="primary" className="flex-1 gap-2 bg-pink-600 hover:bg-pink-700 border-none text-white" onClick={() => alert("Link copied! (Simulation)")}>
            <Share2 className="w-4 h-4" /> Copy Link
          </Button>
        </div>
      </div>
    </div>
  );
};
