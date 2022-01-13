
import * as mongoose from 'mongoose';

export const CommonEntity = new mongoose.Schema({
	id: String,
	createdAt: { type: Date, required: true, default: Date },
	updatedAt: { type: Date, required: true, default: Date },
	createdBy: { type: String,  },
	updatedBy: { type: String,  },
	isActive: { type: Boolean, required: true, default: true },
	isDeleted: { type: Boolean, required: true, default: false }
})