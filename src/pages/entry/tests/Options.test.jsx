import { renderWithWrapper, screen } from "../../../test-utils/testing-library-utils";

import Options from "../Options";


const {findAllByRole} = screen

describe('Options: scoops', () => {
  beforeEach(() => {
    renderWithWrapper(<Options type='scoops'/>)
  })
  test('display image for each scoop option', async () => {
    const images = await findAllByRole('img', {name: /scoop$/i})
    const altText = images.map((element) => element.alt)

    expect(images).toHaveLength(2);
    expect(altText).toEqual(['chocolate scoop', 'vanilla scoop'])
  })
})

describe('Options: toppings', () => {
  beforeEach(() => {
    renderWithWrapper(<Options type='toppings'/>)
    // render(<Options type='toppings'/>, {wrapper: OrderDetailsProvider})
  })
  test('display image for each toppings option', async () => {
    const images = await findAllByRole('img', {name: /toppings$/i})
    const altText = images.map((element) => element.alt)

    expect(images).toHaveLength(2);
    expect(altText).toEqual(['cherries toppings', 'strawberries toppings'])
  })
})