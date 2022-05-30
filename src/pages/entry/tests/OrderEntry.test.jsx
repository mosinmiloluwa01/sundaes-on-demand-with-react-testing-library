import {renderWithWrapper, screen, waitFor} from '../../../test-utils/testing-library-utils';
import OrderEntry from '../OrderEntry';
import {server} from '../../../mocks/server';
import { rest } from 'msw';
import { OrderDetailsProvider } from '../../../context/OrderDetails';
import userEvent from '@testing-library/user-event';

const {findAllByRole, getByRole, findByRole} = screen

let grandTotal, vanillaInput, cheriesCheckbox, strawberriesCheckbox;

beforeEach(() => {
  renderWithWrapper(<OrderEntry />)
})

describe('Order Entry Component: Error Handling', () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) => res(ctx.status(500))),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) => res(ctx.status(500)))
  )
  test('scoops and toppings', async () => {

    await waitFor(async () => {
      const alerts = await findAllByRole('alert')
      expect(alerts).toHaveLength(2);
    })
  })
})

describe('Grand Total', () => {
  beforeEach(async () => {
    grandTotal = getByRole('heading', {name: /grand total/i, exact: false});
    vanillaInput = await screen.findByRole('spinbutton', {name: /vanilla/i})
    cheriesCheckbox = await screen.findByRole('checkbox', {name: /cherries/i})
    strawberriesCheckbox = await screen.findByRole('checkbox', {name: /strawberries/i})
  })

  test('initial value', () => {
    expect(grandTotal).toBeInTheDocument()
    expect(grandTotal).toHaveTextContent('0')
  })

  test('should update correctly when scoop is selected first then topping', async () => {
    userEvent.type(vanillaInput, '1')
    expect(grandTotal).toHaveTextContent('2')

    userEvent.click(cheriesCheckbox)
    userEvent.click(strawberriesCheckbox)
    expect(grandTotal).toHaveTextContent('5')
  })

  test('should update correctly when topping is selected first then scoops', async () => {
    userEvent.click(cheriesCheckbox)
    userEvent.click(strawberriesCheckbox)
    expect(grandTotal).toHaveTextContent('3')
    
    userEvent.type(vanillaInput, '1')
    expect(grandTotal).toHaveTextContent('5')
  })

  test('should update correctly when one item is removed', async () => {
    userEvent.click(cheriesCheckbox)
    userEvent.click(strawberriesCheckbox)
    expect(grandTotal).toHaveTextContent('3')
    
    userEvent.type(vanillaInput, '1')
    expect(grandTotal).toHaveTextContent('5')
    
    userEvent.click(strawberriesCheckbox)
    expect(grandTotal).toHaveTextContent('3.5')
  })
})