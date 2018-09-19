import { Component, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LayoutManagerProvider } from '../../providers/layout-manager/layout-manager';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private isSplitPane: boolean;
  private splitPaneWatcher: Subscription;
  private alive: boolean

  constructor(private layoutManager: LayoutManagerProvider, private changeRef: ChangeDetectorRef) {
    this.alive = true;
  }

  ngOnInit() {
    this.setShouldShowSplitPane();
  }

  setShouldShowSplitPane() {
    this.splitPaneWatcher = this.layoutManager.isDualPaneLayoutSource$.takeWhile(() => this.alive).subscribe((isSplitPane: boolean) => {
      this.isSplitPane = isSplitPane;
    })
  }

  ngOnDestroy() {
    this.alive = false;
    this.splitPaneWatcher.unsubscribe();
  }

}
