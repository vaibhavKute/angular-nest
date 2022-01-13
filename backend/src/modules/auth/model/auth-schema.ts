import * as extendSchema from 'mongoose-extend-schema';
import { CommonEntity } from '../../../common/entity/common-entity';

export const authSchema = extendSchema(CommonEntity, {
    email:String,
    password :String,
    mobile:Number,
    firstName:String,
    lastName: String  
});