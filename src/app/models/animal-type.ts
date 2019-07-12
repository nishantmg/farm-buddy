export class AnimalType {
    id: number;
    code: string = Math.random().toString(36).substr(2);
    animal_type: string;
    short_name: string;
    status: boolean = true;
    created_at?: Date = new Date();
    updated_at?: Date = new Date();
}
