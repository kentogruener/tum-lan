import EndScene from './end';
import IFrameScene from './iframe';
import PizzaScene from './pizza';
import WelcomeScene from './welcome';

type SceneData = {
  [key: string]: {
    name: string;
    background: boolean;
    overlay: boolean;
    scene: JSX.Element;
  };
};

const sceneComponents: SceneData = {
  welcome: {
    name: 'Welcome',
    background: true,
    overlay: true,
    scene: <WelcomeScene />,
  },
  pizza: {
    name: 'Pizza',
    background: true,
    overlay: true,
    scene: <PizzaScene />,
  },
  end: {
    name: 'End',
    background: true,
    overlay: true,
    scene: <EndScene />,
  },
  slido: {
    name: 'Slido',
    background: false,
    overlay: false,
    scene: (
      <IFrameScene
        url={
          'https://wall.sli.do/event/uQqnS6KLUmwMa8uNs3ZGXo?section=1f0d6173-83b9-41b6-b3ba-2e339570ea54'
        }
      />
    ),
  },
  twitch: {
    name: 'Twitch',
    background: false,
    overlay: false,
    scene: (
      <IFrameScene
        url={'https://player.twitch.tv/?channel=deansocool&parent=localhost'}
      />
    ),
  },
};

const scenesMeta = Object.entries(sceneComponents).map(([key, value]) => ({
  key: key,
  name: value.name,
  show: false,
}));

export { sceneComponents, scenesMeta };
