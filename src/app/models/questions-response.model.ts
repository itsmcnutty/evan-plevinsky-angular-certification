import { TriviaQuestionModel } from './trivia-question.model';

export interface QuestionsResponseModel {
  response_code: number;
  results: TriviaQuestionModel[];
}
