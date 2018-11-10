import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dou-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  public showExplain = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  start() {
    this.router.navigate(['/map', 0]);
  }
}
