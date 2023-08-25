import mongoose from "mongoose";
import { packageModel } from "../models/package.model";
import { quizModel } from "../models/quiz.model";

export class ResetController {
  static async resetAll() {
    const packages = await packageModel.deleteMany({});
    const quizs = await quizModel.deleteMany({});
    return {
      status: true,
      data: {
        packages,
        quizs,
      },
    };
  }

  static async resetOne(collection_name: string) {
    if (!collection_name) throw Error("Collection name can't be null or undefined");
    const database = await mongoose.connection.useDb(process.env.NEXT_PUBLIC_MONGODB_DATABASE!);
    const response = await database.collection(collection_name).deleteMany({});
    return {
      status: true,
      data: response,
    };
  }
}
