import * as extendSchema from 'mongoose-extend-schema';
import { CommonEntity } from '../../../common/entity/common-entity';

export const productSchema = extendSchema(CommonEntity, {
    productName:String,
    productDescription :String,
    productRate:Number,
});