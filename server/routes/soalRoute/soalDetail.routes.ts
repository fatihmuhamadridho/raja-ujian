import { createRouter } from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { SoalController } from "../../controllers/soal.controller";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
  await next();
});

router.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { soal_id } = req.query;
  try {
    const response = await SoalController.getOne({ soal_id: String(soal_id) });
    res.status(200).json({ status: true, data: response });
  } catch (error: any) {
    res.status(500).json({ status: false, error: error.stack });
  }
});

export default router.handler({
  onError: (err: any, req: NextApiRequest, res: NextApiResponse) => {
    res.status(500).json({ error: err.stack });
  },
});
