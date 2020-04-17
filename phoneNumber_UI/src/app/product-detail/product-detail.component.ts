import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {ProductService} from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  numberType: string = '';
  phoneNumber: string = '';
  validNumber: boolean = false;
  numberList: any = [];
  pageNumber: number = 1;
  pageSize: number = 5;
  startPos: number = 0;
  endPos: number = this.pageSize;
  constructor(private _router: Router, private productService: ProductService) { }

  ngOnInit() {
  }

  validatePhone() {
    const regex7Digit = /^([0-9]{7})$/;
    const regex10Digit = /^([0-9]{10})$/;
    let isValid = false;
    if (this.numberType === '7 Digit') {
        isValid = regex7Digit.test(this.phoneNumber);
    } else {
      isValid = regex10Digit.test(this.phoneNumber);
    }
    this.validNumber = isValid;
  }

  submitNumber() {
    this.numberList = [];
    this.pageNumber = 1;
    if(this.validNumber) {
      this.getNumberList(1);
    }
  }

  redirectPage(number) {
    if (number > 0 && number <= (this.numberList.total / this.pageSize)) {
      this.startPos = number * this.pageSize;
      if(this.numberList.length < (this.startPos + this.pageSize)){
        this.endPos = this.startPos + this.pageSize;
      }else{
        this.endPos = this.numberList.length - 1;
      }
      
    } else {
      this.pageNumber = 1;
      this.startPos = 0;
      this.endPos = this.pageSize;
    }
  }

  getNumberList(page) {
    this.productService.getData(page, this.pageSize, this.phoneNumber)
    .subscribe((data) => {
        this.numberList = data;
    });
  }

  nextPage() {
    this.pageNumber++;
    this.startPos += this.pageSize;
    this.endPos += this.pageSize;
    if(this.endPos >= this.numberList.length){
      this.endPos = this.numberList.length-1;
    }
    // this.getNumberList(this.pageNumber);
  }

  prevPage() {
    this.pageNumber--;
    this.startPos -= this.pageSize;
    this.endPos -= this.pageSize;
    if(this.startPos <= 0 ){
      this.startPos = 0;
    }
    // this.getNumberList(this.pageNumber);
  }

  clearNumber() {
    this.pageNumber = 1;
    this.phoneNumber = '';
    this.numberList = [];
    this.startPos = 0;
    this.endPos = this.pageSize;
    this.validNumber = false;
  }
}
