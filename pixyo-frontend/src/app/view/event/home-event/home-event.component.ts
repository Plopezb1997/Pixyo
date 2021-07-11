import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-event',
  templateUrl: './home-event.component.html',
  styleUrls: ['./home-event.component.scss'],
})
export class HomeEventComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  goToAddEvent(){
    this.router.navigate(['/newEvent']);
  }
  goToFindEvent(){
    this.router.navigate(['/joinEvent']);
  }

}
