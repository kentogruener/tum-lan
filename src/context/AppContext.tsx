'use client';

import { scenesMeta } from '@/components/scenes';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

export type PIZZA_TYPE =
  | 'Margerita'
  | 'Salami'
  | 'Regina'
  | 'Prosciutto'
  | 'Tonno'
  | 'Quattro Formaggi'
  | 'Vegan';
export type PIZZA_SIZE = 'normal' | 'large' | 'family' | 'prima';

export const PizzaTypes: PIZZA_TYPE[] = [
  'Margerita',
  'Salami',
  'Regina',
  'Prosciutto',
  'Tonno',
  'Quattro Formaggi',
  'Vegan',
];
export const PizzaSizes: PIZZA_SIZE[] = ['normal', 'large', 'family', 'prima'];

type PizzaData = {
  [key in PIZZA_SIZE]: number;
};

type PizzaState = {
  [key in PIZZA_TYPE]: PizzaData;
};

type SceneData = {
  name: string;
  background: boolean;
  overlay: boolean;
  scene: JSX.Element;
};

type SceneState = {
  currentSceneKey: string;
  rotationActive: boolean;
  duration: number;
  scenesMeta: {
    key: string;
    name: string;
    show: boolean;
  }[];
};

const createEmptyPizzaData: () => PizzaData = () => {
  return {
    normal: 0,
    large: 0,
    family: 0,
    prima: 0,
  };
};

const createEmptyPizzaState: () => PizzaState = () => {
  return {
    Margerita: createEmptyPizzaData(),
    Salami: createEmptyPizzaData(),
    Regina: createEmptyPizzaData(),
    Prosciutto: createEmptyPizzaData(),
    Tonno: createEmptyPizzaData(),
    'Quattro Formaggi': createEmptyPizzaData(),
    Vegan: createEmptyPizzaData(),
  };
};

type AppContextType = {
  pizza: PizzaState;
  scenes: SceneState;
  getPizzaAmount: (pizza: PIZZA_TYPE, size: PIZZA_SIZE) => number;
  setPizzaAmount: (pizza: PIZZA_TYPE, size: PIZZA_SIZE, amount: number) => void;
  increasePizzaAmount: (pizza: PIZZA_TYPE, size: PIZZA_SIZE) => number;
  decreasePizzaAmount: (pizza: PIZZA_TYPE, size: PIZZA_SIZE) => number;
  setPizzaWithLocalStorage: (pizza: PizzaState) => void;
  setSceneRoationActive: (active: boolean) => void;
  setSceneDuration: (duration: number) => void;
  getSceneMetaShow: (key: string) => boolean;
  setSceneMetaShow: (key: string, show: boolean) => void;
  setSceneKey: (key: string) => void;
};

const AppContext = createContext<AppContextType>({
  pizza: createEmptyPizzaState(),
  scenes: {
    currentSceneKey: scenesMeta[0].key,
    rotationActive: false,
    duration: 300,
    scenesMeta: scenesMeta,
  },
  getPizzaAmount: () => 0,
  setPizzaAmount: () => {},
  setPizzaWithLocalStorage: () => {},
  increasePizzaAmount: () => 0,
  decreasePizzaAmount: () => 0,
  setSceneRoationActive: () => {},
  setSceneDuration: () => {},
  getSceneMetaShow: () => false,
  setSceneMetaShow: () => {},
  setSceneKey: () => {},
});

export function useAppContext() {
  return useContext(AppContext);
}

const DefaultSceneState = {
  currentSceneKey: scenesMeta[0].key,
  rotationActive: false,
  duration: 300,
  scenesMeta: scenesMeta,
};

export function AppContextProvider({ children }: PropsWithChildren) {
  const [pizza, setPizza] = useState<PizzaState>(createEmptyPizzaState());
  const [scenes, setScene] = useState<SceneState>(DefaultSceneState);

  const setSceneWithLocalStorage = (scenes: SceneState) => {
    setScene(scenes);
    localStorage.setItem('scenes', JSON.stringify(scenes));
  };

  const setSceneRoationActive = (active: boolean) => {
    setSceneWithLocalStorage({
      ...scenes,
      rotationActive: active,
    });
  };

  const setSceneDuration = (duration: number) => {
    setSceneWithLocalStorage({
      ...scenes,
      duration,
    });
  };

  const getSceneMetaShow = (key: string) => {
    const meta = scenes.scenesMeta.find((meta) => meta.key === key);
    return meta ? meta.show : false;
  };

  const setSceneMetaShow = (key: string, show: boolean) => {
    const meta = scenes.scenesMeta.find((meta) => meta.key === key);
    if (meta) {
      meta.show = show;
      setSceneWithLocalStorage({
        ...scenes,
        scenesMeta: [...scenes.scenesMeta],
      });
    } else {
      console.error(`Scene meta with key ${key} not found`);
    }
  };

  const setSceneKey = (key: string) => {
    setSceneWithLocalStorage({
      ...scenes,
      currentSceneKey: key,
    });
  };

  const setPizzaWithLocalStorage = (pizza: PizzaState) => {
    setPizza(pizza);
    localStorage.setItem('pizza', JSON.stringify(pizza));
  };

  const getPizzaAmount = (name: PIZZA_TYPE, size: PIZZA_SIZE): number => {
    const data = pizza[name] ?? null;
    return data != null ? data[size] ?? 0 : 0;
  };

  const setPizzaAmount = (
    name: PIZZA_TYPE,
    size: PIZZA_SIZE,
    amount: number
  ) => {
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
    if (key === 'scenes') {
      setScene(newValue ? JSON.parse(newValue) : DefaultSceneState);
    }
  };

  useEffect(() => {
    setPizza(
      localStorage.getItem('pizza')
        ? JSON.parse(localStorage.getItem('pizza') as string)
        : createEmptyPizzaState()
    );
    setScene(
      localStorage.getItem('scenes')
        ? JSON.parse(localStorage.getItem('scenes') as string)
        : DefaultSceneState
    );
    window.addEventListener('storage', onStorageUpdate);
    return () => {
      window.removeEventListener('storage', onStorageUpdate);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        pizza,
        scenes,
        getPizzaAmount,
        setPizzaAmount,
        setPizzaWithLocalStorage,
        increasePizzaAmount,
        decreasePizzaAmount,
        setSceneRoationActive,
        setSceneDuration,
        getSceneMetaShow,
        setSceneMetaShow,
        setSceneKey,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
