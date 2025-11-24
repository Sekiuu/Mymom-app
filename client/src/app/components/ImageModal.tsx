import React from "react";

type ImageModalProps = {
  imageUrl: string;
  onClose: () => void;
};

export function ImageModal({ imageUrl, onClose }: ImageModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6"
      onClick={onClose}
    >
      <img
        src={imageUrl}
        alt="Full size"
        className="max-h-[90vh] max-w-[90vw] rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

