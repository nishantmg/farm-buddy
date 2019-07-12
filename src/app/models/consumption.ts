export class Consumption {
    id: number;
    code: string = Math.random().toString(36).substr(2);
    animal_code: string;
    food_code: string;
    consumed_unit: string;
    consumption_amount: string;
    status: boolean = true;
    created_at?: Date = new Date();
    updated_at?: Date = new Date();
}
