import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActionEvent, ProductActionsTypes} from "../../../state/product.state";
import {EventDiverService} from "../../../state/eventdiver.service";

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrl: './products-nav-bar.component.css'
})
export class ProductsNavBarComponent implements OnInit {

  //@Output() productEventEmitter : EventEmitter<ActionEvent> =new EventEmitter();

  constructor(private eventDrivenService:EventDiverService) {
  }
  ngOnInit() {
  }

  onGetAllProducts() {
    //this.productEventEmitter.emit({type:ProductActionsTypes.GET_ALL_PRODUCTS});
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.GET_ALL_PRODUCTS});

  }

  onGetSelectedProducts() {
    //this.productEventEmitter.emit({type:ProductActionsTypes.GET_SELECTED_PRODUCTS});
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.GET_SELECTED_PRODUCTS});

  }

  onGetAvailableProducts() {
    //this.productEventEmitter.emit({type:ProductActionsTypes.GET_AVAILABLE_PRODUCTS});
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.GET_AVAILABLE_PRODUCTS});

  }

  onNewProduct() {
    //this.productEventEmitter.emit({type:ProductActionsTypes.NEW_PRODUCT});
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.NEW_PRODUCT});

  }

  onSearch(value: any) {
    //this.productEventEmitter.emit({type:ProductActionsTypes.SEARCH_PRODUCTS, payload:value}

    //);
    this.eventDrivenService.publishEvent({type:ProductActionsTypes.SEARCH_PRODUCTS, payload:value});

  }
}
