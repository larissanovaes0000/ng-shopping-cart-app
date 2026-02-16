import { Injectable } from '@angular/core';
import { ProductsDataService } from '@services/products-data-service/products-data.service';

@Injectable()
export class ProductsService {
  constructor(
    protected dataService: ProductsDataService,
  ) {
  }

  fetchAll() {
    return this.dataService.fetchAll();
  }
}
