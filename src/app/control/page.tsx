'use client';

import { useAppContext, PizzaTypes, PizzaSizes, PIZZA_TYPE, PIZZA_SIZE } from '@/context/AppContext';
import styled from 'styled-components';

export default function ControlPage() {
  const { getPizzaAmount, increasePizzaAmount, decreasePizzaAmount } = useAppContext();

  function GridHeader() {
    return (<>
      <span>Pizza</span>
      {PizzaSizes.map((size) => (<span>{size}</span>))}
    </>);
  }

  function GridCell(type: PIZZA_TYPE, size: PIZZA_SIZE) {
    const amount = getPizzaAmount(type, size);
    return (<GridCellOption>
      <GridCellOptionButton onClick={() => decreasePizzaAmount(type, size)}>-</GridCellOptionButton>
      {amount > 0 ? <PizzaAmount>{amount}</PizzaAmount> : <PizzaAmountZero>{amount}</PizzaAmountZero>}
      <GridCellOptionButton onClick={() => increasePizzaAmount(type, size)}>+</GridCellOptionButton>
    </GridCellOption>);
  }

  function GridRow(type: PIZZA_TYPE) {
    return (<>
      <GridCellName>{type}</GridCellName>
      {PizzaSizes.map((size) => GridCell(type, size))}
    </>);
  }

  return (
    <>
      <PageLayout>
        <h1>Pizza Admin Control Dashboard Panel 9000 (Deluxe Edition)</h1>
        <HR/>
        <Grid>
          {GridHeader()}
          {PizzaTypes.map((type) => GridRow(type))}
        </Grid>
      </PageLayout>
    </>
  );
}

const PageLayout = styled.div`
  position: absolute;
  top: 0; bottom: 0;
  left: 0; right: 0;
  padding: 2em;
  font-size: 28px;
`

const HR = styled.hr`
  margin: 1em 0;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${PizzaSizes.length + 1}, 1fr);
  grid-template-rows: repeat(${PizzaTypes.length + 1}, 1fr);
`;

const GridRowComponent = styled.div`
`

const GridCellName = styled.div`
  margin-top: 0.5em;
`

const GridCellOption = styled.div`
  margin-top: 0.5em;
  display: flex;
`

const GridCellOptionButton = styled.button`
  margin: 0 1em;
  width: 32px;
  cursor: pointer;
  background: rgba(127, 127, 127, 0.5);
  box-shadow: 0 0 4px black;
  border: none;
  color: #ffffff;
`

const PizzaAmount = styled.span`
`

const PizzaAmountZero = styled.span`
  color: #7f7f7f;
`
