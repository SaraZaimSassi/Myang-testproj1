import {Component, OnInit} from '@angular/core';

import {Product} from "../../model/product.model";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsTypes} from "../../state/product.state";
import {ProductsService} from "../../sevices/products.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']  // Corrected to 'styleUrls'
})
export class ProductsComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum=DataStateEnum;

  constructor(private productsService: ProductsService, private router:Router) {}

  ngOnInit(): void {

     // Ensure that the method is called to fetch products
  }

  onGetAllProducts(): void {
      console.log("start...")
    this.products$ = this.productsService.getAllProducts().pipe(
      map(data => {
        console.log(data);
        return ({dataState: DataStateEnum.LOADED, data})
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );
  }

  onGetSelectedProducts():void {
    console.log("start...")
    this.products$ = this.productsService.getSelectedProducts().pipe(
      map(data => {
        console.log(data);
        return ({dataState: DataStateEnum.LOADED, data})
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );

  }

  onGetAvailableProducts():void {
    console.log("start...")
    this.products$ = this.productsService.getAvailableProducts().pipe(
      map(data => {
        console.log(data);
        return ({dataState: DataStateEnum.LOADED, data})
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );

  }

  onSearch(dataform: any):void {
    console.log("start...")
    this.products$ = this.productsService.searchProducts(dataform.Keyword).pipe(
      map(data => {
        console.log(data);
        return ({dataState: DataStateEnum.LOADED, data})
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message }))
    );

  }

  onSelect(p: Product) {
    this.productsService.select(p).subscribe(data=>{
      p.selected=data.selected;
    })
  }

  onDelete(p: Product) {
    let v=confirm("Etes vous sure?");
    if(v==true)
    this.productsService.deleteProduct(p).subscribe(data=>{
      this.onGetAllProducts();
    })

  }

  onNewProduct() {
    this.router.navigateByUrl("/newProduct")

  }

  onEdit(p: Product) {
    this.router.navigateByUrl("/editProduct/"+p.id)


  }

  onActionEvent($event: ActionEvent) {
    switch($event.type){
      case ProductActionsTypes.GET_ALL_PRODUCTS: this.onGetAllProducts();break;
      case ProductActionsTypes.GET_AVAILABLE_PRODUCTS: this.onGetAvailableProducts();break;
      case ProductActionsTypes.GET_SELECTED_PRODUCTS: this.onGetSelectedProducts();break;
      case ProductActionsTypes.NEW_PRODUCT: this.onNewProduct();break;
      case ProductActionsTypes.SEARCH_PRODUCTS: this.onSearch($event.payload);break;
      case ProductActionsTypes.SELECT_PRODUCT: this.onSelect($event.payload);break;
      case ProductActionsTypes.DELETE_PRODUCT: this.onDelete($event.payload);break;
      case ProductActionsTypes.EDIT_PRODUCT: this.onEdit($event.payload);break;

    }


  }
}
