export enum QuizServiceConstants {
  QuizCategoriesUrl = 'https://opentdb.com/api_category.php',
  QuizQuestionUrl = 'https://opentdb.com/api.php?amount=5&category={category}&difficulty={difficulty}&type=multiple',
  CategoryPlaceholder = '{category}',
  DifficultyPlaceholder = '{difficulty}',
}
