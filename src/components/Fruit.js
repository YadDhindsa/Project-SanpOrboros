import React from 'react';

const Fruit = ({ fruits }) => {
  return (
    <>
      {fruits.map((fruit, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: fruit.y * 20,
            left: fruit.x * 20,
            width: 20,
            height: 20,
            backgroundColor: 'red',
          }}
        ></div>
      ))}
    </>
  );
};

export default Fruit;
