import { AnimalTypeComponent } from './../animal-type/animal-type.component';
import { AnimalType } from './../../models/animal-type';
import { DatabaseService } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-animaltype-add',
  templateUrl: './animaltype-add.component.html',
  styleUrls: ['./animaltype-add.component.scss'],
})
export class AnimaltypeAddComponent implements OnInit {
  // typeName: string;
  // shortName: string;
  animalType: AnimalType = new AnimalType();
  errorMsg: string;

  constructor(
    private db: DatabaseService,
    private navControl: NavController
  ) { }

  ngOnInit() {
    
  }

  onSave() {
    console.log(this.animalType);
    if(this.animalType.animal_type && this.animalType.short_name) {
      this.db.addAnimalType(this.animalType).then(res => {
        if (res) {
          this.navControl.navigateRoot('/animals/animal-type');
        }
      })
    } else {
      this.errorMsg = "Please enter valid information.";
    }
  }
}
