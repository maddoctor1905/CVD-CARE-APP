import {Subject} from 'rxjs';

import {OverlayRef} from '@angular/cdk/overlay';

import {TemplateRef, Type} from '@angular/core';

export interface OverlayCloseEvent<R> {
  type: 'backdropClick' | 'close';
  data: R;
}

export class MyOverlayRef<R = any, T = any> {
  afterClosed$ = new Subject<OverlayCloseEvent<R>>();

  constructor(
    public overlay: OverlayRef,
    public content: string | TemplateRef<any> | Type<any>,
    public data: T,
  ) {
    overlay.backdropClick().subscribe(() => this._close('backdropClick', null));
  }

  close(data?: R) {
    this._close('close', data);
  }

  private _close(type: 'backdropClick' | 'close', data: R) {
    this.overlay.dispose();
    this.afterClosed$.next({
      type,
      data,
    });

    this.afterClosed$.complete();
  }
}
