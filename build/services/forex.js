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
exports.convertCSVToJSON = exports.convertINRToUSD = void 0;
const fs_1 = __importDefault(require("fs"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const papaparse_1 = __importDefault(require("papaparse"));
function convertINRToUSD(amount) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const timestamp = Date.now();
            const exchangeRateUrl = 'https://api.exchangeratesapi.io/latest?base=INR&symbols=USD';
            const response = yield node_fetch_1.default(exchangeRateUrl);
            const json = yield response.json();
            return {
                timestamp,
                amount: json.rates.USD * amount,
            };
        }
        catch (error) {
            throw error.message;
        }
    });
}
exports.convertINRToUSD = convertINRToUSD;
function convertCSVToJSON(csvFilePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fs_1.default.promises.readFile(csvFilePath);
            const dataString = data.toString();
            const csvString = dataString.substring(0, dataString.length - 1);
            const array = yield papaparse_1.default.parse(csvString);
            const result = array.data.flat();
            const cleanedResult = result.filter((value) => value !== "").map(Number);
            return {
                amountsInINR: cleanedResult
            };
        }
        catch (error) {
            throw error.message;
        }
        finally {
            fs_1.default.unlink(csvFilePath, () => {
                return;
            });
        }
    });
}
exports.convertCSVToJSON = convertCSVToJSON;
//# sourceMappingURL=forex.js.map