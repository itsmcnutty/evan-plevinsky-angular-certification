import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, Observable } from 'rxjs';
import { QuizService } from '../services/quiz.service';
import { QuestionsResponseModel } from '../models/questions-response.model';
import { CategoriesResponseModel } from '../models/categories-response.model';

@Component({
  selector: 'app-quiz-creation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-creation.component.html',
  styleUrls: ['./quiz-creation.component.scss'],
})
export class QuizCreationComponent implements OnDestroy {
  triviaCategories$: Observable<CategoriesResponseModel>;
  triviaQuestionSub$: Subscription | undefined;
  quizCreated = false;

  @Output()
  createQuizEvent = new EventEmitter<QuestionsResponseModel>();

  constructor(private quizService: QuizService) {
    this.triviaCategories$ = this.quizService.getTriviaCategories();
  }

  ngOnDestroy(): void {
    if (this.triviaQuestionSub$) {
      this.triviaQuestionSub$.unsubscribe();
    }
  }

  public createQuizForCategoryAndDifficulty(
    category: string,
    difficulty: string
  ): void {
    if (category && difficulty) {
      this.triviaQuestionSub$ = this.quizService
        .getTriviaQuestions(category, difficulty)
        .subscribe((questions) => {
          this.createQuizEvent.emit(questions);
          this.quizCreated = true;
        });
    }
  }
}
