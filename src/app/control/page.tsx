'use client';

import { useAppContext } from '@/context/AppContext';

export default function ControlPage() {
  const { pizza, setPizzaWithLocalStorage } = useAppContext();

  return (
    <>
      <h1>Control</h1>
      <button
        onClick={() => {
          setPizzaWithLocalStorage([
            ...pizza,
            { name: 'Margerita', normal: 1, large: 1, family: 1, prima: 1 },
          ]);
        }}
      >
        Add Pizza
      </button>
      <button
        onClick={() => {
          setPizzaWithLocalStorage([]);
        }}
      >
        Reset
      </button>
      {pizza.map((pizza) => {
        return (
          <div key={pizza.name}>
            <h2>{pizza.name}</h2>
            <p>Normal: {pizza.normal}</p>
            <p>Large: {pizza.large}</p>
            <p>Family: {pizza.family}</p>
            <p>Prima: {pizza.prima}</p>
          </div>
        );
      })}
    </>
  );
}
