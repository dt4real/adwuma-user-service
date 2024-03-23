import { getBuyerByEmail, getBuyerByUsername } from '@users/services/buyer.service';
import { IBuyerDocument } from '@dt4real/adwuma-common';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const getBuyerWithEmail = async (req: Request, res: Response): Promise<void> => {
  const buyer: IBuyerDocument | null = await getBuyerByEmail(req.currentUser!.email);
  res.status(StatusCodes.OK).json({ message: 'Buyer profile', buyer });
};

const getBuyerCurrentUsername = async (req: Request, res: Response): Promise<void> => {
  const buyer: IBuyerDocument | null = await getBuyerByUsername(req.currentUser!.username);
  res.status(StatusCodes.OK).json({ message: 'Buyer profile', buyer });
};

const getBuyerWithUsername = async (req: Request, res: Response): Promise<void> => {
  const buyer: IBuyerDocument | null = await getBuyerByUsername(req.params.username);
  res.status(StatusCodes.OK).json({ message: 'Buyer profile', buyer });
};

export { getBuyerWithEmail, getBuyerCurrentUsername, getBuyerWithUsername };