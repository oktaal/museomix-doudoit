import { Component, EventEmitter, OnInit, Output, NgZone, ViewChild, ElementRef } from '@angular/core';

type DragonAttack = 'fire' | 'shout' | 'wind';
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
  dragonAttacked = false;
  georgeAttacked = false;

  start = true;
  message: string;
  typingMessage: string;
  weaponsUsed = {};

  actions: { message: string, attack?: DragonAttack, dragonHp?: number }[] = [{
    message: "DRAGON uses Fire Attack!",
    attack: 'fire'
  }, {
    message: "It missed!"
  }, {
    message: null
  }];

  // dragon actions
  dragonMouthOpen = false;
  dragonFire = false;
  dragonShout = false;
  dragonWind = false;
  dragonKO = false;

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
    setTimeout(() => {
      this.ngZone.run(() => {
        this.dragonMouthOpen = true;
      })
    }, 1100);
    setTimeout(() => {
      this.ngZone.run(() => {
        this.dragonMouthOpen = false;
      })
    }, 1550);
  }

  attack(weapon: 'spear' | 'sword' | 'pistol') {
    switch (weapon) {
      case 'spear':
        if (this.weaponsUsed['spear']) {
          this.planMessage('Come on, not again!');
          this.planDragonAttack('DRAGON uses EARTH ATTACK', 'shout', 'It was just a tremble...');
        } else {
          this.weaponsUsed['spear'] = true;
          this.planGeorgeAttack(
            "ST.GEORGE uses SPEAR attack!",
            "It was not very effective...",
            5);
          this.planDragonAttack('DRAGON uses FIRE ATTACK', 'fire', 'It was just a candle...');
        }
        break;
      case 'sword':
        if (this.weaponsUsed['sword']) {
          this.planMessage('The sword needs a rest!');
          this.planDragonAttack('DRAGON uses SHOUT ATTACK', 'shout', 'It was just a whisper...');
        } else if (this.weaponsUsed['spear']) {
          this.weaponsUsed['sword'] = true;
          this.planGeorgeAttack(
            "ST.GEORGE uses SWORD attack!",
            "It was not very effective...",
            10);
            this.planDragonAttack('DRAGON uses TORNADO ATTACK', 'wind', 'It missed!');
        } else {
          this.planMessage('Ah, where is my sword again?');
          this.planDragonAttack('DRAGON uses WIND ATTACK', 'wind', 'It was just a breeze...');
        }
        break;
      case 'pistol':
        if (this.weaponsUsed['sword'] && this.weaponsUsed['spear']) {
          this.planGeorgeAttack(
            "ST.GEORGE uses PISTOL attack!",
            "It was super effective!",
            99999);
        } else {
          this.planMessage('The gun isn\'t loaded yet!');
          this.planDragonAttack('DRAGON uses SCREAM ATTACK', 'shout', 'It was just a talk...');
        }
        break;
    }
    this.nextAction();
  }

  nextAction() {
    if (this.dragonAttacked || this.georgeAttacked) { return }
    const action = this.actions.shift();
    if (!action) {
      if (this.dragonKO) {
        this.finished.next();
      }
      this.message = undefined;
      return;
    }
    if (action.dragonHp) {
      this.dragonHp += action.dragonHp;
      this.ngZone.run(() => {
        if (this.dragonHp < 0) {
          this.dragonKO = true;
          const audio = this.audio.nativeElement;
          if (audio) {
            audio.play();
          }
        }
        this.dragonAttacked = true;
      });
      setTimeout(() => {
        this.ngZone.run(() => {
          this.dragonAttacked = false;
          this.nextAction();
        });
      }, 1000);
    } else if (action.message) {
      this.setMessage(action.message);
      switch (action.attack) {
        case 'fire':
          this.dragonFire = true;
          break;
        case 'shout':
          this.dragonShout = true;
          break;
        case 'wind':
          this.dragonWind = true;
          break;
      }
      if (action.attack) {
        this.georgeAttacked = true;
        setTimeout(() => {
          this.ngZone.run(() => {
            this.dragonShout = this.dragonFire = this.dragonWind = false;
            this.georgeAttacked = false;
          });
        }, 2000);
      }
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

  planDragonAttack(message: string, attack: DragonAttack, dissapointment: string) {
    this.actions.push({
      message,
      attack
    }, {
        message: dissapointment
      });
  }
}
