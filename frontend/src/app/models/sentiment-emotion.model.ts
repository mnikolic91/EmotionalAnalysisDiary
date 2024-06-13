import { UserInput } from './user-input.model';

export interface SentimentEmotion {
  user_input: UserInput;
  sentiment_score: number;
  joy_score: number;
  sadness_score: number;
  anger_score: number;
  fear_score: number;
  disgust_score: number;
}
