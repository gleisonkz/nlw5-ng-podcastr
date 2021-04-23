import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Episode } from 'src/app/models/episode.model';

@Component({
  selector: 'pd-pod-card',
  templateUrl: './pod-card.component.html',
  styleUrls: ['./pod-card.component.scss'],
})
export class PodCardComponent implements AfterViewInit {
  currentDate = new Date();
  @Input() episode: Episode;
  @Output() playEvent = new EventEmitter<Episode>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
