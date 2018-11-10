import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoiService } from '../poi.service';

const lat1 = 50.46071613,
  lat2 = 50.44598825,
  lon1 = 3.93962161,
  lon2 = 3.96116511,
  y1 = 150,
  y2 = 1489,
  x1 = 102,
  x2 = 1363;

@Component({
  selector: 'dou-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  private watchId: number;
  index: number;
  markerTop: number;
  markerLeft: number;
  showMarker = false;
  instruction: string;

  constructor(activatedRoute: ActivatedRoute, poiService: PoiService) {
    activatedRoute.paramMap.subscribe(async (map) => {
      this.index = parseInt(map.get('index'));
      const poi = await poiService.get(this.index);
      // TODO: different instruction outside
      this.instruction = poi.instructionMuseum;
    })
  }

  ngOnInit() {
    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };

    this.watchId = navigator.geolocation.watchPosition(
      (pos) => this.handlePosition(pos),
      () => { },
      options);
  }

  ngOnDestroy() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  transform(x, from1, from2, to1, to2) {
    const normalized = (x - from1) / (from2 - from1);
    return (to2 - to1) * normalized + to1;
  }

  showPosition(lat, lon) {
    const x = this.transform(lon, lon1, lon2, x1, x2);
    const y = this.transform(lat, lat1, lat2, y1, y2);
    this.markerTop = y;
    this.markerLeft = x;
  }

  handlePosition(pos: Position) {
    const crd = pos.coords;
    this.showPosition(crd.latitude, crd.longitude);
    this.showMarker = true;
  }
}
