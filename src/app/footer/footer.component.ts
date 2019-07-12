import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(
    private navController: NavController
  ) { }

  ngOnInit() {}

  navigateTab(url: string) {
    this.navController.navigateRoot(url || '/home');
  }

}
