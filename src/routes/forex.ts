import { Router } from "express";
import multer from 'multer';
import { getAmountsInINR, getUSD } from "../controllers/forex";

const upload = multer({dest: 'tmp'});

const forexRouter = Router({
  mergeParams: true
});

const forexRouters = {
  inrAmount: "/convert/:INR",
  csvToJson: "/csv"
};

forexRouter.get(
  forexRouters.inrAmount,
  getUSD
);

forexRouter.post(
  forexRouters.csvToJson,
  upload.single('inr'),
  getAmountsInINR
);

export default forexRouter;
