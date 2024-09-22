import {Component, inject, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NgxChartsModule} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-emotion-stats-modal',
  standalone: true,
  imports: [
    NgxChartsModule
  ],
  templateUrl: './emotion-stats-modal.component.html',
})
export class EmotionStatsModalComponent implements OnInit {
  activeModal = inject(NgbActiveModal);

  @Input() sentimentLabel: string = '';
  @Input() sentimentScore: number = 0;
  @Input() emotionData: any[] = [];
  @Input() fullText: string = '';

  ngOnInit(): void {
  }
}
