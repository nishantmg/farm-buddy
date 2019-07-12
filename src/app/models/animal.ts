import { AnimalType } from './animal-type';
 export class Animal {
    id: number;
    code: string = Math.random().toString(36).substr(2);
    animal_type_code: string;
    animal_name: string;
    animal_number: string;
    dob: Date;
    status: boolean = true;
    created_at?: Date = new Date();
    updated_at?: Date = new Date();
 
     animalType?: AnimalType;
 }