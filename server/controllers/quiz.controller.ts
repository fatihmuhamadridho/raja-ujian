import { quizModel } from "../models/quiz.model";

export class QuizController {
  static async getAll() {
    const response = await quizModel.find({});
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

  static async post() {
    return {
      status: true,
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
