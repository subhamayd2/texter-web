import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contacts = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.contacts = this.dataService.getContacts();
  }

}
