import { Injectable } from '@angular/core';

@Injectable()
export class DummyData {

    getContactList() {
        let contacts = [];
        for (var i = 1; i <= 30; i++) {
            let contact = {
                name: `Test Contact ${i}`,
                lastMessage: `Hey this is a test message ${i}`,
                timestamp: this.randomDate(new Date(2012, 0, 1), new Date()).toString()
            }
            contacts.push(contact);
        }
        return contacts;
    }

    randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
}