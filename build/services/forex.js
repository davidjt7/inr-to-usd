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
exports.sendMail = exports.convertCSVToJSON = exports.convertINRToUSD = void 0;
const fs_1 = __importDefault(require("fs"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const papaparse_1 = __importDefault(require("papaparse"));
const logger_1 = __importDefault(require("../utils/logger"));
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
function sendMail(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const testAccount = yield nodemailer_1.default.createTestAccount();
            const transporter = nodemailer_1.default.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                },
            });
            // send mail with defined transport object
            const info = yield transporter.sendMail({
                from: '"Fred Foo" <foo@example.com>',
                to: req.body.receiver,
                subject: "INR To USD Conversion Results",
                text: "Results",
                html: `
            <style>
            #results {
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            width: 100%;
            }

            #results td, #results th {
            border: 1px solid #ddd;
            padding: 8px;
            }

            #results tr:nth-child(even){background-color: #f2f2f2;}

            #results tr:hover {background-color: #ddd;}

            #results th {
            padding-top: 12px;
            padding-bottom: 12px;
            text-align: left;
            background-color: #4CAF50;
            color: white;
            }
            p { color: #4c4a37; font-family: 'Source Sans Pro', sans-serif; font-size: 18px; line-height: 32px; margin: 0 0 24px; }
            </style>
            <table id="results">
                <th>Date</th>
                <th>INR</th>
                <th>USD</th>
            ${req.body.rows.map((row) => {
                    return `<tr>
                  <td>${row.date.substr(0, 25)}</td>
                  <td>${row.inr}</td>
                  <td>${row.usd}</TableCell>
                </tr>`;
                })}
            </table>
            <p>Mean: ${req.body.mean}</p> <p>Median: ${req.body.median}</p><p> Minimum: ${req.body.minimum}</p> <p>Maximum: ${req.body.maximum}</p>
            `,
            });
            logger_1.default.info("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info));
            return;
        }
        catch (error) {
            throw error.message;
        }
    });
}
exports.sendMail = sendMail;
function convertCSVToJSON(csvFilePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fs_1.default.promises.readFile(csvFilePath);
            const dataString = data.toString();
            const csvString = dataString.substring(0, dataString.length - 1);
            const array = yield papaparse_1.default.parse(csvString);
            const result = array.data.flat();
            const cleanedResult = result.filter((value) => !isNaN(value)).map(Number).sort();
            let sum = 0;
            let count = 0;
            for (const item of cleanedResult) {
                sum += item;
                count = count + 1;
            }
            const mean = sum / count;
            const median = computeMedian(cleanedResult);
            const minimum = cleanedResult[0];
            const maximum = cleanedResult[cleanedResult.length - 1];
            return {
                mean,
                median,
                minimum,
                maximum,
                amountsInINR: cleanedResult,
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
const computeMedian = (values) => {
    if (values.length === 0) {
        return 0;
    }
    values.sort((a, b) => {
        return a - b;
    });
    const half = Math.floor(values.length / 2);
    if (values.length % 2) {
        return values[half];
    }
    return (values[half - 1] + values[half]) / 2.0;
};
//# sourceMappingURL=forex.js.map