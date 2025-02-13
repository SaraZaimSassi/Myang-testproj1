import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../sevices/products.service";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit {

  productFormGroup!: FormGroup;
  submitted:boolean=false;
  constructor(private fb:FormBuilder, private productService:ProductsService) {
  }
  ngOnInit() {
    this.productFormGroup=this.fb.group({
      id:["",Validators.required],
      name:["",Validators.required],
      price:[0,Validators.required],
      quantity:[0,Validators.required],
      selected:[true,Validators.required],
      available:[true,Validators.required]

    });

  }

  onSaveProduct() {
    this.submitted=true;
    if(this.productFormGroup.invalid) return;
    this.productService.save(this.productFormGroup.value)
      .subscribe(data=>{
        alert("Success Saving Product")
      })

  }
}
