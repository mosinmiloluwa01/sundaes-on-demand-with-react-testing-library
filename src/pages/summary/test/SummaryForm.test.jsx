import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SummaryForm from '../SummaryForm';

beforeEach(() => {
  render(<SummaryForm/>);
})

const {getByRole, getByText, queryByText} = screen

describe('SummaryForm Component', () => {
  test('checkbox is unchecked by default and button is disabled when unchecked', () => {
    const checkbox = getByRole('checkbox', {name: /i agree to terms and conditions/i});
    const button = getByRole('button', {name: /confirm order/i});

    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  })
  test('checking checkbox enables the button', () => {
    const checkbox = getByRole('checkbox', {name: /i agree to terms and conditions/i});
    const button = getByRole('button', {name: /confirm order/i});

    userEvent.click(checkbox)

    expect(checkbox).toBeChecked();
    expect(button).toBeEnabled();

    userEvent.click(checkbox)

    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  })
  test('popover response to hover', async () => {
    let popover
    popover = queryByText(/no ice cream will actually be delivered/i)
    const tAndC = getByText(/terms and conditions/i)

    expect(popover).not.toBeInTheDocument();

    userEvent.hover(tAndC)
    popover = queryByText(/no ice cream will actually be delivered/i)

    expect(popover).toBeInTheDocument()

    userEvent.unhover(tAndC)
    //unhover happens asynchronously, so we needed await and the method
    await waitForElementToBeRemoved(() => queryByText(/no ice cream will actually be delivered/i))

    expect(popover).not.toBeInTheDocument();

  })
})