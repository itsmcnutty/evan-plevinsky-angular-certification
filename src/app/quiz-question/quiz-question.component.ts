import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterContentInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TriviaQuestionModel } from '../models/trivia-question.model';
import { QuestionAnswerModel } from '../models/question-answer.model';
import { UnescapePipe } from '../pipes/unescape-html.pipe';
import * as _ from 'lodash';

@Component({
  selector: 'app-quiz-question',
  standalone: true,
  imports: [CommonModule, UnescapePipe],
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizQuestionComponent implements AfterContentInit {
  @Input()
  questionDetails: TriviaQuestionModel | undefined;
  @Input()
  questionId: number | undefined;

  possibleAnswers: string[] = [];
  selectedAnswer: number | undefined;

  @Output()
  answerSelectedEvent = new EventEmitter<QuestionAnswerModel>();

  ngAfterContentInit() {
    if (this.questionDetails) {
      const answerList = [
        this.questionDetails.correct_answer,
        ...this.questionDetails.incorrect_answers,
      ];
      this.possibleAnswers = _.shuffle(answerList);
    }
  }

  public selectAnswer(answerId: number): void {
    if (this.questionDetails !== undefined && this.questionId !== undefined) {
      this.selectedAnswer = answerId;
      const correctAnswer = this.questionDetails.correct_answer;
      const correctAnswerId = this.possibleAnswers.findIndex(
        (answer) => answer === correctAnswer
      );
      const questionAnswer = new QuestionAnswerModel(
        this.possibleAnswers,
        answerId,
        correctAnswerId,
        this.questionId,
        this.questionDetails.question
      );
      this.answerSelectedEvent.emit(questionAnswer);
    }
  }
}
