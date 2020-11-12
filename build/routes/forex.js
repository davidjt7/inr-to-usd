"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const forex_1 = require("../controllers/forex");
const upload = multer_1.default({ dest: 'tmp' });
const forexRouter = express_1.Router({
    mergeParams: true
});
const forexRouters = {
    inrAmount: "/convert/:INR",
    csvToJson: "/csv"
};
forexRouter.get(forexRouters.inrAmount, forex_1.getUSD);
forexRouter.post(forexRouters.csvToJson, upload.single('inr'), forex_1.getAmountsInINR);
exports.default = forexRouter;
//# sourceMappingURL=forex.js.map