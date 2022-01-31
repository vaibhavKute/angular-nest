import { Document } from 'mongoose';
export interface Product extends Document {
    productName: string;
    productDescription: string;
    productRate: number;
    productUrl: [];
}
