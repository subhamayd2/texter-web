import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { SocketConstants } from './socket.constants';
import { DataService } from './data.service';


@Injectable()
export class SocketService {

  _socket: Socket;

  socketConnected: boolean = false;
  constructor(private socket: Socket, private dataService: DataService) { 
    
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
      // this.socket.on('getWebClientDetails', function (args) {
      //   _this.sendWebClientDetails();
      // })
      
    }
  }

  sendWebClientDetails() {
    let token = this.dataService.getWebClientDetails();
    console.log(token);
    this._socket.emit('sendWebClientDetails', { token: token });
  }

}
