import { Request, Response } from 'express';
import { iClient } from '../interfaces';
import { clients } from '../dummy.data';

export const getClients = (req: Request, res: Response) => {
  const result = clients;
  res.send(result);
};

export const getClient = (req: Request, res: Response) => {
  const result = clients.find(
    (client: iClient) => client.id === parseInt(req.params.id)
  );

  if (!result) res.status(404).send('client not found');

  res.send(result);
};

export const addClient = (req: Request, res: Response) => {
  const newClient: iClient = {
    id: clients.length + 1,
    name: req.body.name,
    contact: req.body.contact,
    avatar: req.body.avatar,
    assigned_user: req.body.assigned_user,
    isActive: req.body.isActive,
    organization: req.body.organization,
    createdAt: new Date().toISOString(),
  };

  clients.push(newClient);
  if (typeof req.body.isActive !== 'boolean') {
    return res.status(400).send('invalid data format');
  }
  return res.status(201).send(newClient);
};

export const updateClientStatus = (req: Request, res: Response) => {
  const result = clients.find(
    (client: iClient) => client.id === parseInt(req.params.id)
  );

  if (!result) {
    res.status(404).send('Client not found');
  } else {
    result.isActive = req.body.isActive;
  }
  res.send(result);
};
