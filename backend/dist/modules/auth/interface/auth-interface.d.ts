import { Document } from 'mongoose';
export interface Auth extends Document {
    password: string;
    email: string;
    mobile: number;
    firstName: number;
    lastName: number;
}
