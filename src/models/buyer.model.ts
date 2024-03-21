import { IBuyerDocument } from '@dt4real/adwuma-common';
import mongoose, { Model, Schema, model } from 'mongoose';

const buyerSchema: Schema = new Schema(
	{
		username: { type: String, required: true, index: true },
		email: { type: String, required: true, index: true },
		profilePicture: { type: String, required: true },
		country: { type: String, required: true },
		isSeller: { type: Boolean, default: false },
		purchasedGigs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gig' }],
		createdAt: { type: Date }
	},
	{
		versionKey: false // TODO: Find meaning of versionKey
	}
);

const BuyerModel: Model<IBuyerDocument> = model<IBuyerDocument>('Buyer', buyerSchema, 'Buyer');
export { BuyerModel };