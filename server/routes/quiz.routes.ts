import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { mongooseMiddleware } from "../middlewares/mongoose.middleware";
import { QuizController } from "../controllers/quiz.controller";
import { quizModelProps } from "../models/quiz.model";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
  await mongooseMiddleware();
  await next();
});

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await QuizController.getAll();
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ status: false, error: error.stack });
  }
});

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    question,
    multiple_choice,
    correct_answer,
    package: packageId,
  }: quizModelProps = req.body;
  try {
    const response = await QuizController.post({
      question,
      multiple_choice,
      correct_answer,
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
