import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { mongooseMiddleware } from "../../middlewares/mongoose.middleware";
import { ResetController } from "../../controllers/reset.controller";
import mongoose from "mongoose";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
  const { authorization } = req.headers;
  if (authorization?.split(" ")[1] !== "c3VwZXJhZG1pbjIxOnN1cGVyYWRtaW4yMQ==")
    throw Error("Unauthorized");
  await mongooseMiddleware();
  await next();
  await mongoose.disconnect();
});

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await ResetController.resetAll();
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