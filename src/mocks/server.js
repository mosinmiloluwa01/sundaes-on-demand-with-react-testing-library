import { setupServer } from 'msw/node';
import { handlers } from './handlers';

//configure mock server
export const server = setupServer(...handlers);