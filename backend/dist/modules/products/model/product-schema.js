"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const extendSchema = require("mongoose-extend-schema");
const common_entity_1 = require("../../../common/entity/common-entity");
exports.productSchema = extendSchema(common_entity_1.CommonEntity, {
    productName: String,
    productDescription: String,
    productRate: Number,
});
//# sourceMappingURL=product-schema.js.map