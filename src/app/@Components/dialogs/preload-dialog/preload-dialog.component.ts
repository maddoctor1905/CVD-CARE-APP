import {Component, OnInit} from '@angular/core';
import {MyOverlayRef} from '../../overlay/myoverlay-ref';

@Component({
  selector: 'app-preload-dialog',
  templateUrl: './preload-dialog.component.html',
  styleUrls: ['./preload-dialog.component.scss'],
})
export class PreloadDialogComponent implements OnInit {
  get isPreloadDone(): boolean {
    return this._isPreloadDone;
  }

  set isPreloadDone(value: boolean) {
    this._isPreloadDone = value;
  }

  private _isPreloadDone = false;

  constructor(private ref: MyOverlayRef) {
  }

  ngOnInit() {
  }

  close() {
    localStorage.removeItem('justUpdated');
    this.ref.close();
  }

  preloadDone() {
    this.isPreloadDone = true;
  }
}
