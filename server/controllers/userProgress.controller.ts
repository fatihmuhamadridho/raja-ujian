import { packageModel } from "../models/package.model";
import { quizModel } from "../models/quiz.model";
import { userModel } from "../models/user.model";
import { userProgressModel, userProgressModelProps } from "../models/userProgress.model";

export class UserProgressController {
  static shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  static async getAll() {
    const response = await userProgressModel
      .find({})
      .populate("user", undefined, userModel)
      .populate("package", undefined, packageModel);
    return {
      status: true,
      data: response,
    };
  }

  static async getOne({ userId, packageId }: { userId: string; packageId: string }) {
    const response = await userProgressModel
      .findOne({
        $and: [{ user: userId, package: packageId }],
      })
      .populate("package", undefined, packageModel);
    return {
      status: true,
      data: response,
    };
  }

  static async post(props: userProgressModelProps) {
    const {
      selected_answer,
      last_quiz_index,
      score_total,
      isFinished,
      user,
      package: packageId,
    } = props;
    const packageResponse: any = await packageModel.findById(packageId);
    if (!packageResponse) throw Error("Package not found");
    const quiz_order: any[] = packageResponse?.toJSON()?.quizs!;
    this.shuffleArray(quiz_order);
    const response = await userProgressModel.create({
      quiz_order,
      selected_answer,
      last_quiz_index,
      score_total,
      isFinished,
      user,
      package: packageId,
    });
    return {
      status: true,
      data: response,
      packageResponse,
      quiz_order,
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
