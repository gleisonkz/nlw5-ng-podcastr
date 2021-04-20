import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pd-pod-card',
  templateUrl: './pod-card.component.html',
  styleUrls: ['./pod-card.component.scss'],
})
export class PodCardComponent implements OnInit {
  currentDate = new Date();
  constructor() {}

  ngOnInit(): void {}
}
