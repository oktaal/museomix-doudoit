import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'dou-dragon',
  templateUrl: './dragon.component.html',
  styleUrls: ['./dragon.component.scss']
})
export class DragonComponent implements OnInit {
  dragonHp = 1000;
  georgeHp = 100;
  start = true;
  message: string;

  @Output()
  public finished = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  bringItOn() {
    this.start = false;
  }
  attack(weapon: 'spike' | 'sword' | 'pistol') { }
}
