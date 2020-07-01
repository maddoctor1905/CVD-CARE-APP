import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IconBarElement} from './icon-bar.model';

@Component({
  selector: 'app-icon-bar',
  templateUrl: './icon-bar.component.html',
  styleUrls: ['./icon-bar.component.scss']
})
export class IconBarComponent implements OnInit {

  @Input() emojis: IconBarElement[] = [];
  @Output() itemClicked: EventEmitter<IconBarElement> = new EventEmitter<IconBarElement>();
  constructor() { }

  ngOnInit() {
  }

  itemClickedToggle(item: any) {
    item.active = !item.active;
    this.itemClicked.emit(item);
  }
}
