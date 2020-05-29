import {Component, OnInit} from '@angular/core';
import {MyOverlayRef} from '../../overlay/myoverlay-ref';

@Component({
  selector: 'app-yes-or-no-dialog',
  templateUrl: './list-dialog.component.html',
  styleUrls: ['./list-dialog.component.scss'],
})
export class ListDialogComponent implements OnInit {
  list: { value: string; selected?: boolean; }[] = [];
  mode: ('radio' | 'checkbox') = 'radio'
  currentItem;

  constructor(private ref: MyOverlayRef) {
    this.list = ref.data.list || [];
    this.mode = ref.data.mode || 'radio';
  }

  ngOnInit() {
  }

  close(value: string) {
    this.ref.close(value);
  }

  onRadioChange(item: { value: string; selected?: boolean }) {
    this.currentItem = item;
  }

  submit() {
    if (this.mode === 'radio') {
      this.ref.close(this.currentItem);
    } else {
      this.ref.close(this.getAllSelected());
    }
  }

  getAllSelected() {
    return this.list.filter((value) => {
      return (value.selected === true);
    });
  }
}
