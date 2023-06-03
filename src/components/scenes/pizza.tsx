'use client';

import { Subtitle, Title } from '@/components/Text';
import { PizzaSizes } from '@/context/AppContext';
import { PizzaTypes, useAppContext } from '@/context/AppContext';
import styled from 'styled-components';

function HeaderRow() {
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

export default function PizzaScene() {
  const { getPizzaAmount } = useAppContext();

  return (
    <ViewPort>
      <Header>
        <Title>Pizza</Title>
        <Subtitle>Can now be picked up at Quantum</Subtitle>
      </Header>
      <Content>
        <HeaderRow />
        <hr />
        {PizzaTypes.map((type) => {
          const pizzaTotal = PizzaSizes.reduce((acc, size) => {
            return acc + getPizzaAmount(type, size);
          }, 0);
          return (
            <Row key={type}>
              <NameCell>
                <TableText $isZero={pizzaTotal === 0}>{type}</TableText>
              </NameCell>
              {PizzaSizes.map((size) => {
                const pizzaAmount = getPizzaAmount(type, size);
                const isZero = pizzaAmount === 0;
                return (
                  <Cell key={size}>
                    <PizzaText $isZero={isZero}>{pizzaAmount}</PizzaText>
                  </Cell>
                );
              })}
            </Row>
          );
        })}
      </Content>
      <Footer></Footer>
    </ViewPort>
  );
}

const ViewPort = styled.div`
  position: absolute;

  height: 100vh;
  width: 100vw;

  display: grid;
  grid-template-columns: 1fr 70% 1fr;
  grid-template-rows: 30% 70% 1fr;
  grid-template-areas:
    'header header header'
    'left content right'
    'footer footer footer';

  background: rgba(0, 0, 0, 0.8);
`;

const Header = styled.div`
  grid-area: header;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  grid-area: content;
`;

const Footer = styled.div`
  grid-area: footer;
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

interface IsZeroProps {
  $isZero: boolean;
}

const TableText = styled.p<IsZeroProps>`
  font-size: 2rem;
  font-weight: 700;
  color: rgba(255, 255, 255, ${(props) => (props.$isZero ? 0.2 : 1)});
  text-align: center;
`;

const PizzaText = styled.p<IsZeroProps>`
  font-size: 2rem;
  font-weight: 700;
  color: rgba(255, 255, 255, ${(props) => (props.$isZero ? 0.2 : 1)});
  text-align: center;
`;
