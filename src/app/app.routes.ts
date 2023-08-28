import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { Route } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { QuizService } from './services/quiz.service';
import { QuizResultsComponent } from './quiz-results/quiz-results.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/quiz', pathMatch: 'full' },
  {
    path: 'quiz',
    component: QuizComponent,
    providers: [QuizService, importProvidersFrom(HttpClientModule)],
  },
  { path: 'results', component: QuizResultsComponent },
];
