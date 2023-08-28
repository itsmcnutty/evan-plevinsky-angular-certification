export class QuestionAnswerModel {
  questionId: number;
  question: string;
  possibleAnswers: string[];
  answerId: number;
  correctAnswerId: number;

  constructor(
    possibleAnswers: string[],
    answerId: number,
    correctAnswerId: number,
    questionId: number,
    question: string
  ) {
    this.possibleAnswers = possibleAnswers;
    this.answerId = answerId;
    this.correctAnswerId = correctAnswerId;
    this.questionId = questionId;
    this.question = question;
  }
}
