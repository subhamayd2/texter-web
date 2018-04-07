import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { SocketConstants } from './socket.constants';
import { DataService } from './data.service';
import { EventsService } from 'angular4-events';


@Injectable()
export class SocketService {

  _socket: Socket;

  socketConnected: boolean = false;
  constructor(private socket: Socket, private dataService: DataService, private events: EventsService) { 
    
  }

  connect() {
    let _this = this;
    if (!this.socketConnected) {
      this.socket.fromEventOnce('connect')
        .then((res) => {
          //console.log("Connected: ", res);
          _this.socketConnected = true;
        }).catch(err => console.log(err));
      this._socket = this.socket.connect();      
    }
  }

  sendWebClientDetails() {
    let token = this.dataService.getWebClientDetails();
    console.log(token);
    this._socket.emit('sendWebClientDetails', { token: token });
    
  }

  listenToSocketEvents() {
    let _this = this;
    this.socket.on('sendSMSToWebClient', function (args) {
      _this.events.publish('event:showHome', args);
    });
  }




}
