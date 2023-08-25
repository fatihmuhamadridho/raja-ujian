import { packageModel, packageModelProps } from "../models/package.model";
import { quizModel } from "../models/quiz.model";

export class PackageController {
  static async getAll() {
    const response = await packageModel.find({});
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

  static async post(props: packageModelProps) {
    const { name, group, quizs } = props;
    const response = await packageModel.create({ name, group, quizs });
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
