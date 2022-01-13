"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonEntity = void 0;
const mongoose = require("mongoose");
exports.CommonEntity = new mongoose.Schema({
    id: String,
    createdAt: { type: Date, required: true, default: Date },
    updatedAt: { type: Date, required: true, default: Date },
    createdBy: { type: String, },
    updatedBy: { type: String, },
    isActive: { type: Boolean, required: true, default: true },
    isDeleted: { type: Boolean, required: true, default: false }
});
//# sourceMappingURL=common-entity.js.map