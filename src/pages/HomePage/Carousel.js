import React, { useEffect, useState, useRef } from 'react';

const Carousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const isDragging = useRef(false);

  const images = [
    `${process.env.PUBLIC_URL}/images/carousel/image1.png`,
    `${process.env.PUBLIC_URL}/images/carousel/image2.png`,
    `${process.env.PUBLIC_URL}/images/carousel/image3.png`,
    `${process.env.PUBLIC_URL}/images/carousel/image4.png`,
    `${process.env.PUBLIC_URL}/images/carousel/image5.png`,
  ];

  const length = images.length;

  const getCarouselIndices = (currentIndex, totalImages) => {
    const previous = (currentIndex - 1 + totalImages) % totalImages;
    const next = (currentIndex + 1) % totalImages;

    return [previous, currentIndex, next];
  };

  useEffect(() => {
    if (!isDragging.current) {
      const timer = setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % length);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentImageIndex, length]);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      const currentX = e.clientX;
      const newOffsetX = currentX - startX;
      setOffsetX(newOffsetX);
    }
  };

  const handleMouseUp = (e) => {
    isDragging.current = false;

    if (Math.abs(offsetX) <= 20) {
      setOffsetX(0);

      return;
    }

    setCurrentImageIndex((prevIndex) => {
      return (prevIndex + (offsetX > 0 ? -1 : 1) + length) % length;
    });

    setOffsetX(0);
  };

  const handleIndicatorClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className='relative w-80 h-60 overflow-hidden glowing-box'>
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {getCarouselIndices(currentImageIndex, length).map(
          (index, relativeIndex) => (
            <img
              alt={`Carousel slide ${index + 1}`}
              key={index}
              src={images[index]}
              style={{
                position: 'absolute',
                left: `${(relativeIndex - 1) * 100 + offsetX}%`,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: isDragging.current ? 'none' : 'left 0.5s ease-out',
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
            className={`
        w-4 h-4 rounded-full cursor-pointer transition-all duration-300 ease-in-out
        transform hover:scale-110
        ${
          index === currentImageIndex
            ? 'bg-white scale-125'
            : 'bg-white opacity-50 hover:bg-gray-400'
        }
      `}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
