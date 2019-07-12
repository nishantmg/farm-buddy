import { AnimalType } from './../models/animal-type';
import { Animal } from './../models/animal';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';
import { Food } from '../models/food';
import { FoodPricing } from '../models/food-pricing';
import { ProductPricing } from '../models/product-pricing';
import { Consumption } from '../models/consumption';
import { Production } from '../models/production';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  animalTypes = new BehaviorSubject<AnimalType[]>([]);
  animals = new BehaviorSubject([]);
  products = new BehaviorSubject<Product[]>([]);
  productPricings = new BehaviorSubject<ProductPricing[]>([]);
  foods = new BehaviorSubject<Food[]>([]);
  foodPricings = new BehaviorSubject<FoodPricing[]>([]);
  consumptions = new BehaviorSubject<Consumption[]>([]);
  productions = new BehaviorSubject<Production[]>([]);

  constructor(
    private sqlitePorter: SQLitePorter,
    private sqlite: SQLite,
    private platform: Platform,
    private http: HttpClient
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'farmbuddy.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          console.log('db setup complete');
          this.database = db;
          this.fillDatabase();
        })
    })
  }

  fillDatabase() {
    this.http.get("assets/db.sql", { responseType: 'text' })
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(_ => {
            this.loadAnimalTypes();
            this.loadAnimals();
            this.loadFoods();
            this.loadFoodPricing();
            this.loadProducts();
            this.loadProductPricings();
            this.loadConsumptions();
            this.loadProductions();
            this.dbReady.next(true);
            console.log('db ready');
          })
          .catch(e => console.log(e));
      })
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getAnimalTypes(): Observable<AnimalType[]> {
    return this.animalTypes.asObservable();
  }

  getAnimals(): Observable<Animal[]> {
    return this.animals.asObservable();
  }

  getFoods(): Observable<Food[]> {
    return this.foods.asObservable();
  }

  getFoodPricing(): Observable<FoodPricing[]> {
    return this.foodPricings.asObservable();
  }

  getProducts() {
    return this.products.asObservable();
  }

  getProductPricings() {
    return this.productPricings.asObservable();
  }

  getConsumptions(): Observable<Consumption[]> {
    return this.consumptions.asObservable();
  }

  getProductions(): Observable<Production[]> {
    return this.productions.asObservable();
  }

  loadAnimalTypes() {
    return this.database.executeSql("select * from animal_types", []).then(data => {
      let animalTypes: AnimalType[] = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          animalTypes.push({
            id: data.rows.item(i).id,
            code: data.rows.item(i).code,
            animal_type: data.rows.item(i).animal_type,
            short_name: data.rows.item(i).short_name,
            status: data.rows.item(i).status,
            created_at: data.rows.item(i).created_at,
            updated_at: data.rows.item(i).updated_at
          })
        }
      }
      this.animalTypes.next(animalTypes);
      console.log('animals', this.animalTypes);
    })
  }

  loadAnimals() {
    return this.database.executeSql("select * from animals", []).then(data => {
      let animals: Animal[] = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          let animal = new Animal();
          animal.id = data.rows.item(i).id;
          animal.code = data.rows.item(i).code;
          animal.animal_type_code = data.rows.item(i).animal_type_code;
          animal.animal_name = data.rows.item(i).animal_name;
          animal.animal_number = data.rows.item(i).animal_number;
          animal.dob = data.rows.item(i).dob;
          animal.status = data.rows.item(i).status;
          animal.created_at = data.rows.item(i).created_at;
          animal.updated_at = data.rows.item(i).updated_at;
          animals.push(animal);
        }
      }
      this.animals.next(animals);
    })
  }

  loadProducts() {
    return this.database.executeSql("select * from products", []).then(data => {
      let products: Product[] = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          let product = new Product();
          product.id = data.rows.item(i).id;
          product.code = data.rows.item(i).code;
          product.animal_code = data.rows.item(i).animal_code;
          product.product_name = data.rows.item(i).product_name;
          product.short_name = data.rows.item(i).short_name;
          product.measurement_unit = data.rows.item(i).measurement_unit;
          product.status = data.rows.item(i).status;
          product.created_at = data.rows.item(i).created_at;
          product.updated_at = data.rows.item(i).updated_at;
          products.push(product);
        }
      }
      this.products.next(products);
    })
  }

  loadProductPricings() {
    return this.database.executeSql("select * from product_pricing where status = 1", []).then(data => {
      let productPricings: ProductPricing[] = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          let productPricing = new ProductPricing();
          productPricing.id = data.rows.item(i).id;
          productPricing.code = data.rows.item(i).code;
          productPricing.product_code = data.rows.item(i).product_code;
          productPricing.price = data.rows.item(i).price;
          productPricing.status = data.rows.item(i).status;
          productPricing.created_at = data.rows.item(i).created_at;
          productPricing.updated_at = data.rows.item(i).updated_at;
          productPricings.push(productPricing);
        }
      }
      this.productPricings.next(productPricings);
    })
  }

  loadFoods() {
    return this.database.executeSql("select foods.*, fp.id as fp_id, fp.code as fp_code, fp.food_code, fp.price as fp_price, fp.status as fp_status, fp.created_at as fp_created_at, fp.updated_at as updated_at from foods left join food_pricing fp on fp.food_code = foods.code", []).then(data => {
      let foods: Food[] = [];
      console.log('food data', data);
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          let food: Food = new Food();
          food.id = data.rows.item(i).id;
          food.code = data.rows.item(i).code;
          food.food_name = data.rows.item(i).food_name;
          food.measurement_unit = data.rows.item(i).measurement_unit;
          food.status = data.rows.item(i).status;
          food.created_at = data.rows.item(i).created_at;
          food.updated_at = data.rows.item(i).updated_at;

          let foodPricing: FoodPricing = new FoodPricing();
          foodPricing.code = data.rows.item(i).fp_code;
          foodPricing.food_code = food.code;
          foodPricing.price = data.rows.item(i).fp_price;
          foodPricing.status = data.rows.item(i).fp_status;
          foodPricing.created_at = data.rows.item(i).fp_created_at;
          foodPricing.updated_at = data.rows.item(i).fp_updated_at;

          food.foodPricing = foodPricing;

          foods.push(food)
        }
      }
      this.foods.next(foods);
      console.log('foods', foods);
    })
  }

  loadFoodPricing() {
    return this.database.executeSql("select * from food_pricing", []).then(data => {
      let foodPricing: FoodPricing[] = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          foodPricing.push({
            id: data.rows.item(i).id,
            code: data.rows.item(i).code,
            food_code: data.rows.item(i).food_code,
            price: data.rows.item(i).price,
            status: data.rows.item(i).status,
            created_at: data.rows.item(i).created_at,
            updated_at: data.rows.item(i).updated_at
          })
        }
      }
      this.foodPricings.next(foodPricing);
      console.log('foodpricing', this.foodPricings);
    })
  }

  loadConsumptions() {
    return this.database.executeSql("select * from consumption", []).then(data => {
      let consumptions : Consumption[] = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          let consumption = new Consumption();
          consumption.id = data.rows.item(i).id;
          consumption.code = data.rows.item(i).code;
          consumption.animal_code = data.rows.item(i).animal_code;
          consumption.food_code = data.rows.item(i).food_code;
          consumption.consumed_unit = data.rows.item(i).consumed_unit;
          consumption.consumption_amount = data.rows.item(i).consumption_amount;
          consumption.status = data.rows.item(i).status;
          consumption.created_at = data.rows.item(i).created_at;
          consumption.updated_at = data.rows.item(i).updated_at;
          consumptions.push(consumption);
        }
      }
      this.consumptions.next(consumptions);
    })
  }

  loadProductions() {
    return this.database.executeSql("select * from production", []).then(data => {
      let productions : Production[] = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          let production = new Production();
          production.id = data.rows.item(i).id;
          production.code = data.rows.item(i).code;
          production.animal_code = data.rows.item(i).animal_code;
          production.product_code = data.rows.item(i).product_code;
          production.production_unit = data.rows.item(i).production_unit;
          production.production_amount = data.rows.item(i).production_amount;
          production.status = data.rows.item(i).status;
          production.created_at = data.rows.item(i).created_at;
          production.updated_at = data.rows.item(i).updated_at;
          productions.push(production);
        }
      }
      this.productions.next(productions);
    })
  }

  addAnimalType(animalType: AnimalType) {
    let data = [animalType.code, animalType.animal_type, animalType.short_name, animalType.status, animalType.created_at, animalType.updated_at];
    return this.database.executeSql("insert into animal_types(code, animal_type, short_name, status, created_at, updated_at) values (?,?,?,?,?,?)", data).then(data => {
      this.loadAnimalTypes();
      console.log(data);
      return true;
    }).catch((err) => {
      console.log(err);
      return false;
    })
  }

  addAnimal(animal: Animal) {
    let data = [animal.code, animal.animal_type_code, animal.animal_name, animal.animal_number, animal.dob, animal.status, animal.created_at, animal.updated_at];
    return this.database.executeSql("insert into animals(code, animal_type_code, animal_name, animal_number, dob, status, created_at, updated_at) values (?,?,?,?,?,?,?,?)", data).then(data => {
      this.loadAnimals();
      return true;
    }).catch((err) => {
      console.log(err);
      return false;
    })
  }

  addFood(food: Food) {
    let data = [food.code, food.food_name, food.measurement_unit, food.status, food.created_at, food.updated_at];
    return this.database.executeSql("insert into foods(code, food_name, measurement_unit, status, created_at, updated_at) values(?,?,?,?,?,?)", data).then(data => {
      console.log("food data", data);
      this.loadFoods();
      return true;
    }).catch((err) => {
      console.log(err);
      return false;
    })
  }

  addFoodPrice(foodPricing: FoodPricing) {
    let data = [foodPricing.code, foodPricing.food_code, foodPricing.price, foodPricing.status, foodPricing.created_at, foodPricing.updated_at];
    return this.database.executeSql("insert into food_pricing(code, food_code, price, status, created_at, updated_at) values(?,?,?,?,?,?)", data).then(data => {
      this.loadFoodPricing();
      return true;
    }).catch((err) => {
      console.log(err);
      return false;
    })
  }

  addProduct(product: Product) {
    let data = [product.code, product.animal_code, product.product_name, product.short_name, product.measurement_unit, product.status, product.created_at, product.updated_at];
    return this.database.executeSql("insert into products(code, animal_code, product_name, short_name, measurement_unit, status, created_at, updated_at) values(?,?,?,?,?,?,?,?)", data).then(data => {
      this.loadProducts();
      return true;
    }).catch((err) => {
      console.log(err);
      return false;
    })
  }

  addProductPricing(productPricing: ProductPricing) {
    let data = [productPricing.code, productPricing.product_code, productPricing.price, productPricing.status, productPricing.created_at, productPricing.updated_at];
    return this.database.executeSql("insert into product_pricing(code, product_code, price, status, created_at, updated_at) values(?,?,?,?,?,?)", data).then(data => {
      this.loadProducts();
      return true;
    }).catch((err) => {
      console.log(err);
      return false;
    })
  }

  addConsumption(consumption: Consumption) {
    let data = [consumption.code, consumption.animal_code, consumption.food_code, consumption.consumed_unit, consumption.consumption_amount, consumption.status, consumption.created_at, consumption.updated_at];
    return this.database.executeSql("insert into consumption(code, animal_code, food_code,consumed_unit,consumption_amount, status, created_at, updated_at) values(?,?,?,?,?,?,?,?)", data).then(data => {
      this.loadConsumptions();
      return true;
    }).catch((err) => {
      console.log(err);
      return false;
    })
  }

  addProduction(production: Production) {
    let data = [production.code, production.animal_code, production.product_code, production.production_unit, production.production_amount, production.status, production.created_at, production.updated_at];
    return this.database.executeSql("insert into production(code, animal_code, product_code,production_unit,production_amount, status, created_at, updated_at) values(?,?,?,?,?,?,?,?)", data).then(data => {
      this.loadProductions();
      return true;
    }).catch((err) => {
      console.log(err);
      return false;
    })
  }

  deleteAnimal(code) {
    //let data = [production.code, production.animal_code, production.product_code, production.production_unit, production.production_amount, production.status, production.created_at, production.updated_at];
    return this.database.executeSql("delete from animals where code = ?", code).then(data => {
      this.loadProductions();
      return true;
    }).catch((err) => {
      console.log(err);
      return false;
    })
  }
}

