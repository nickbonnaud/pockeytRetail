import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

@Injectable()
export class LayoutManagerProvider {
  private BREAKPOINT_WIDTH: number = 672;
  private width: number;
  private height: number;

	public isDualPaneLayoutSource = new BehaviorSubject<boolean>(false);
	isDualPaneLayoutSource$ = this.isDualPaneLayoutSource.asObservable();

  constructor(private screenOrientation: ScreenOrientation, private platform: Platform) {
    if (platform.isPortrait()) {
      this.width = platform.width();
      this.height = platform.height();
    } else {
      this.width = platform.height();
      this.height = platform.width();
    }
  }

  init() {
  	this.getIsDualPaneLayout();
  	this.setOrientationWatcher();
  }

  setOrientationWatcher() {
  	this.screenOrientation.onChange().subscribe(() => {
  		this.getIsDualPaneLayout();
  	});
  }

  getIsDualPaneLayout() {
    let isDualPane: boolean;
  	if (this.screenOrientation.type == (this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY || this.screenOrientation.ORIENTATIONS.PORTRAIT_SECONDARY)) {
      isDualPane = this.width > this.BREAKPOINT_WIDTH;
    } else {
      isDualPane = this.height > this.BREAKPOINT_WIDTH;
    }
  	this.setIsDualPaneLayout(isDualPane);
  }

  setIsDualPaneLayout(isDualPane: boolean) {
  	this.isDualPaneLayoutSource.next(isDualPane);
  }
}
