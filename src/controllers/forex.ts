import { Request, Response } from "express";
import DB from "../models";
import { convertCSVToJSON, convertINRToUSD, sendMail } from "../services/forex";
import { errorResponse, successResponse } from "../utils/response_helper";

const getUSD = async (req: Request, res: Response) => {
  try {
    const inrAmount = parseInt(req.params.INR, 10);
    const result = await convertINRToUSD(inrAmount);
    return successResponse(res)(result);
  } catch (error) {
    return errorResponse(res)(error);
  }
};

const mailResults = async (req: Request, res: Response) => {
  try {
    await sendMail(req);
    return successResponse(res)({msg:"Success"});
  } catch (error) {
    return errorResponse(res)(error);
  }
};

const getAmountsInINR = async (req, res: Response) => {
  try {
    const result = await convertCSVToJSON(req.file.path);
    const exchangeRate = await convertINRToUSD(1);
    await DB.Results.create({
      ip: req.ip,
      method: req.method,
      originalUrl: req.originalUrl,
      inrArray: result.amountsInINR,
      usdArray: result.amountsInINR.filter(v=>v!=null).map(v=>v*exchangeRate.amount),
      date: Date.now()
    });
    return successResponse(res)(result);
  } catch (error) {
    return errorResponse(res)(error);
  }
};

export {
    getUSD,
    getAmountsInINR,
    mailResults,
};
