import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { AnimalType } from '../../models/animal-type';
import { Animal } from '../../models/animal';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss'],
})
export class AnimalComponent implements OnInit {
  animalTypes: AnimalType[] = [];
  animals: Animal[] = [];

  constructor(
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if(rdy) {
        this.db.getAnimalTypes().subscribe(animalTypes => {
          this.animalTypes = animalTypes;
        });
        this.db.getAnimals().subscribe(animals => {
          this.animals = animals;
        })
      }
    })
  }

  getAnimalType(animal) {
    let animalType = this.animalTypes.find(animalType => animalType.code === animal.animal_type_code) || null;
    animal.animalType = animalType;
    return animalType ? animalType.animal_type : '';
  }
  // onSave(code) {
  //   this.db.getDatabaseState().subscribe(rdy => {
  //       this.db.deleteAnimal(code);
  //     }
  //   }
}
