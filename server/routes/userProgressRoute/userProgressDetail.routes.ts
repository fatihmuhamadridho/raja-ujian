import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { mongooseMiddleware } from "../../middlewares/mongoose.middleware";
import mongoose from "mongoose";
import { UserProgressController } from "../../controllers/userProgress.controller";
import { userProgressModelProps } from "../../models/userProgress.model";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
  await mongooseMiddleware();
  await mongoose.startSession();
  await next();
  await mongoose.connection.close();
});

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, packageId } = req.query;
  try {
    const response = await UserProgressController.getOne({
      userId: String(userId),
      packageId: String(packageId),
    });
    return res.status(200).json(response);
  } catch (error: any) {
    return res.status(500).json({ status: false, error: error.stack });
  }
});

export default router.handler({
  onError: (err: any, req: NextApiRequest, res: NextApiResponse) => {
    res.status(500).json({ error: err.stack });
  },
});
