import { Router } from 'express';
import {
  addClient,
  getClient,
  getClients,
  updateClientStatus,
} from './controller/clients.controller';
import { getUsers } from './controller/users.controller';

export const routes = (router: Router) => {
  router.get('/clients', getClients);
  router.get('/clients/:id', getClient);
  router.post('/clients', addClient);
  router.patch('/clients/:id', updateClientStatus);
  router.get('/users', getUsers);
};
