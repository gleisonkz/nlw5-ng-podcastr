import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Episode } from 'src/app/models/episode.model';

@Component({
  selector: 'pd-pod-card',
  templateUrl: './pod-card.component.html',
  styleUrls: ['./pod-card.component.scss'],
})
export class PodCardComponent implements OnInit, AfterViewInit {
  currentDate = new Date();
  @Input() episode: Episode;
  @Output() playEvent = new EventEmitter<Episode>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
