import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PoiService } from '../poi.service';

@Component({
  selector: 'dou-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {
  public index: number;
  public continueText = "Continue";
  public gameFinished = false;
  public title: string;
  public description: string;

  constructor(private router: Router, activatedRoute: ActivatedRoute, poiService: PoiService) {
    activatedRoute.paramMap.subscribe(async map => {
      this.index = parseInt(map.get('index'));
      const poi = await poiService.get(this.index);
      this.title = poi.explain.title;
      this.description = poi.explain.description;
      this.gameFinished = this.index == poi.total - 1;
      this.continueText = !this.gameFinished ? "Continue" : "Start over";
    });
  }

  ngOnInit() {
  }

  continue() {
    if (this.gameFinished) {
      this.router.navigate(['/']);

    } else {
      this.router.navigate(['/map', this.index + 1]);
    }
  }
}
