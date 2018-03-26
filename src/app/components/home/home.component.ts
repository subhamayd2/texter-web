import { Component, OnInit, ViewEncapsulation, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { DataService } from '../../services/data.service';
import { ContactModel } from '../../models/contact.model';
import { MessagesModel } from '../../models/messages.model';
import { MessageModel } from '../../models/message.model';
import { NgxAutoScroll } from "ngx-auto-scroll";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('itemRemove', [
      state('*', style({
        transform: 'translateX(0)',
        opacity: '1'
      })),
      state('void', style({
        transform: 'translateX(-50%)',
        opacity: '0'
      })),

      transition('* => void', animate('200ms ease-in')),
      transition('void => *', animate('200ms ease-in'))

    ])
  ]
})
export class HomeComponent implements OnInit {

  @ViewChild('scrollMessage') ngxAutoScroll: NgxAutoScroll;

  /* @ViewChild('textPaneScroll') private textPaneScroll: ElementRef;

  disableScrollDown = false; */

  contacts: Array<ContactModel> = [];

  messages: Array<MessagesModel> = [];

  contactsSearchBackup: Array<ContactModel> = [];

  displayedMessage: MessagesModel;

  searchQuery: string = null;


  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.contacts = this.dataService.getContacts();
    this.contactsSearchBackup = this.contacts;
  }

  /* ngAfterViewChecked() {
    this.scrollToBottom();
  } */

  private forceScrollDown(): void {
    this.ngxAutoScroll.forceScrollDown();
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
    //this.forceScrollDown();
  }

  getMessagesFromServer(id: number) {
    let messages: MessagesModel = this.dataService.getMessages(id);
    messages.messages.sort((m1: MessageModel, m2: MessageModel) => {
      let d1 = new Date(m1.timestamp);
      let d2 = new Date(m2.timestamp);
      if (d1 == d2) return 0;
      else if (d1 > d2) return 1;
      else return -1;
    })
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

  clearSearch(event) {
    this.initializeContactsFromBackup();
    this.searchQuery = '';
  }

  /* private onScroll() {
    let element = this.textPaneScroll.nativeElement
    let atBottom = element.scrollHeight - element.scrollTop === element.clientHeight
    if (this.disableScrollDown && atBottom) {
      this.disableScrollDown = false
    } else {
      this.disableScrollDown = true
    }
  }


  private scrollToBottom(): void {
    
     if (this.disableScrollDown) {
      return
    } 
    try {
      this.textPaneScroll.nativeElement.scrollTop = this.textPaneScroll.nativeElement.scrollHeight;
    } catch (err) { }
  } */
}
