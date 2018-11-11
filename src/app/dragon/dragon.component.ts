import { Component, EventEmitter, OnInit, Output, NgZone, ViewChild, ElementRef, OnDestroy } from '@angular/core';

type DragonAttack = 'fire' | 'shout' | 'wind';
type GeorgeAttack = 'spear' | 'sword' | 'pistol';
@Component({
  selector: 'dou-dragon',
  templateUrl: './dragon.component.html',
  styleUrls: ['./dragon.component.scss']
})
export class DragonComponent implements OnInit, OnDestroy {
  dragonHp = 9999;
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

  actions: {
    message: string,
    dragonAttacks?: DragonAttack,
    dragonHp?: number,
    georgeAttacks?: GeorgeAttack
  }[] = [{
    message: "DRAGON uses Fire Attack!",
    dragonAttacks: 'fire'
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

  // George actions
  georgeSurprised = false;
  georgeLeft = false;
  georgePistol = false;
  georgePistolAttack = false;
  georgeSpear = false;
  georgeSpearAttack = false;
  georgeSword = false;
  georgeSwordAttack = false;
  georgeWon = false;
  georgeWonLeft = false;

  winInterval: any;

  private oldBodyOverflow: string;

  @Output()
  public finished = new EventEmitter();

  @ViewChild('audio')
  public audio: ElementRef<HTMLAudioElement>;

  @ViewChild('pistolAudio')
  public pistolAudio: ElementRef<HTMLAudioElement>;

  @ViewChild('applause')
  public applause: ElementRef<HTMLAudioElement>;

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
    this.oldBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const audio = this.audio.nativeElement;
    if (audio) {
      audio.play();
    }
  }

  ngOnDestroy() {
    document.body.style.overflow = this.oldBodyOverflow;
    clearInterval(this.winInterval);
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
        this.georgeSurprised = true;
      })
    }, 1100);
    setTimeout(() => {
      this.ngZone.run(() => {
        this.dragonMouthOpen = false;
        this.georgeSurprised = false;
      })
    }, 1550);
  }

  attack(weapon: GeorgeAttack) {
    switch (weapon) {
      case 'spear':
        if (this.weaponsUsed['spear']) {
          this.planMessage('Come on, not again!');
          this.planDragonAttack('DRAGON uses EARTH ATTACK', 'shout', 'It was just a tremble...');
        } else {
          this.weaponsUsed['spear'] = true;
          this.planGeorgeAttack(
            "ST.GEORGE uses SPEAR attack!",
            'spear',
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
            'sword',
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
            'pistol',
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
      this.animateGeorgeAttack(action.georgeAttacks);
      this.dragonHp += action.dragonHp;
      this.ngZone.run(() => {
        if (this.dragonHp < 0) {
          setTimeout(() => {
            this.ngZone.run(() => {
              this.dragonKO = true
            });
          }, 400);
          setTimeout(() => {
            this.ngZone.run(() => {
              this.georgeWon = true;
            });
            this.winInterval = setInterval(() => {
              this.ngZone.run(() => {
                this.georgeWon = !this.georgeWon;
                this.georgeWonLeft = !this.georgeWonLeft;
              })
            }, 400);
          }, 800);
          const audio = this.audio.nativeElement;
          if (audio) {
            audio.pause();
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
      switch (action.dragonAttacks) {
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
      if (action.dragonAttacks) {
        this.georgeAttacked = true;
        this.animateGeorgeEvade();
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

  private animateGeorgeAttack(attack: GeorgeAttack) {
    switch (attack) {
      case 'spear':
        this.georgeSpear = true;
        this.ngTimeout(() => {
          this.georgeSpear = false;
          this.georgeSpearAttack = true;
        }, 300);
        this.ngTimeout(() => {
          this.georgeSpearAttack = false;
        }, 1000);
        break;
      case 'sword':
        this.georgeSword = true;
        this.ngTimeout(() => {
          this.georgeSword = false;
          this.georgeSwordAttack = true;
        }, 300);
        this.ngTimeout(() => {
          this.georgeSwordAttack = false;
        }, 1000);
        break;
      case 'pistol':
        this.georgePistol = true;
        const pistolAudio = this.pistolAudio.nativeElement;
        if (pistolAudio) {
          pistolAudio.play();
        }
        this.ngTimeout(() => {
          this.georgePistol = false;
          this.georgePistolAttack = true;
        }, 300);
        this.ngTimeout(() => {
          this.georgePistolAttack = false;
          const applause = this.applause.nativeElement;
          if (applause) {
            applause.play();
          }
        }, 1000);
        break;
    }
  }

  private animateGeorgeEvade() {
    this.georgeSurprised = true;
    this.ngTimeout(() => {
      this.georgeSurprised = false;
      this.georgeLeft = true;
    }, 300);
    this.ngTimeout(() => {
      this.georgeLeft = false;
    }, 1000);
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

  planGeorgeAttack(message: string, attack: GeorgeAttack, resultMessage: string, hp: number) {
    this.actions.push({
      message
    });
    this.actions.push({
      message: '',
      georgeAttacks: attack,
      dragonHp: -hp
    });
    this.actions.push({
      message: resultMessage
    });
  }

  planDragonAttack(message: string, attack: DragonAttack, dissapointment: string) {
    this.actions.push({
      message,
      dragonAttacks: attack
    }, {
        message: dissapointment
      });
  }

  private ngTimeout(callback: () => void, ms: number) {
    setTimeout(() => { this.ngZone.run(callback) }, ms);
  }
}
