import { NgModule } from '@angular/core';
import { SocketService } from './services/socket.service';

@NgModule({
    providers: [SocketService]
})
export class CoreModule {
    constructor(){}
}