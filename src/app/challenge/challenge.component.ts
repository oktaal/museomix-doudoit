import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PoiService } from '../poi.service';

@Component({
  selector: 'dou-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {
  public index: number;

  constructor(private router: Router, activatedRoute: ActivatedRoute, poiService: PoiService) {
    activatedRoute.paramMap.subscribe(async map => {
      this.index = parseInt(map.get('index'));
    });
  }

  ngOnInit() {
  }

  finished() {
    this.router.navigate(['/reward', this.index]);
  }
}
