import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myfarm',
  templateUrl: './myfarm.component.html',
  styleUrls: ['./myfarm.component.scss'],
})
export class MyfarmComponent {

  constructor() { }

  ngOnInit() {
    this.useAngularLibrary();
  }

  pieChartData;
  useAngularLibrary() {
    this.pieChartData = {
      chartType: 'PieChart',
      dataTable: [
        ['Languages', 'number'],
        ['Cow',     20],
        ['Buffalo',      30],
        ['Chicken',  50]
      ],
      options: {
      'title': '',
      'width': 330,
      'height': 500
      }
    };
  }

}
