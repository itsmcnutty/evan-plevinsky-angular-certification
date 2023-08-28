import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UnescapePipe } from '../pipes/unescape-html.pipe';
import { QuestionAnswerModel } from '../models/question-answer.model';
import { QuizStateModel } from '../models/quiz-state.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-quiz-results',
  standalone: true,
  imports: [CommonModule, UnescapePipe, RouterModule],
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss'],
})
export class QuizResultsComponent implements OnInit {
  quizAnswers: QuestionAnswerModel[] | undefined;
  correctAnswers = 0;

  constructor(private location: Location) {}

  ngOnInit() {
    const state = this.location.getState() as QuizStateModel;
    if (!_.isNil(state)) {
      const sortedQuizAnswers = state.quizAnswers.sort(
        (a, b) => a.questionId - b.questionId
      );
      this.quizAnswers = sortedQuizAnswers;

      state.quizAnswers.forEach(
        (answer) =>
          (this.correctAnswers +=
            answer.correctAnswerId === answer.answerId ? 1 : 0)
      );
    }
  }
}
