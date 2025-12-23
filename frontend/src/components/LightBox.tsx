import { useEffect } from "react";

type Props = {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: Props) {

  
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

     
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

     
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 p-3 rounded-full bg-black/60 hover:bg-black/80 transition"
      >
        <img
          src="/icons/x.svg"
          className="w-6 h-6 invert"
          alt="Close"
        />
      </button>

     
      {index > 0 && (
        <button
          onClick={onPrev}
          className="absolute left-6 z-10 p-4 rounded-full bg-black/60 hover:bg-black/80 transition"
        >
          <img
            src="/icons/arrow-left.svg"
            className="w-7 h-7 invert"
            alt="Previous"
          />
        </button>
      )}

    
      <img
        src={images[index]}
        alt="Preview"
        className="relative z-10 max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
      />

      
      {index < images.length - 1 && (
        <button
          onClick={onNext}
          className="absolute right-6 z-10 p-4 rounded-full bg-black/60 hover:bg-black/80 transition"
        >
          <img
            src="/icons/arrow-right.svg"
            className="w-7 h-7 invert"
            alt="Next"
          />
        </button>
      )}
    </div>
  );
}
