import React from 'react';

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (x, y, radius, startAngle, endAngle) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const arcSweep = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    arcSweep,
    0,
    end.x,
    end.y,
    'L',
    x,
    y,
    'L',
    start.x,
    start.y,
  ].join(' ');
};

const ClockArcs = ({ startMinutes, endMinutes }) => {
  const arcs = [];
  const displayMinutes = 12 * 60;
  const step = 15;

  const durationMinutes =
    (endMinutes - startMinutes + displayMinutes) % displayMinutes;

  for (let i = 0; i < displayMinutes; i += step) {
    const startAngle = (i * 360) / displayMinutes;
    const endAngle = ((i + step) * 360) / displayMinutes;

    const startMinutesIn12Hour = startMinutes % displayMinutes;
    const endMinutesIn12Hour =
      (startMinutesIn12Hour + durationMinutes) % displayMinutes;

    let isFilled;
    if (startMinutesIn12Hour <= endMinutesIn12Hour) {
      isFilled = i >= startMinutesIn12Hour && i < endMinutesIn12Hour;
    } else {
      isFilled = i >= startMinutesIn12Hour || i < endMinutesIn12Hour;
    }

    const fillColor = isFilled ? 'green' : 'rgba(255, 255, 255, 0.2)';
    const strokeColor = isFilled ? 'green' : 'rgba(255, 255, 255, 0)';
    const d = describeArc(50, 50, 40, startAngle, endAngle);

    arcs.push(
      <path
        d={d}
        fill={fillColor}
        stroke={strokeColor}
        stroke-width='1'
        key={i}
      />,
    );
  }

  return (
    <svg height='100' width='100'>
      <>
        {arcs}
        <text
          x='50'
          y='55'
          font-size='15'
          fill='white'
          text-anchor='middle'
        ></text>
        <text x='50' y='7' font-size='10' fill='white' text-anchor='middle'>
          12
        </text>
        <text x='95' y='50' font-size='10' fill='white' text-anchor='middle'>
          3
        </text>
        <text x='50' y='100' font-size='10' fill='white' text-anchor='middle'>
          6
        </text>
        <text x='5' y='50' font-size='10' fill='white' text-anchor='middle'>
          9
        </text>
      </>
    </svg>
  );
};

export default ClockArcs;
