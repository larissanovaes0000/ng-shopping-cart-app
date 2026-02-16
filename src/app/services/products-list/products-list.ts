import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductsListService {
  private readonly API_URL = "http://localhost/api/products/";

  constructor(private http: HttpClient) {}

  getProductsList() : Observable<any> {
    return this.http.get(this.API_URL);
  }
}
