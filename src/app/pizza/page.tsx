'use client';

import { Title } from '@/components/text';
import { PIZZA_SIZE, PIZZA_TYPE, PizzaSizes } from '@/context/AppContext';
import { PizzaTypes, useAppContext } from '@/context/AppContext';
import styled from 'styled-components';

function HeaderRow() {
  return (
    <Row>
      <Cell>
        <HeaderText>Name</HeaderText>
      </Cell>
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

export default function PizzaPage() {
  const { pizza, getPizzaAmount } = useAppContext();

  function PizzaCell(type: PIZZA_TYPE, size: PIZZA_SIZE) {
    return (
      <Cell>
        <TableText>{getPizzaAmount(type, size)}</TableText>
      </Cell>
    );
  }

  function PizzaRow(type: PIZZA_TYPE) {
    return (
      <Row>
        <Cell>
          <TableText>{type}</TableText>
        </Cell>
        {PizzaSizes.map((size) => PizzaCell(type, size))}
      </Row>
    );
  }

  return (
    <ViewPort>
      <Header>
        <Title>Pizza</Title>
      </Header>
      <Content>
        <HeaderRow />
        {PizzaTypes.map((type) => PizzaRow(type))}
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
  grid-template-rows: 1fr 70% 1fr;
  grid-template-areas:
    'header header header'
    'left content right'
    'footer footer footer';

  background: rgba(0, 0, 0, 0.8);
`;

const Header = styled.div`
  grid-area: header;
  background: red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  grid-area: content;
  background: blue;
`;

const Footer = styled.div`
  grid-area: footer;
  background: green;
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
