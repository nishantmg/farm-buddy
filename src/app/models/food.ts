import { FoodPricing } from './food-pricing';
export class Food {
    id: number;
    code: string = Math.random().toString(36).substr(2);
    food_name: string;
    measurement_unit: string;
    status: boolean= true;
    created_at?: Date = new Date();
    updated_at?: Date = new Date();

    foodPricing?: FoodPricing;
}
