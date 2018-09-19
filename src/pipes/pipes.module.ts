import { NgModule } from '@angular/core';
import { FromNowPipe } from './from-now/from-now';
import { LimitPipe } from './limit/limit';
@NgModule({
	declarations: [FromNowPipe,
    LimitPipe],
	imports: [],
	exports: [FromNowPipe,
    LimitPipe]
})
export class PipesModule {}
