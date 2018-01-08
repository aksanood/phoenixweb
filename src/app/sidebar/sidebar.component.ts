import { Component, OnInit , ViewChild } from '@angular/core';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  constructor() { }

  ngOnInit() {
  }

  sidebarOpen() {
    console.log('Sidebar is open');
  }

  close() {
    this.sidenav.close();
  }
}
