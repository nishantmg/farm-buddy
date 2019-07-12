export class ProductPricing {
    id: number;
    code: string = Math.random().toString(36).substr(2);
    product_code: string;
    price: number = 0;
    status: boolean = true;
    created_at?: Date = new Date();
    updated_at?: Date = new Date();
}
