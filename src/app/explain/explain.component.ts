import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'dou-explain',
  templateUrl: './explain.component.html',
  styleUrls: ['./explain.component.scss']
})
export class ExplainComponent implements OnInit {
  @Input()
  public continueText = "Continue";

  @Input()
  public title: string;

  @Input()
  public description: string;

  @Input()
  public video: string;
  
  @Output()
  public continue = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
