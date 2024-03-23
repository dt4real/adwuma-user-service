import { sellerSchema } from '@users/schemes/seller';
import { createSeller, getRandomSellers, getSellerByEmail, getSellerById, getSellerByUsername, updateSeller } from '@users/services/seller.service';
import { BadRequestError, ISellerDocument } from '@dt4real/adwuma-common';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const addNewSeller = async (req: Request, res: Response): Promise<void> => {
	const { error } = await Promise.resolve(sellerSchema.validate(req.body));
	if (error?.details) {
		throw new BadRequestError(error.details[0].message, 'Create seller() method error');
	}
	const checkIfSellerExist: ISellerDocument | null = await getSellerByEmail(req.body.email);
	if (checkIfSellerExist) {
		throw new BadRequestError('Seller already exist. Go to your account page to update.', 'Create seller() method error');
	}
	const seller: ISellerDocument = {
		profilePublicId: req.body.profilePublicId,
		fullName: req.body.fullName,
		username: req.currentUser!.username,
		email: req.body.email,
		profilePicture: req.body.profilePicture,
		description: req.body.description,
		oneliner: req.body.oneliner,
		country: req.body.country,
		skills: req.body.skills,
		languages: req.body.languages,
		responseTime: req.body.responseTime,
		experience: req.body.experience,
		education: req.body.education,
		socialLinks: req.body.socialLinks,
		certificates: req.body.certificates
	};
	const createdSeller: ISellerDocument = await createSeller(seller);
	res.status(StatusCodes.CREATED).json({ message: 'Seller created successfully.', seller: createdSeller });
};

const updateSellerInfo = async (req: Request, res: Response): Promise<void> => {
	const { error } = await Promise.resolve(sellerSchema.validate(req.body));
	if (error?.details) {
		throw new BadRequestError(error.details[0].message, 'Update seller() method error');
	}
	const seller: ISellerDocument = {
		profilePublicId: req.body.profilePublicId,
		fullName: req.body.fullName,
		profilePicture: req.body.profilePicture,
		description: req.body.description,
		oneliner: req.body.oneliner,
		country: req.body.country,
		skills: req.body.skills,
		languages: req.body.languages,
		responseTime: req.body.responseTime,
		experience: req.body.experience,
		education: req.body.education,
		socialLinks: req.body.socialLinks,
		certificates: req.body.certificates
	};
	const updatedSeller: ISellerDocument = await updateSeller(req.params.sellerId, seller);
	res.status(StatusCodes.OK).json({ message: 'Seller created successfully.', seller: updatedSeller });
};

const getSellerWithId = async (req: Request, res: Response): Promise<void> => {
	const seller: ISellerDocument | null = await getSellerById(req.params.sellerId);
	res.status(StatusCodes.OK).json({ message: 'Seller profile', seller });
};

const getSellerWithUsername = async (req: Request, res: Response): Promise<void> => {
	const seller: ISellerDocument | null = await getSellerByUsername(req.params.username);
	res.status(StatusCodes.OK).json({ message: 'Seller profile', seller });
};

const getSellersRandom = async (req: Request, res: Response): Promise<void> => {
	const sellers: ISellerDocument[] = await getRandomSellers(parseInt(req.params.size, 10));
	res.status(StatusCodes.OK).json({ message: 'Random sellers profile', sellers });
};


export { addNewSeller, updateSellerInfo, getSellerWithId, getSellerWithUsername, getSellersRandom };