import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StarRatingModule } from 'angular-star-rating';
import { CheckOutComponent } from 'app/marketplace/components/check-out/check-out.component';
import { MarketplaceComponent } from 'app/marketplace/components/marketplace/marketplace.component';
import { OrderSuccessComponent } from 'app/marketplace/components/order-success/order-success.component';
import { OrderSummaryComponent } from 'app/marketplace/components/order-summary/order-summary.component';
import { ProductFilterComponent } from 'app/marketplace/components/product-filter/product-filter.component';
import { ProductViewComponent } from 'app/marketplace/components/product-view/product-view.component';
import { ShippingFormComponent } from 'app/marketplace/components/shipping-form/shipping-form.component';
import { ShoppingCartComponent } from 'app/marketplace/components/shopping-cart/shopping-cart.component';
import { MatComponentsModule } from 'app/mat-components.module';
import { AuthGuardService } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: 'marketplace', component: MarketplaceComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
      {path: 'product-view/:id', component: ProductViewComponent},
      {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService]},
      {path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuardService]},
    ])
  ],
  declarations: [
    MarketplaceComponent,
    ProductFilterComponent,
    ProductViewComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    OrderSummaryComponent,
    ShippingFormComponent,
  ]
})
export class MarketplaceModule { }
