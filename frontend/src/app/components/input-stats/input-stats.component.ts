import {Component, inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import { SentimentEmotion } from '../../models/sentiment-emotion.model';
import { ApiService } from '../../services/api.service';
import {NgxChartsModule} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-input-stats',
  templateUrl: './input-stats.component.html',
  styleUrls: ['./input-stats.component.css'],
  imports: [
    NgxChartsModule
  ],
  standalone: true
})
export class InputStatsComponent implements OnChanges {
  @Input() currentPostId: number | undefined;

  apiService = inject(ApiService);

  emotionResult: SentimentEmotion[] = [];
  single: any[] = [];

  colorScheme = 'forest';
  showLegend = false;
  showLabels = true;


  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentPostId'] && changes['currentPostId'].currentValue) {
      const postId = changes['currentPostId'].currentValue;
      this.fetchEmotionResult(postId);
    }
  }
  fetchEmotionResult(postId: number) {
    this.apiService.getSentimentEmotions(postId).subscribe(
      emotionResponse => {
        console.log('Sentiment analysis result:', emotionResponse);
        this.emotionResult = emotionResponse;
        this.updateChartData();
      },
      error => {
        console.error('Error fetching sentiment emotions:', error);
      }
    );
  }

  updateChartData() {
    if (this.emotionResult.length > 0) {
      this.single = [
        { name: 'Sentiment Score', value: this.emotionResult[0].sentiment_score },
        { name: 'Joy Score', value: this.emotionResult[0].joy_score },
        { name: 'Sadness Score', value: this.emotionResult[0].sadness_score },
        { name: 'Anger Score', value: this.emotionResult[0].anger_score },
        { name: 'Fear Score', value: this.emotionResult[0].fear_score },
        { name: 'Disgust Score', value: this.emotionResult[0].disgust_score }
      ];
    } else {
      this.single = [];
    }
  }

  onSelect({ event }: { event: any }) {
    console.log(event);
  }
}
