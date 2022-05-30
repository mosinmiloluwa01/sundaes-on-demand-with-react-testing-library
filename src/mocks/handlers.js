import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res,ctx) => {
    return res(
      ctx.json([
        {name: 'chocolate', imagePath: '/images/chocolate.png'},
        {name: 'vanilla', imagePath: '/images/chocolate2.png'},
      ])
    )
  }),
  rest.get("http://localhost:3030/toppings", (req, res,ctx) => {
    return res(
      ctx.json([
        {name: 'cherries', imagePath: '/images/chocolate.png'},
        {name: 'strawberries', imagePath: '/images/chocolate2.png'},
      ])
    )
  })
] 