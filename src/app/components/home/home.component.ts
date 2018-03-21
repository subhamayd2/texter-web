import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ContactModel } from '../../models/contact.model';
import { MessagesModel } from '../../models/messages.model';
import { MessageModel } from '../../models/message.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contacts: Array<ContactModel> = [];

  messages: Array<MessagesModel> = [];

  displayedMessage: Array<MessageModel>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.contacts = this.dataService.getContacts();
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
          this.displayedMessage = message.messages;
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
    this.displayedMessage = messages.messages;
    console.dir(this.messages);
    console.dir(this.displayedMessage);
  }
}
