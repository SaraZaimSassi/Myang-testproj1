import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../sevices/products.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit{
  productId!:number;
  productFormGroup!:FormGroup;
  public submitted:boolean=false;


  constructor(private activatedRoute:ActivatedRoute,private productsService: ProductsService, private fb:FormBuilder) {
    this.productId=activatedRoute.snapshot.params['id'];
  }
  ngOnInit() {
    this.productsService.getProducts(this.productId)
      .subscribe(products=>{
        this.productFormGroup= this.fb.group({
          id:[products.id,Validators.required],
          name:[products.name,Validators.required],
          price:[products.price,Validators.required],
          quantity:[products.quantity,Validators.required],
          selected:[products.selected,Validators.required],
          available:[products.available,Validators.required]
        })
      });
  }

  onUpdateProduct() {
    this.productsService.updateProducts(this.productFormGroup.value)
      .subscribe(data=>{
      alert("Success Updated Product")
    });


  }
}
