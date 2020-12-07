import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nd-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  public pageTitle = 'NgRx - Movies demo page';

  constructor() { }

  ngOnInit(): void {
  }

}
