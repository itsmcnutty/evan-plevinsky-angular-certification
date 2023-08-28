import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuizCreationComponent } from '../quiz-creation/quiz-creation.component';
import { QuizQuestionComponent } from '../quiz-question/quiz-question.component';
import { QuestionsResponseModel } from '../models/questions-response.model';
import { TriviaQuestionModel } from '../models/trivia-question.model';
import { QuestionAnswerModel } from '../models/question-answer.model';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, QuizCreationComponent, QuizQuestionComponent],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {
  quizQuestions: TriviaQuestionModel[] = [];
  quizAnswers: QuestionAnswerModel[] = [];

  constructor(private router: Router) {}

  public createQuiz(quizResponse: QuestionsResponseModel): void {
    this.quizQuestions = quizResponse.results;
  }

  public saveAnswerForQuestion(questionAnswer: QuestionAnswerModel): void {
    const questionIndex = this.quizAnswers.findIndex(
      (answer) => answer.questionId === questionAnswer.questionId
    );
    if (questionIndex > -1) {
      this.quizAnswers[questionIndex] = questionAnswer;
    } else {
      this.quizAnswers.push(questionAnswer);
    }
  }

  public viewQuizResults(): void {
    this.router.navigateByUrl('/results', {
      state: { quizAnswers: this.quizAnswers },
    });
  }
}
