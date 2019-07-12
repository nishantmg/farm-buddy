import { AnimalType } from './../../models/animal-type';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Animal } from './../../models/animal';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-animal-add',
  templateUrl: './animal-add.component.html',
  styleUrls: ['./animal-add.component.scss'],
})
export class AnimalAddComponent implements OnInit {
  animalTypes: AnimalType[];
  animal: Animal = new Animal();
  errorMsg: string;

  constructor(
    private db: DatabaseService,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if(rdy) {
        this.db.getAnimalTypes().subscribe(animalTypes => {
          this.animalTypes = animalTypes;
        })
      }
    })
  }

  onSave() {
    console.log(this.animal);
    if(this.animal.animal_type_code && this.animal.animal_name && this.animal.animal_number) {
      this.db.addAnimal(this.animal).then(res => {
        if(res) {
          this.navController.navigateRoot('/animals/animal');
        }
      })
    } else {
      this.errorMsg = "Please enter valid information.";
    }
  }

}
