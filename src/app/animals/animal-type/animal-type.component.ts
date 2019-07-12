import { DatabaseService } from './../../services/database.service';
import { AnimalType } from './../../models/animal-type';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animal-type',
  templateUrl: './animal-type.component.html',
  styleUrls: ['./animal-type.component.scss'],
})
export class AnimalTypeComponent implements OnInit {
  animalTypes: AnimalType[];

  constructor(
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getAnimalTypes().subscribe(animalTypes => {
          this.animalTypes = animalTypes;
        })
      }
    })
  }

}
