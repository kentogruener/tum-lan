'use client';

import { useAppContext } from '@/context/AppContext';

export default function PizzaPage() {
  const { pizza } = useAppContext();

  return (
    <>
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
