import { NgModule } from '@angular/core';
import { ListLayoutComponent } from './list-layout/list-layout';
import { IonicModule } from 'ionic-angular';
import { PipesModule } from '../pipes/pipes.module';
import { CustomerAboutComponent } from './customer-about/customer-about';
import { CustomerChargeComponent } from './customer-charge/customer-charge';
import { CustomerPagerComponent } from './customer-pager/customer-pager';
import { ViewedPostComponent } from './viewed-post/viewed-post';
import { LastTransactionComponent } from './last-transaction/last-transaction';
import { GridLayoutComponent } from './grid-layout/grid-layout';
@NgModule({
	declarations: [ListLayoutComponent,
    CustomerAboutComponent,
    CustomerChargeComponent,
    CustomerPagerComponent,
    ViewedPostComponent,
    LastTransactionComponent,
    GridLayoutComponent],
	imports: [IonicModule, PipesModule],
	exports: [ListLayoutComponent,
    CustomerAboutComponent,
    CustomerChargeComponent,
    CustomerPagerComponent,
    ViewedPostComponent,
    LastTransactionComponent,
    GridLayoutComponent]
})
export class ComponentsModule {}
