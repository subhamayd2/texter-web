import { Injectable } from '@angular/core';
import { ContactModel } from '../models/contact.model';
import { MessagesModel } from '../models/messages.model';
import { MessageModel } from '../models/message.model';

@Injectable()
export class DummyData {

    private messagesList: Array<MessagesModel> = [];

    constructor() {
        this.generateFakeMessages();
    }

    getContactList() {
        let contacts = [];
        for (var i = 1; i <= 30; i++) {
            let contact: ContactModel = {
                id: i,
                name: `Test Contact ${i}`,
                lastMessage: `Hey this is a test message ${i}`,
                timestamp: this.randomDate(new Date(2012, 0, 1), new Date()).toString()
            }
            contacts.push(contact);
        }
        return contacts;
    }

    getMessages(contactId) {
        let messages: MessagesModel = {
            contact: null,
            messages: null
        };
        for (let message of this.messagesList) {
            if (message.contact.id == contactId) {
                messages.contact = message.contact;
                messages.messages = message.messages;
            }
        }
        return messages;
    }

    private generateFakeMessages() {
        for (var i = 1; i <= 30; i++) {
            let timestamp = this.randomDate(new Date(2018, 2, 23), new Date()).toString();
            let contact: ContactModel = {
                id: i,
                name: `Test Contact ${i}`,
                lastMessage: `Hey this is a test message ${i}`,
                timestamp: timestamp
            }
            let m: Array<MessageModel> = [];
            for (var j = 1; j <= 10; j++) {
                let t = this.randomDate(new Date(2018, 2, 23), new Date()).toString();
                let message: MessageModel = {
                    id: j,
                    message: `Hey this is a test message ${j}`,
                    timestamp: t,
                    isSelf: ((i+j) % 2 == 0)
                }
                m.push(message);
            }            
            let messages: MessagesModel = {
                contact: contact,
                messages: m
            }
            this.messagesList.push(messages);
        }
    }

    private randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
}