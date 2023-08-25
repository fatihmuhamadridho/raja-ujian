import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { mongooseMiddleware } from "../../middlewares/mongoose.middleware";
import { QuizController } from "../../controllers/quiz.controller";
import { quizModelProps } from "../../models/quiz.model";
import mongoose from "mongoose";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
  await mongooseMiddleware();
  await next();
  await mongoose.disconnect();
});

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { package_id }: any = req.query;
  try {
    const response = await QuizController.getAll({ package_id: package_id });
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ status: false, error: error.stack });
  }
});

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    number,
    question,
    multiple_choice,
    correct_answer,
    score,
    package: packageId,
  }: quizModelProps = req.body;
  try {
    const response = await QuizController.post({
      number,
      question,
      multiple_choice,
      correct_answer,
      score,
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
