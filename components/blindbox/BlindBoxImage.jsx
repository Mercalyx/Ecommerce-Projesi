import { useState } from "react";

function BlindBoxImage({ image, alt, className = "" }) {
  const [errored, setErrored] = useState(false);

  return (
    <div className={`relative w-full aspect-square bg-brand-50 dark:bg-brand-800 rounded-xl overflow-hidden ${className}`}>
      {errored ? (
        <div className="w-full h-full flex items-center justify-center text-brand-300 dark:text-brand-600">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>
      ) : (
        <img
          src={image}
          alt={alt}
          loading="lazy"
          onError={() => setErrored(true)}
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
      )}
    </div>
  );
}

export default BlindBoxImage;
