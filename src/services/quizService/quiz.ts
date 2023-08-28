import { quizModelProps } from "../../../server/models/quiz.model";
import { instance } from "../../../toolkit/instance";

const apiClient = instance({
  baseURL: "/api/v1",
});

export class QuizService {
  static ApiEndpoint = {
    quiz: "/quiz",
    list_package: "/quiz/list_package",
  };

  static getAllQuiz() {
    return apiClient.get(this.ApiEndpoint.quiz);
  }

  static getOneQuiz(quiz_id: string) {
    if (quiz_id === "undefined") return undefined;
    return apiClient
      .get(this.ApiEndpoint.quiz + `/${quiz_id}`)
      .catch((error: any) => console.clear());
  }

  static getQuizListPackage() {
    return apiClient.get(this.ApiEndpoint.list_package);
  }

  static postQuiz(payload: quizModelProps) {
    return apiClient.post(this.ApiEndpoint.quiz, payload);
  }
}
