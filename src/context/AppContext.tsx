'use client';

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type Pizza = {
  name: string;
  normal: number;
  large: number;
  family: number;
  prima: number;
};

type AppContextType = {
  pizza: Pizza[];
  setPizzaWithLocalStorage: (pizza: Pizza[]) => void;
};

const AppContext = createContext<AppContextType>({
  pizza: [],
  setPizzaWithLocalStorage: () => {},
});

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }: PropsWithChildren) {
  const [pizza, setPizza] = useState<Pizza[]>([]);

  const setPizzaWithLocalStorage = (pizza: Pizza[]) => {
    setPizza(pizza);
    localStorage.setItem('pizza', JSON.stringify(pizza));
  };

  const onStorageUpdate = (ev: StorageEvent) => {
    const { key, newValue } = ev;
    if (key === 'pizza') {
      setPizza(newValue ? JSON.parse(newValue) : []);
    }
  };

  useEffect(() => {
    setPizza(
      localStorage.getItem('pizza')
        ? JSON.parse(localStorage.getItem('pizza') as string)
        : []
    );
    window.addEventListener('storage', onStorageUpdate);
    return () => {
      window.removeEventListener('storage', onStorageUpdate);
    };
  }, []);

  return (
    <AppContext.Provider value={{ pizza, setPizzaWithLocalStorage }}>
      {children}
    </AppContext.Provider>
  );
}
