import { Injectable } from '@angular/core';
import { DummyData } from './DummyData';
import axios from 'axios';
import { SocketConstants } from './socket.constants';

@Injectable()
export class DataService {

  constructor(private dummyData: DummyData) { }

  getContacts() {
    return this.dummyData.getContactList();
  }

  getMessages(contactId: number) {
    return this.dummyData.getMessages(contactId);
  }

  getServerConnection() {
    let status: any = {
      statusCode: 0,
      statusMessage: ''
    };
    let promise = new Promise((resolve, reject) => {
      axios.head(SocketConstants.SERVER_URL)
        .then((res) => {
          status.statusCode = res.status;
          resolve(status);
        }).catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
          reject(error);
        });
    });
    
    return promise;
  }

  setWebClientDetails(token) {
    localStorage.setItem(SocketConstants.CLIENT_DETAILS_KEY, token);
  }
  getWebClientDetails() {
    return localStorage.getItem(SocketConstants.CLIENT_DETAILS_KEY);
  }
}
