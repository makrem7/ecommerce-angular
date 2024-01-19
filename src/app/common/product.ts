import { ProductCategory } from "./product-category";

export class Product {
    constructor(
      public id: number,
      public category: ProductCategory,
      public sku: string,
      public name: string,
      public description: string,
      public unitPrice: number,
      public imageUrl: string,
      public active: boolean,
      public unitsInStock: number,
      public dateCreated: Date,
      public lastUpdated: Date
    ) {}
  }

  