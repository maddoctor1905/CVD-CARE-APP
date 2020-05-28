import {Component, OnInit} from '@angular/core';
import {MyOverlayRef} from '../../overlay/myoverlay-ref';

@Component({
  selector: 'app-yes-or-no-dialog',
  templateUrl: './yes-or-no-dialog.component.html',
  styleUrls: ['./yes-or-no-dialog.component.scss'],
})
export class YesOrNoDialogComponent implements OnInit {
  constructor(private ref: MyOverlayRef) {
  }

  ngOnInit() {
  }

  close(value: string) {
    this.ref.close(value);
  }

}
