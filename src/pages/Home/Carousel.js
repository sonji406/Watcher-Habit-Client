import React, { useEffect, useState, useRef } from 'react';

const Carousel = () => {
  const isDragging = useRef(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);

  const images = [
    `${process.env.PUBLIC_URL}/images/carousel/image1.png`,
    `${process.env.PUBLIC_URL}/images/carousel/image2.png`,
    `${process.env.PUBLIC_URL}/images/carousel/image3.png`,
    `${process.env.PUBLIC_URL}/images/carousel/image4.png`,
    `${process.env.PUBLIC_URL}/images/carousel/image5.png`,
  ];

  const length = images.length;

  const updateImageIndex = (direction) => {
    setCurrentImageIndex((prevIndex) => {
      return (prevIndex + direction + length) % length;
    });
  };

  const resetOffset = () => setOffsetX(0);

  const dragStart = (clientX) => {
    isDragging.current = true;
    setStartX(clientX);
  };

  const dragMove = (clientX) => {
    if (!isDragging.current) return;
    const newOffsetX = clientX - startX;
    setOffsetX(newOffsetX);
  };

  const dragEnd = () => {
    isDragging.current = false;

    if (Math.abs(offsetX) <= 20) {
      resetOffset();
      return;
    }

    updateImageIndex(offsetX > 0 ? -1 : 1);
    resetOffset();
  };

  useEffect(() => {
    if (!isDragging.current) {
      const timer = setTimeout(() => {
        updateImageIndex(1);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentImageIndex, length]);

  const getCarouselIndices = (currentIndex, totalImages) => {
    const previous = (currentIndex - 1 + totalImages) % totalImages;
    const next = (currentIndex + 1) % totalImages;

    return [previous, currentIndex, next];
  };

  return (
    <div className='relative w-80 h-60 overflow-hidden glowing-box'>
      <div
        onMouseDown={(e) => dragStart(e.clientX)}
        onMouseMove={(e) => dragMove(e.clientX)}
        onMouseUp={dragEnd}
        onMouseLeave={dragEnd}
      >
        {getCarouselIndices(currentImageIndex, length).map(
          (index, relativeIndex) => (
            <img
              alt={`Carousel slide ${index + 1}`}
              key={index}
              src={images[index]}
              className='absolute w-full h-full object-cover transition-all duration-200 ease-out'
              style={{
                left: `${(relativeIndex - 1) * 100 + offsetX}%`,
                transition: isDragging.current ? 'none' : undefined,
              }}
              onDragStart={(e) => e.preventDefault()}
            />
          ),
        )}
      </div>

      <div className='absolute bottom-2 flex space-x-4 justify-center w-full'>
        {Array.from({ length }).map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110 ${
              index === currentImageIndex
                ? 'bg-white scale-125'
                : 'bg-white opacity-50 hover:bg-gray-400'
            }`}
            onClick={() => updateImageIndex(index - currentImageIndex)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
