import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { mongooseMiddleware } from "../../middlewares/mongoose.middleware";
import { ResetController } from "../../controllers/reset.controller";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
  const { authorization } = req.headers;
  if (authorization?.split(" ")[1] !== "c3VwZXJhZG1pbjIxOnN1cGVyYWRtaW4yMQ==")
    throw Error("Unauthorized");
  await mongooseMiddleware();
  await next();
});

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { collection_name } = req.query;
  try {
    const response = await ResetController.resetOne(String(collection_name));
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
