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
    const audio = this.audio.nativeElement;
    if (audio) {
      audio.play();
    }
  }

  attack(weapon: 'spike' | 'sword' | 'pistol') {
    switch (weapon) {
      case 'spike':
        if (this.weaponsUsed['spike']) {
          this.planMessage('Come on, not again!');
          this.planDragonAttack('DRAGON uses EARTH ATTACK', 'It was just a tremble...');
        } else {
          this.weaponsUsed['spike'] = true;
          this.planGeorgeAttack(
            "ST.GEORGE uses SPIKE attack!",
            "It was not very effective...",
            5);
          this.planDragonAttack('DRAGON uses FIRE ATTACK', 'It was just a candle...');
        }
        break;
      case 'sword':
        if (this.weaponsUsed['sword']) {
          this.planMessage('The sword needs a rest!');
          this.planDragonAttack('DRAGON uses SHOUT ATTACK', 'It was just a whisper...');
        } else if (this.weaponsUsed['spike']) {
          this.weaponsUsed['sword'] = true;
          this.planGeorgeAttack(
            "ST.GEORGE uses SWORD attack!",
            "It was not very effective...",
            10);
        } else {
          this.planMessage('Ah, where is my sword again?');
          this.planDragonAttack('DRAGON uses WIND ATTACK', 'It was just a breeze...');
        }
        break;
      case 'pistol':
        if (this.weaponsUsed['sword'] && this.weaponsUsed['spike']) {
          this.planGeorgeAttack(
            "ST.GEORGE uses PISTOL attack!",
            "It was super effective!",
            99999)
        } else {
          this.planMessage('The gun isn\'t loaded yet!');
          this.planDragonAttack('DRAGON uses SCREAM ATTACK', 'It was just a talk...');
        }
        break;
    }
    this.nextAction();
  }

  nextAction() {
    if (this.isAttack) { return }
    const action = this.actions.shift();
    if (!action) {
      this.message = undefined;
      return;
    }
    if (action.dragonHp) {
      this.dragonHp += action.dragonHp;
      this.ngZone.run(() => {
        this.isAttack = true;
      });
      setTimeout(() => {
        this.ngZone.run(() => {
          this.isAttack = false;
          this.nextAction();
        });
      }, 1000);
    } else if (action.message) {
      this.setMessage(action.message);
    } else {
      this.message = undefined;
      return;
    }
  }

  setMessage(message: string) {
    this.message = message + " >";
    this.typingMessage = message.substr(0, 1);
  }

  planMessage(message: string) {
    this.actions.push({
      message
    });
  }

  planGeorgeAttack(message: string, resultMessage: string, hp: number) {
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
  }

  planDragonAttack(message: string, dissapointment: string) {
    this.actions.push({
      message
    }, {
        message: dissapointment
      });
  }
}
