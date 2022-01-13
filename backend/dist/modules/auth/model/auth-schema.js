"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSchema = void 0;
const extendSchema = require("mongoose-extend-schema");
const common_entity_1 = require("../../../common/entity/common-entity");
exports.authSchema = extendSchema(common_entity_1.CommonEntity, {
    email: String,
    password: String,
    mobile: Number,
    firstName: String,
    lastName: String
});
//# sourceMappingURL=auth-schema.js.map