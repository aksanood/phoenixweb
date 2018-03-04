import { Component, OnInit, Input } from '@angular/core';
import {Tutorial} from "shared/models/tutorial";

@Component({
  selector: 'app-tutorial-card',
  templateUrl: './tutorial-card.component.html',
  styleUrls: ['./tutorial-card.component.css']
})
export class TutorialCardComponent implements OnInit {

  @Input('tutorial') tutorial: Tutorial;

  constructor() { }

  ngOnInit() {
  }

}
