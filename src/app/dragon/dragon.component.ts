import { Component, EventEmitter, OnInit, Output, NgZone, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'dou-dragon',
  templateUrl: './dragon.component.html',
  styleUrls: ['./dragon.component.scss']
})
export class DragonComponent implements OnInit {
  dragonHp = 1000;
  georgeHp = 100;

  /**
   * Fight animation!
   */
  isAttack = false;
  start = true;
  message: string;
  typingMessage: string;
  weaponsUsed = {};

  actions: { message: string, dragonHp?: number }[] = [{
    message: "DRAGON uses Fire Attack!"
  }, {
    message: "It missed!"
  }, {
    message: null
  }];

  @Output()
  public finished = new EventEmitter();

  @ViewChild('audio')
  public audio: ElementRef<HTMLAudioElement>;

  constructor(private ngZone: NgZone) {
    setInterval(() => {
      ngZone.run(() => {
        if (this.message && this.message != this.typingMessage) {
          this.typingMessage = this.message.substr(0, this.typingMessage.length + 1);
        }
      });
    }, 50);
  }

  ngOnInit() {
    const audio = this.audio.nativeElement;
    if (audio) {
      audio.play();
    }
  }

  bringItOn() {
    this.start = false;
    this.setMessage("DRAGON appears!");
  }

  attack(weapon: 'spike' | 'sword' | 'pistol') {
    switch (weapon) {
      case 'spike':
        this.weaponsUsed['spike'] = true;
        this.setGeorgeAttack(
          "ST.GEORGE uses SPIKE attack!",
          "It was not very effective...",
          5);
        break;
      case 'sword':
        if (this.weaponsUsed['spike']) {

        } else {
          this.setMessage('Ah, where is my sword again?');
          this.setDragonAttack('DRAGON uses WIND ATTACK', 'It was just a breeze...');
        }
        break;
      case 'pistol':
        break;
    }
  }

  nextAction() {
    if (this.isAttack) { return }
    const action = this.actions.shift();
    if (action.dragonHp) {
      this.dragonHp += action.dragonHp;
      this.isAttack = true;
      setTimeout(() => {
        this.ngZone.run(() => {
          this.isAttack = false;
        }, 200);
      });
    } else if (action.message) {
      this.setMessage(action.message);
    } else {
      this.message = undefined;
    }
  }

  setMessage(message: string) {
    this.message = message + " >";
    this.typingMessage = message.substr(0, 1);
  }

  setGeorgeAttack(message: string, resultMessage: string, hp: number) {
    this.actions.push({
      message
    });
    this.actions.push({
      message: '',
      dragonHp: -hp
    });
    this.actions.push({
      message: resultMessage
    });
    this.nextAction();
  }

  setDragonAttack(message: string, dissapointment: string) {
    this.actions.push({
      message
    }, {
        message: dissapointment
      });
    this.nextAction();
  }
}
