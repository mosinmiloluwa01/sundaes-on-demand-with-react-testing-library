import { renderWithWrapper, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

describe('Totals: Scoops', () => {
  test('update subtotal when scoop changes', async () => {
    renderWithWrapper(<Options type='scoops'/>);

    const scoopsSubtotal = screen.getByText('Scoops total:', {exact: false})
    expect(scoopsSubtotal).toHaveTextContent('0');

    const vanillaInput = await screen.findByRole('spinbutton', {name: /vanilla/i})
    //best practice to clear input field first
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '1')
    expect(scoopsSubtotal).toHaveTextContent('2')

    const chocolateInput = await screen.findByRole('spinbutton', {name: /chocolate/i})
    userEvent.clear(chocolateInput)
    userEvent.type(chocolateInput, '2')
    expect(scoopsSubtotal).toHaveTextContent('6')
  })
})

describe('Totals: Toppings', () => {
  test('update subtotal when scoop changes', async () => {
    renderWithWrapper(<Options type='toppings'/>);

    const toppingsSubtotal = screen.getByText('Toppings total:', {exact: false})
    expect(toppingsSubtotal).toHaveTextContent('0');

    //when cherries is checked
    const cheriesCheckbox = await screen.findByRole('checkbox', {name: /cherries/i})
    userEvent.click(cheriesCheckbox)
    expect(toppingsSubtotal).toHaveTextContent('1.5')

    //when strawberries is checked
    const strawberriesCheckbox = await screen.findByRole('checkbox', {name: /strawberries/i})
    userEvent.click(strawberriesCheckbox)
    expect(toppingsSubtotal).toHaveTextContent('3')

    //when strawberries is unchecked
    userEvent.click(strawberriesCheckbox)
    expect(toppingsSubtotal).toHaveTextContent('1.5')

    //when cherries is unchecked
    userEvent.click(cheriesCheckbox)
    expect(toppingsSubtotal).toHaveTextContent('0')
  })
})