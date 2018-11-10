import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoiService } from '../poi.service';

@Component({
  selector: 'dou-found',
  templateUrl: './found.component.html',
  styleUrls: ['./found.component.scss']
})
export class FoundComponent implements OnInit {

  constructor(activatedRoute: ActivatedRoute, poiService: PoiService) {
    activatedRoute.paramMap.subscribe(async map => {
      const index = map.get('index');
      const poi = await poiService.get(parseInt(index));
    });
  }

  ngOnInit() {
  }

  check() {

  }
}
