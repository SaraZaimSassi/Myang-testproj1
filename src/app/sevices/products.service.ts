import {Injectable}  from "@angular/core";
import {HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import { Product } from "../model/product.model";
@Injectable({providedIn:'root'})
export class ProductsService{
  constructor(private http:HttpClient) {
  }
  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>("http://localhost:3000/products");
  }
  getSelectedProducts():Observable<Product[]>{
    return this.http.get<Product[]>("http://localhost:3000/products?selected=true");
  }
  getAvailableProducts():Observable<Product[]>{
    return this.http.get<Product[]>("http://localhost:3000/products?avilable=true");
  }
  searchProducts(Keyword:string):Observable<Product[]>{
    return this.http.get<Product[]>("http://localhost:3000/products?name_like="+Keyword);
  }
  select(product:Product):Observable<Product>{
    product.selected=!product.selected;
    return this.http.put<Product>("http://localhost:3000/products/"+product.id,product);
  }
  deleteProduct(product:Product):Observable<void>{
    product.selected=!product.selected;
    return this.http.delete<void>("http://localhost:3000/products/"+product.id);
  }
  save(product:Product):Observable<Product>{
    return this.http.post<Product>("http://localhost:3000/products",product);
  }
  getProducts(id:number):Observable<Product>{
    return this.http.get<Product>("http://localhost:3000/products/"+id);
  }
  updateProducts(product:Product):Observable<Product>{
    return this.http.put<Product>("http://localhost:3000/products/"+product.id,product);
  }

}
