import {Overlay, OverlayConfig} from '@angular/cdk/overlay';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {Injectable, Injector, TemplateRef, Type} from '@angular/core';
import {MyOverlayRef} from '../@Components/overlay/myoverlay-ref';
import {OverlayComponent} from '../@Components/overlay/overlay.component';
import {YesOrNoDialogComponent} from '../@Components/dialogs/yes-or-no-dialog/yes-or-no-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  constructor(private overlay: Overlay, private injector: Injector) {
  }

  open<R = any, T = any>(
    content: string | TemplateRef<any> | Type<any>,
    data: T,
  ): MyOverlayRef<R> {
    const configs = new OverlayConfig({
      hasBackdrop: true,
      panelClass: [],
      backdropClass: '',
    });

    const overlayRef = this.overlay.create(configs);

    const myOverlayRef = new MyOverlayRef<R, T>(overlayRef, content, data);

    const injector = this.createInjector(myOverlayRef, this.injector);
    overlayRef.attach(new ComponentPortal(OverlayComponent, null, injector));

    return myOverlayRef;
  }

  createInjector(ref: MyOverlayRef, inj: Injector) {
    const injectorTokens = new WeakMap([[MyOverlayRef, ref]]);
    return new PortalInjector(inj, injectorTokens);
  }

  openYesOrNo() {
    return this.open(YesOrNoDialogComponent, {});
  }
}
