import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dou-hp',
  templateUrl: './hp.component.html',
  styleUrls: ['./hp.component.scss']
})
export class HpComponent implements OnInit {
  @Input()
  public hp: number;

  constructor() { }

  ngOnInit() {
  }

}
