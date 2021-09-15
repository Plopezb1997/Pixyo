import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
})
export class EditEventComponent implements OnInit {
  eventId:string;
  constructor(private route: RouterLink) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.eventId = params['id'];
    });
  }
}
