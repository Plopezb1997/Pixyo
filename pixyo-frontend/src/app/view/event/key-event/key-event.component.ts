import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VariablesService } from 'src/app/services/core/variables.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-key-event',
  templateUrl: './key-event.component.html',
  styleUrls: ['./key-event.component.scss'],
})
export class KeyEventComponent implements OnInit {
  code:string = localStorage.getItem('currentEvent');
  constructor(public variablesService: VariablesService,
    private router: Router,
    private eventService:EventService) { }

  ngOnInit() {}

  copyCode(){
    this.variablesService.cordova.plugins.clipboard.copy(this.code);
    window['plugins'].toast.showShortBottom('Código copiado');
    this.router.navigate(['/homeEvent']);
    this.eventService.retrieveUserEvents.next();
  }
}
