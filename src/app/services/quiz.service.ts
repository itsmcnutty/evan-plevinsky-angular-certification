import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CategoriesResponseModel } from '../models/categories-response.model';
import { QuizServiceConstants } from '../constants/quiz-service.constants';
import { QuestionsResponseModel } from '../models/questions-response.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  getTriviaCategories(): Observable<CategoriesResponseModel> {
    return this.http
      .get<CategoriesResponseModel>(QuizServiceConstants.QuizCategoriesUrl)
      .pipe(tap((_) => console.log('Fetched trivia categories')));
  }

  getTriviaQuestions(
    category: string,
    difficulty: string
  ): Observable<QuestionsResponseModel> {
    const questionUrl = QuizServiceConstants.QuizQuestionUrl.replace(
      QuizServiceConstants.CategoryPlaceholder,
      category
    ).replace(QuizServiceConstants.DifficultyPlaceholder, difficulty);
    return this.http
      .get<QuestionsResponseModel>(questionUrl)
      .pipe(
        tap((_) =>
          console.log(
            `Fetched trivia questions for category ${category}, difficulty ${difficulty}`
          )
        )
      );
  }
}
