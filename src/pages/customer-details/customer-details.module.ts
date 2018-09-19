import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerDetailsPage } from './customer-details';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CustomerDetailsPage,
  ],
  imports: [
  	ComponentsModule,
    IonicPageModule.forChild(CustomerDetailsPage),
  ],
})
export class CustomerDetailsPageModule {}
