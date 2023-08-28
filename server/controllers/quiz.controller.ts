import { Schema } from "mongoose";
import { packageModel } from "../models/package.model";
import { quizModel, quizModelProps } from "../models/quiz.model";

export class QuizController {
  static async getAll(query?: { package_id?: Schema.Types.ObjectId }) {
    const filter: any = {};
    if (query?.package_id) {
      filter.package = query?.package_id;
    }
    const response = await quizModel.find(filter).populate("package", undefined, packageModel);
    return {
      status: true,
      data: response,
    };
  }

  static async getOne(quiz_id: string) {
    const response = await quizModel.findById(quiz_id);
    return {
      status: true,
      data: response,
    };
  }

  static async getListPackage() {
    const response = await packageModel.find({}).select("name");
    return {
      status: true,
      data: response,
    };
  }

  static async post(props: quizModelProps) {
    const { number, question, multiple_choice, correct_answer, score, package: packageId } = props;
    const response = await quizModel.create({
      number,
      question,
      multiple_choice,
      correct_answer,
      score,
      package: packageId,
    });
    await packageModel.findByIdAndUpdate(packageId, {
      $push: { quizs: response },
    });
    return {
      status: true,
      data: response,
    };
  }

  static async update() {
    return {
      status: true,
    };
  }

  static async delete() {
    return {
      status: true,
    };
  }
}
