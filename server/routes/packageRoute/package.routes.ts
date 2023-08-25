import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { mongooseMiddleware } from "../../middlewares/mongoose.middleware";
import { PackageController } from "../../controllers/package.controller";
import { packageModelProps } from "../../models/package.model";
import mongoose from "mongoose";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
  await mongooseMiddleware();
  await next();
  await mongoose.disconnect();
});

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await PackageController.getAll();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ status: false, error: error.stack });
  }
});

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, group, quizs }: packageModelProps = req.body;
  try {
    const response = await PackageController.post({ name, group, quizs });
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ status: false, error: error.stack });
  }
});

export default router.handler({
  onError: (err: any, req: NextApiRequest, res: NextApiResponse) => {
    res.status(500).json({ error: err.stack });
  },
});
