import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { AllOrdersComponent } from 'app/admin/components/all-orders/all-orders.component';
import { ProductsFormComponent } from 'app/admin/components/products-form/products-form.component';
import { ProductsComponent } from 'app/admin/components/products/products.component';
import { AdminAuthGuardService } from 'app/admin/services/admin-auth-guard.service';
import { AuthGuardService } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([

      {path: 'admin/products/new', component: ProductsFormComponent, canActivate: [AdminAuthGuardService]},
      {path: 'admin/products/:id', component: ProductsFormComponent, canActivate: [AdminAuthGuardService]},
      {path: 'admin/products', component: ProductsComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
      {path: 'admin/all-orders', component: AllOrdersComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},

    ])
  ],
  declarations: [
    ProductsComponent,
    ProductsFormComponent,
    AllOrdersComponent
  ],
  providers: [
    AdminAuthGuardService
  ]
})
export class AdminModule { }
