import React, { useState, useRef, useEffect } from 'react';

const BottleCard = ({ bottle, onAdd, onRemove, count = 0 }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const addIntervalRef = useRef(null);
  const removeIntervalRef = useRef(null);
  
  // Precarga la imagen cuando el componente se monta
  useEffect(() => {
    const img = new Image();
    img.src = bottle.imageUrl;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [bottle.imageUrl]);

  const startAdding = () => {
    onAdd(bottle);
    addIntervalRef.current = setInterval(() => {
      onAdd(bottle);
    }, 150);
  };

  const startRemoving = () => {
    if (count > 0) {
      onRemove(bottle);
      removeIntervalRef.current = setInterval(() => {
        if (count > 0) {
          onRemove(bottle);
        } else {
          clearInterval(removeIntervalRef.current);
        }
      }, 150);
    }
  };

  const stopInterval = () => {
    clearInterval(addIntervalRef.current);
    clearInterval(removeIntervalRef.current);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-16 h-24 mb-2 flex items-center justify-center overflow-hidden relative">
        {!imageLoaded && !imageError && (
          <div className="animate-pulse bg-gray-200 w-full h-full rounded"></div>
        )}
        {imageLoaded ? (
          <img
            src={bottle.imageUrl}
            alt={bottle.name}
            className={`h-full object-contain transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
        ) : imageError ? (
          <div className="text-gray-300 text-xs">Error al cargar</div>
        ) : null}
      </div>
      <h3 className="font-medium text-gray-800 text-center">{bottle.name}</h3>
      <p className="text-sm text-gray-500">{bottle.weight}g • {bottle.volume}ml</p>
      
      <div className="flex items-center justify-center mt-2 space-x-2">
        <button 
          onMouseDown={startRemoving}
          onMouseUp={stopInterval}
          onMouseLeave={stopInterval}
          onTouchStart={startRemoving}
          onTouchEnd={stopInterval}
          className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 active:bg-red-300 transition-colors"
          disabled={count === 0}
        >
          -
        </button>
        
        <span className="px-3 py-1 bg-gray-50 rounded-lg font-medium min-w-[2rem] text-center">
          {count}
        </span>
        
        <button 
          onMouseDown={startAdding}
          onMouseUp={stopInterval}
          onMouseLeave={stopInterval}
          onTouchStart={startAdding}
          onTouchEnd={stopInterval}
          className="px-3 py-1 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 active:bg-green-300 transition-colors"
        >
          +
        </button>
      </div>
      
      {count > 0 && (
        <p className="text-xs text-gray-400 mt-1">
          Total: {(bottle.weight * count)}g
        </p>
      )}
    </div>
  );
};

export default BottleCard;

// DONE