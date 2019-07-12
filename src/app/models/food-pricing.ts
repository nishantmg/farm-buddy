export class FoodPricing {
    id: number;
    code: string =Math.random().toString(36).substr(2);
    food_code: string;
    price: string;
    status: boolean = true;
    created_at?: Date = new Date();
    updated_at?: Date = new Date();
}
