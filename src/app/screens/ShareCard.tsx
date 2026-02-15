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
  const resultCardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSave = async () => {
    if (!resultCardRef.current) return;

    try {
      setIsGenerating(true);

      const canvas = await generateCanvas();
      if (!canvas) return;

      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Failed to generate image blob");
          alert("Failed to generate image. Please try again.");
          return;
        }

        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        const timestamp = new Date().toISOString().slice(0, 10);
        link.download = `heart-you-wake-with-${resultMessage.replace(/\s+/g, "-")}-${timestamp}.png`;
        link.href = url;
        link.click();

        // Cleanup
        URL.revokeObjectURL(url);
        console.log("Image saved successfully");
      }, "image/png");
    } catch (error) {
      console.error("Error generating image:", error);
      alert(`Failed to save image: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    if (!resultCardRef.current) return;

    try {
      setIsGenerating(true);

      const canvas = await generateCanvas();
      if (!canvas) return;

      // Convert canvas to blob
      canvas.toBlob(async (blob) => {
        if (!blob) {
          console.error("Failed to generate image blob");
          alert("Failed to generate image. Please try again.");
          return;
        }

        // Check if Web Share API is available
        if (navigator.share && navigator.canShare) {
          const file = new File(
            [blob],
            `heart-you-wake-with-${resultMessage.replace(/\s+/g, "-")}.png`,
            {
              type: "image/png",
            },
          );

          const shareData = {
            title: "The Heart You Wake With",
            text: `My result: ${resultMessage}`,
            files: [file],
          };

          if (navigator.canShare(shareData)) {
            try {
              await navigator.share(shareData);
              console.log("Shared successfully");
            } catch (error) {
              if (error instanceof Error && error.name !== "AbortError") {
                console.error("Error sharing:", error);
                alert("Failed to share. Please try saving instead.");
              }
            }
          } else {
            alert(
              "Sharing images is not supported on this device. Please use the Save button instead.",
            );
          }
        } else {
          alert("Sharing is not supported on this browser. Please use the Save button instead.");
        }
      }, "image/png");
    } catch (error) {
      console.error("Error generating image:", error);
      alert(`Failed to share image: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateCanvas = async () => {
    if (!resultCardRef.current) return null;

    // Create a temporary container at position 0,0 to avoid positioning issues
    const tempContainer = document.createElement("div");
    tempContainer.style.position = "fixed";
    tempContainer.style.top = "0";
    tempContainer.style.left = "0";
    tempContainer.style.width = "400px";
    tempContainer.style.zIndex = "-1";
    tempContainer.style.pointerEvents = "none";
    tempContainer.style.borderRadius = "1rem"; // rounded-2xl = 1rem
    tempContainer.style.overflow = "hidden";
    document.body.appendChild(tempContainer);

    // Clone the ResultCard into the temp container
    const originalElement = resultCardRef.current;
    const clonedElement = originalElement.cloneNode(true) as HTMLElement;
    clonedElement.style.borderRadius = "1rem"; // rounded-2xl
    clonedElement.style.overflow = "hidden";
    tempContainer.appendChild(clonedElement);

    // Wait for rendering
    await new Promise((resolve) => setTimeout(resolve, 100));

    console.log("Capturing element at 0,0");

    // Generate canvas from the cloned element
    const canvas = await html2canvas(clonedElement, {
      backgroundColor: null,
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
      foreignObjectRendering: true,
    });

    console.log("Canvas generated successfully:", canvas.width, "x", canvas.height);

    // Remove temporary container
    document.body.removeChild(tempContainer);

    return canvas;
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
        <div
          ref={cardRef}
          className="w-full max-w-[400px] shadow-2xl rounded-2xl overflow-hidden mb-6"
        >
          <div ref={resultCardRef}>
            <ResultCard resultKey={resultMessage} />
          </div>
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
          <Button
            variant="secondary"
            className="flex-1 gap-2 bg-white text-black hover:bg-gray-100 border-none"
            onClick={handleShare}
            disabled={isGenerating}
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};
