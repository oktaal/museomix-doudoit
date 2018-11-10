import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoiService } from '../poi.service';

@Component({
  selector: 'dou-found',
  templateUrl: './found.component.html',
  styleUrls: ['./found.component.scss']
})
export class FoundComponent implements OnInit {
  private key: number;
  private index: number;

  public value: number;
  public showError = false;

  constructor(private router: Router, activatedRoute: ActivatedRoute, poiService: PoiService) {
    activatedRoute.paramMap.subscribe(async map => {
      this.index = parseInt(map.get('index'));
      this.key = (await poiService.get(this.index)).key;
    });
  }

  ngOnInit() {
  }

  check(notify: boolean) {
    if (this.value == this.key) {
      this.router.navigate(['/challenge', this.index])
    }
    this.showError = notify;
  }
}
