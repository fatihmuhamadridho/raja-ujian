import { packageModel } from "../models/package.model";
import { userModel } from "../models/user.model";
import { userProgressModel, userProgressModelProps } from "../models/userProgress.model";

export class UserProgressController {
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
    const response = await userProgressModel.findOne({
      $and: [{ user: userId, package: packageId }],
    });
    return {
      status: true,
      data: response,
    };
  }

  static async post(props: userProgressModelProps) {
    const { last_quiz_number, score_total, isFinished, user, package: packageId } = props;
    const response = await userProgressModel.create({
      last_quiz_number,
      score_total,
      isFinished,
      user,
      package: packageId,
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
