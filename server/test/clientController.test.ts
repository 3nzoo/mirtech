import chaiHttp from 'chai-http';
import chai from 'chai';
import { Request, Response } from 'express';
import { getClients } from '../src/controller/clients.controller';

import { app } from '../src/index';
chai.use(chaiHttp);

const expect = chai.expect;

describe('Clients API', () => {
  describe('getClients', () => {
    it('should return an array of clients', () => {
      const req = {} as Request;
      const res = {
        send: (result: any) => {
          expect(result).to.be.an('array');
        },
      } as Response;
      getClients(req, res);
    });
  });

  describe('GET /clients/:id', () => {
    it('should return a client object', async () => {
      const res = await chai.request(app).get('/clients/1');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('name');
      expect(res.body.id).to.equal(1);
    });

    it('should return a 404 error if client id is not found', async () => {
      const res = await chai.request(app).get('/clients/11');

      expect(res).to.have.status(404);
    });
  });

  describe('POST /clients', () => {
    it('should create a new client object', async () => {
      const newClient = {
        name: 'John Doe',
        organization: 'org1',
        isActive: true,
        assigned_user: 'Mae',
        avatar: '/avatar/2.png',
        contact: '2940394003',
      };

      const res = await chai.request(app).post('/clients').send(newClient);

      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('name');
      expect(res.body.name).to.equal('John Doe');
    });

    it('should return a 400 error if request body is invalid', async () => {
      const invalidClient = {
        name: 'John Doe',
        isActive: 'yes',
      };

      const res = await chai.request(app).post('/clients').send(invalidClient);

      expect(res).to.have.status(400);
    });
  });
});
