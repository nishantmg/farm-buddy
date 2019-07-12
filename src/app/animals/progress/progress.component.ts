import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit {
  max: number = 100;
  current: number = 60;


  constructor() { }

  ngOnInit() {}

  onRender(event) {
    
  }
}
