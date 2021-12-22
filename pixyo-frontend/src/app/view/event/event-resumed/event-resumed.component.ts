import { Component, Input, OnInit } from '@angular/core';
import { EventObject } from 'src/app/entities/Event';
@Component({
  selector: 'event-resumed',
  templateUrl: './event-resumed.component.html',
  styleUrls: ['./event-resumed.component.scss'],
})
export class EventResumedComponent implements OnInit {

  @Input()
  event:EventObject;

  constructor() { }

  ngOnInit() {
    console.log(JSON.stringify(this.event));
  }

}
