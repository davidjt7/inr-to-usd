"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAmountsInINR = exports.getUSD = void 0;
const models_1 = __importDefault(require("../models"));
const forex_1 = require("../services/forex");
const response_helper_1 = require("../utils/response_helper");
const getUSD = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inrAmount = parseInt(req.params.INR, 10);
        const result = yield forex_1.convertINRToUSD(inrAmount);
        return response_helper_1.successResponse(res)(result);
    }
    catch (error) {
        return response_helper_1.errorResponse(res)(error);
    }
});
exports.getUSD = getUSD;
const getAmountsInINR = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield forex_1.convertCSVToJSON(req.file.path);
        const exchangeRate = yield forex_1.convertINRToUSD(1);
        yield models_1.default.Results.create({
            ip: req.ip,
            method: req.method,
            originalUrl: req.originalUrl,
            inrArray: result.amountsInINR,
            usdArray: result.amountsInINR.filter(v => v != null).map(v => v * exchangeRate.amount),
            date: Date.now()
        });
        return response_helper_1.successResponse(res)(result);
    }
    catch (error) {
        return response_helper_1.errorResponse(res)(error);
    }
});
exports.getAmountsInINR = getAmountsInINR;
//# sourceMappingURL=forex.js.map