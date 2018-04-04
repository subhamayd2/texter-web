import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { SocketConstants } from './socket.constants';

@Injectable()
export class SocketService {

  socketConnected: boolean = false;
  constructor(private socket: Socket) { 
    let _this = this;
    if (!this.socketConnected) {
      this.socket.fromEventOnce('connect')
        .then((res) => {
          //console.log("Connected: ", res);
          _this.socketConnected = true;
        }).catch(err => console.log(err))
      let socket = this.socket.connect();
      //console.log("Socket: ", socket);
    }
  }

}
