'use client';

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

export type PIZZA_TYPE = "Margerita" | "Salami" | "Regina" | "Prosciutto" | "Tonno" | "Quattro Formaggi" | "Vegan";
export type PIZZA_SIZE = "normal" | "large" | "family" | "prima";

export const PizzaTypes: PIZZA_TYPE[] = ["Margerita", "Salami", "Regina", "Prosciutto", "Tonno", "Quattro Formaggi", "Vegan"];
export const PizzaSizes: PIZZA_SIZE[] = ["normal", "large", "family", "prima"];

type PizzaData = {
  [key in PIZZA_SIZE]: number;
};

type PizzaState = {
  [key in PIZZA_TYPE]: PizzaData;
};

const createEmptyPizzaData: () => PizzaData = () => {
  return {
    "normal": 0,
    "large": 0,
    "family": 0,
    "prima": 0,
  };
};

const createEmptyPizzaState: () => PizzaState = () => {
  return {
    "Margerita": createEmptyPizzaData(),
    "Salami": createEmptyPizzaData(),
    "Regina": createEmptyPizzaData(),
    "Prosciutto": createEmptyPizzaData(),
    "Tonno": createEmptyPizzaData(),
    "Quattro Formaggi": createEmptyPizzaData(),
    "Vegan": createEmptyPizzaData(),
  };
};

type AppContextType = {
  pizza: PizzaState;
  getPizzaAmount: (pizza: PIZZA_TYPE, size: PIZZA_SIZE) => number;
  setPizzaAmount: (pizza: PIZZA_TYPE, size: PIZZA_SIZE, amount: number) => void;
  increasePizzaAmount: (pizza: PIZZA_TYPE, size: PIZZA_SIZE) => number;
  decreasePizzaAmount: (pizza: PIZZA_TYPE, size: PIZZA_SIZE) => number;
  setPizzaWithLocalStorage: (pizza: PizzaState) => void;
};

const AppContext = createContext<AppContextType>({
  pizza: createEmptyPizzaState(),
  getPizzaAmount: () => 0,
  setPizzaAmount: () => {},
  setPizzaWithLocalStorage: () => {},
  increasePizzaAmount: () => 0,
  decreasePizzaAmount: () => 0,
});

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }: PropsWithChildren) {
  const [pizza, setPizza] = useState<PizzaState>(createEmptyPizzaState());

  const setPizzaWithLocalStorage = (pizza: PizzaState) => {
    setPizza(pizza);
    console.log(pizza);
    console.log(JSON.stringify(pizza));
    localStorage.setItem('pizza', JSON.stringify(pizza));
  };

  const getPizzaAmount = (name: PIZZA_TYPE, size: PIZZA_SIZE): number => {
    const data = pizza[name] ?? null;
    return data != null ? data[size] ?? 0 : 0;
  };

  const setPizzaAmount = (name: PIZZA_TYPE, size: PIZZA_SIZE, amount: number) => {
    const state = structuredClone(pizza);
    let data = state[name];

    if (!data) {
      data = createEmptyPizzaData();
      state[name] = data;
    }

    data[size] = amount;
    setPizzaWithLocalStorage(state);
  };

  const increasePizzaAmount = (name: PIZZA_TYPE, size: PIZZA_SIZE) => {
    const amount = getPizzaAmount(name, size) + 1;
    setPizzaAmount(name, size, amount);
    return amount;
  };

  const decreasePizzaAmount = (name: PIZZA_TYPE, size: PIZZA_SIZE) => {
    let amount = getPizzaAmount(name, size) - 1;
    if (amount < 0) amount = 0;
    setPizzaAmount(name, size, amount);
    return amount;
  };

  const onStorageUpdate = (ev: StorageEvent) => {
    const { key, newValue } = ev;
    if (key === 'pizza') {
      setPizza(newValue ? JSON.parse(newValue) : createEmptyPizzaState());
    }
  };

  useEffect(() => {
    setPizza(
      localStorage.getItem('pizza')
        ? JSON.parse(localStorage.getItem('pizza') as string)
        : createEmptyPizzaState()
    );
    window.addEventListener('storage', onStorageUpdate);
    return () => {
      window.removeEventListener('storage', onStorageUpdate);
    };
  }, []);

  return (
    <AppContext.Provider value={{
      pizza,
      getPizzaAmount,
      setPizzaAmount,
      setPizzaWithLocalStorage,
      increasePizzaAmount,
      decreasePizzaAmount,
    }}>
      {children}
    </AppContext.Provider>
  );
}
