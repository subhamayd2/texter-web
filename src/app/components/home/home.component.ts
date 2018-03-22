import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ContactModel } from '../../models/contact.model';
import { MessagesModel } from '../../models/messages.model';
import { MessageModel } from '../../models/message.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  contacts: Array<ContactModel> = [];

  messages: Array<MessagesModel> = [];

  contactsSearchBackup: Array<ContactModel> = [];

  displayedMessage: MessagesModel;

  searchQuery: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.contacts = this.dataService.getContacts();
    this.contactsSearchBackup = this.contacts;
  }

  onContactSelect(contact: ContactModel) {
    console.dir(contact);
    if (this.messages.length == 0) {
      this.getMessagesFromServer(contact.id);
    } else {
      let messageExists = false;
      for (let message of this.messages) {
        if (message.contact.id == contact.id) {
          messageExists = true;
          this.displayedMessage = message;
        }
      }
      if (!messageExists) {
        this.getMessagesFromServer(contact.id);
      }
    }
  }

  getMessagesFromServer(id: number) {
    let messages: MessagesModel = this.dataService.getMessages(id);
    this.messages.push(messages);
    this.displayedMessage = messages;
    console.dir(this.messages);
    console.dir(this.displayedMessage);
  }

  initializeContactsFromBackup() {
    this.contacts = this.contactsSearchBackup;
  }

  startSearch(event) {
    this.initializeContactsFromBackup();
    var val = this.searchQuery;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.contacts = this.contacts.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
