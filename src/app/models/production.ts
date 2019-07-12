import { Product } from './product'
export class Production {
    id: number;
    code: string = Math.random().toString(36).substr(2);
    animal_code: string;
    product_code: string;
    production_unit: string;
    production_amount :string;
    status: boolean = true;
    created_at?: Date = new Date();
    updated_at?: Date = new Date();

    product?: Product;
}
