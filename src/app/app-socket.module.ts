import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { BrowserModule } from '@angular/platform-browser';
import { SocketConstants } from './services/socket.constants';

const config: SocketIoConfig = {
    url: SocketConstants.SERVER_URL,
    options: {
        autoConnect: false,
        query: {
            clientType: SocketConstants.CLIENT_WEB
        }
    }
};

@NgModule({
    imports: [
        BrowserModule,
        SocketIoModule.forRoot(config)
    ]
})
export class AppSocketModule { }
