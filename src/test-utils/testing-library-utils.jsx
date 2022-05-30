import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../context/OrderDetails";

export const renderWithWrapper = (ui, options) => render(ui, {wrapper: OrderDetailsProvider, ...options})

export * from '@testing-library/react'

// export { renderWithWrapper as render};