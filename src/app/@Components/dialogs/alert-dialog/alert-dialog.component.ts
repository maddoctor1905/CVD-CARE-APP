import {Component, Input, OnInit} from '@angular/core';
import {MyOverlayRef} from '../../overlay/myoverlay-ref';

@Component({
  selector: 'app-yes-or-no-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss'],
})
export class AlertDialogComponent implements OnInit {
  @Input() emoji: string;
  @Input() status: string;
  @Input() title: string;
  @Input() message: string;

  constructor(private ref: MyOverlayRef) {
    this.emoji = ref.data?.emoji;
    this.status = ref.data?.status;
    this.title = ref.data?.title;
    this.message = ref.data?.message;
  }

  ngOnInit() {
  }

  close() {
    this.ref.close();
  }

}
