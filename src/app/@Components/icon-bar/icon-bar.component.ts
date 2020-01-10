import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-icon-bar',
  templateUrl: './icon-bar.component.html',
  styleUrls: ['./icon-bar.component.scss']
})
export class IconBarComponent implements OnInit {

  @Input() emojis: IconBarComponent[] = [];
  constructor() { }

  ngOnInit() {
  }

}
