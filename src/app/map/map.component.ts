import { Component, OnInit, OnDestroy } from '@angular/core';

const lat1 = 50.46071613,
  lat2 = 50.44598825,
  lon1 = 3.93962161,
  lon2 = 3.96116511,
  y1 = 75,
  y2 = 745,
  x1 = 51,
  x2 = 682;

@Component({
  selector: 'dou-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  private watchId: number;
  private markerTop: string;
  private markerLeft: string;

  constructor() { }

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
    lat = 50.45615344, lon = 3.95258204;
    const x = this.transform(lon, lon1, lon2, x1, x2);
    const y = this.transform(lat, lat1, lat2, y1, y2);
    this.markerTop = `${y}px`;
    this.markerLeft = `${x}px`;
  }

  handlePosition(pos: Position) {
    const crd = pos.coords;
    this.showPosition(crd.latitude, crd.longitude);
  }
}
