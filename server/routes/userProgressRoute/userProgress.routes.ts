import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { mongooseMiddleware } from "../../middlewares/mongoose.middleware";
import mongoose from "mongoose";
import { UserProgressController } from "../../controllers/userProgress.controller";
import { userProgressModelProps } from "../../models/userProgress.model";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
  await mongooseMiddleware();
  await next();
  await mongoose.disconnect();
});

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await UserProgressController.getAll();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ status: false, error: error.stack });
  }
});

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    last_quiz_number,
    score_total,
    isFinished,
    user,
    package: packageId,
  }: userProgressModelProps = req.body;
  try {
    const response = await UserProgressController.post({
      last_quiz_number,
      score_total,
      isFinished,
      user,
      package: packageId,
    });
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
