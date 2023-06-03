'use client';

import { Subtitle, Title } from '@/components/Text';
import { sceneComponents } from '@/components/scenes';
import { PizzaSizes } from '@/context/AppContext';
import { PizzaTypes, useAppContext } from '@/context/AppContext';
import styled from 'styled-components';

function PizzaHeaderRow() {
  return (
    <Row>
      <NameCell>
        <HeaderText>Pizza</HeaderText>
      </NameCell>
      <Cell>
        <HeaderText>Normal</HeaderText>
      </Cell>
      <Cell>
        <HeaderText>Large</HeaderText>
      </Cell>
      <Cell>
        <HeaderText>Family</HeaderText>
      </Cell>
      <Cell>
        <HeaderText>Prima</HeaderText>
      </Cell>
    </Row>
  );
}

function StreamHeaderRow() {
  return (
    <Row>
      <NameCell>
        <HeaderText>Scene</HeaderText>
      </NameCell>
      <Cell>
        <HeaderText>Rotation</HeaderText>
      </Cell>
      <Cell>
        <HeaderText></HeaderText>
      </Cell>
      <Cell>
        <HeaderText></HeaderText>
      </Cell>
      <Cell>
        <HeaderText></HeaderText>
      </Cell>
    </Row>
  );
}

export default function ControlPage() {
  const {
    scenes,
    getPizzaAmount,
    increasePizzaAmount,
    decreasePizzaAmount,
    setSceneRoationActive,
    setSceneDuration,
    getSceneMetaShow,
    setSceneMetaShow,
    setSceneKey,
  } = useAppContext();

  return (
    <ViewPort>
      <Header>
        <Title>Control Page</Title>
      </Header>
      <Stream>
        <Subtitle>Stream</Subtitle>
        <hr />
        <Row>
          <NameCell>
            <TableText>Reset</TableText>
          </NameCell>
          <Cell>
            <button onClick={() => localStorage.clear()}>Reset</button>
          </Cell>
        </Row>
        <Row>
          <NameCell>
            <TableText>Current Scene</TableText>
          </NameCell>
          <Cell>{scenes.currentSceneKey}</Cell>
        </Row>
        <Row>
          <NameCell>
            <TableText>Rotation</TableText>
          </NameCell>
          <Cell>
            <input
              type="checkbox"
              checked={scenes.rotationActive}
              onChange={() => setSceneRoationActive(!scenes.rotationActive)}
            />
          </Cell>
        </Row>
        <Row>
          <NameCell>
            <TableText>Duration</TableText>
          </NameCell>
          <Cell>
            <input
              type="number"
              value={scenes.duration}
              onChange={(event) =>
                setSceneDuration(Number.parseInt(event.target.value) || 1000)
              }
            />
          </Cell>
        </Row>
        <hr />
        <StreamHeaderRow />
        <hr />
        {Object.keys(sceneComponents).map((sceneName) => {
          const show = getSceneMetaShow(sceneName);

          return (
            <Row key={sceneName}>
              <NameCell>
                <TableText>{sceneName}</TableText>
              </NameCell>
              <Cell>
                <input
                  type="checkbox"
                  checked={show}
                  onChange={() => setSceneMetaShow(sceneName, !show)}
                />
              </Cell>
              <Cell>
                <button onClick={() => setSceneKey(sceneName)}>Select</button>
              </Cell>
            </Row>
          );
        })}
      </Stream>
      <Pizza>
        <Subtitle>Pizza</Subtitle>
        <hr />
        <PizzaHeaderRow />
        <hr />
        {PizzaTypes.map((type) => {
          return (
            <Row key={type}>
              <NameCell>
                <TableText>{type}</TableText>
              </NameCell>
              {PizzaSizes.map((size) => {
                const pizzaAmount = getPizzaAmount(type, size);
                const isZero = pizzaAmount === 0;
                return (
                  <Cell key={size}>
                    <PizzaButton
                      $isZero={isZero}
                      onClick={() => decreasePizzaAmount(type, size)}
                    >
                      -
                    </PizzaButton>
                    <PizzaText $isZero={isZero}>{pizzaAmount}</PizzaText>
                    <PizzaButton
                      $isZero={isZero}
                      onClick={() => increasePizzaAmount(type, size)}
                    >
                      +
                    </PizzaButton>
                  </Cell>
                );
              })}
            </Row>
          );
        })}
      </Pizza>
    </ViewPort>
  );
}

const ViewPort = styled.div`
  position: absolute;

  height: auto;
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 70% 1fr;
  grid-template-rows: 200px repeat(2, max-content);
  grid-template-areas:
    'header header header'
    'left stream right'
    'left pizza right';

  background: rgba(0, 0, 0, 0.8);
`;

const ContentContainer = styled.div`
  padding-bottom: 64px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-area: header;
`;

const Pizza = styled(ContentContainer)`
  grid-area: pizza;
`;

const Stream = styled(ContentContainer)`
  grid-area: stream;
`;

const Row = styled.div`
  display: grid;
  height: 64px;
  grid-template-columns: repeat(5, 1fr);
`;

const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NameCell = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

const HeaderText = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #fff;
`;

const TableText = styled.p`
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  text-align: center;
`;

interface IsZeroProps {
  $isZero: boolean;
}

const PizzaText = styled.p<IsZeroProps>`
  width: 25%;
  font-size: 2rem;
  font-weight: 700;
  color: rgba(255, 255, 255, ${(props) => (props.$isZero ? 0.2 : 1)});
  text-align: center;
`;

const PizzaButton = styled.button<IsZeroProps>`
  width: 32px;
  height: 32px;

  font-size: 2rem;
  font-weight: 700;
  color: rgba(255, 255, 255, ${(props) => (props.$isZero ? 0.2 : 1)});

  text-align: center;
  padding: 0px;

  cursor: pointer;

  background: rgba(127, 127, 127, ${(props) => (props.$isZero ? 0.2 : 1)});
  border: none;

  box-shadow: 0 0 4px black;
`;
