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
const cors_1 = __importDefault(require("cors"));
const app_1 = __importDefault(require("./app"));
const models_1 = __importDefault(require("./models"));
const logger_1 = __importDefault(require("./utils/logger"));
app_1.default.use(cors_1.default());
const server = app_1.default.listen(app_1.default.get("port"), () => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.default.sequelize.sync();
    logger_1.default.info(`forex up at ${process.env.HOST}`);
}));
exports.default = server;
//# sourceMappingURL=server.js.map