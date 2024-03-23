import { Request, Response } from 'express';
import { authUserPayload, buyerDocument, buyerMockRequest, buyerMockResponse } from '@users/controllers/test/mocks/buyer.mock';
import * as buyer from '@users/services/buyer.service';
import { getBuyerCurrentUsername, getBuyerWithEmail, getBuyerWithUsername } from '@users/controllers/buyer.controller';

jest.mock('@users/services/buyer.service');
jest.mock('@dt4real/adwuma-common');
jest.mock('@elastic/elasticsearch');

describe('Buyer Controller', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('email method', () => {
    it('should return buyer profile data', async () => {
      const req: Request = buyerMockRequest({}, authUserPayload) as unknown as Request;
      const res: Response = buyerMockResponse();
      jest.spyOn(buyer, 'getBuyerByEmail').mockResolvedValue(buyerDocument);

      await getBuyerWithEmail(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Buyer profile', buyer: buyerDocument });
    });
  });

  describe('currentUser method', () => {
    it('should return buyer profile data', async () => {
      const req: Request = buyerMockRequest({}, authUserPayload) as unknown as Request;
      const res: Response = buyerMockResponse();
      jest.spyOn(buyer, 'getBuyerByUsername').mockResolvedValue(buyerDocument);

      await getBuyerCurrentUsername(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Buyer profile', buyer: buyerDocument });
    });
  });

  describe('username method', () => {
    it('should return buyer profile data', async () => {
      const req: Request = buyerMockRequest({}, authUserPayload, { username: 'Manny' }) as unknown as Request;
      const res: Response = buyerMockResponse();
      jest.spyOn(buyer, 'getBuyerByUsername').mockResolvedValue(buyerDocument);

      await getBuyerWithUsername(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Buyer profile', buyer: buyerDocument });
    });
  });
});