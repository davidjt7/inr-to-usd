import { Router } from "express";
import forex from "./forex"

const router = Router();

router.use(
  forex,
);

export default router;
