import { Injectable } from '@angular/core';
import { DummyData } from './DummyData';

@Injectable()
export class DataService {

  constructor(private dummyData: DummyData) { }

  getContacts() {
    console.log("asd");
    return this.dummyData.getContactList();
  }

}
