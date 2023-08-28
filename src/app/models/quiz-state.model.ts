import { QuestionAnswerModel } from './question-answer.model';

export interface QuizStateModel {
  quizAnswers: QuestionAnswerModel[];
  navigationId: number;
}
