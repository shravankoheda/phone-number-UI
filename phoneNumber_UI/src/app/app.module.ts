import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {ProductService} from './product.service';

var cors = require('cors');
app.use(cors());

const appRoutes: Routes = [
  { path: 'detail', component: ProductDetailComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
