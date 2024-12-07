import React from 'react';

const Snake = ({ snake }) => {
  return (
    <>
      {snake.map((segment, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: segment.y * 20,
            left: segment.x * 20,
            width: 20,
            height: 20,
            backgroundColor: 'green',
          }}
        ></div>
      ))}
    </>
  );
};

export default Snake;
