import { instance } from "../../../toolkit/instance";

const apiClient = instance({
  baseURL: "/api/v1",
});

export class QuizService {
  static ApiEndpoint = {
    quiz: "/quiz",
  };

  static getAllQuiz() {
    return apiClient.get(this.ApiEndpoint.quiz);
  }
}
