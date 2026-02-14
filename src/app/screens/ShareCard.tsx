import React, { useRef, useState } from "react";
import { X, Download, Share2 } from "lucide-react";
import html2canvas from "html2canvas";
import { Button } from "../components/ui/Button";
import { ResultCard } from "../components/ui/ResultCard";

interface ShareCardProps {
  onClose: () => void;
  resultMessage: string;
}

export const ShareCard: React.FC<ShareCardProps> = ({ onClose, resultMessage }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSave = async () => {
    if (!cardRef.current) return;

    try {
      setIsGenerating(true);

      // Generate canvas from the card element
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#ffffff",
        scale: 2, // Higher quality (2x resolution)
        logging: false,
        useCORS: true, // Allow cross-origin images
        allowTaint: true,
        foreignObjectRendering: true, // Use SVG rendering to bypass CSS parsing issues
      });

      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Failed to generate image");
          return;
        }

        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        const timestamp = new Date().toISOString().slice(0, 10);
        link.download = `heart-you-wake-with-${resultMessage}-${timestamp}.png`;
        link.href = url;
        link.click();

        // Cleanup
        URL.revokeObjectURL(url);
      }, "image/png");
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to save image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 z-50 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white"
          title="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* The Card */}
        <div ref={cardRef} className="w-full shadow-2xl rounded-2xl overflow-hidden mb-6">
          <ResultCard resultKey={resultMessage} />
        </div>

        {/* Actions */}
        <div className="w-full flex gap-4">
          <Button
            variant="secondary"
            className="flex-1 gap-2 bg-white text-black hover:bg-gray-100 border-none"
            onClick={handleSave}
            disabled={isGenerating}
          >
            <Download className="w-4 h-4" />
            {isGenerating ? "Generating..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};
