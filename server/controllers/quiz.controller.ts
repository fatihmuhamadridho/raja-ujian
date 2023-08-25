import { packageModel } from "../models/package.model";
import { quizModel, quizModelProps } from "../models/quiz.model";

export class QuizController {
  static async getAll() {
    const response = await quizModel.find({}).populate("package", undefined, packageModel);
    return {
      status: true,
      data: response,
    };
  }

  static async getOne() {
    return {
      status: true,
    };
  }

  static async post(props: quizModelProps) {
    const { question, multiple_choice, correct_answer, package: packageId } = props;
    const response = await quizModel.create({
      question,
      multiple_choice,
      correct_answer,
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
