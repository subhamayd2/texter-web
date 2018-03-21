import { Injectable } from '@angular/core';
import { DummyData } from './DummyData';

@Injectable()
export class DataService {

  constructor(private dummyData: DummyData) { }

  getContacts() {
    return this.dummyData.getContactList();
  }

  getMessages(contactId: number) {
    return this.dummyData.getMessages(contactId);
  }

}
