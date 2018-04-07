import { Component, OnInit } from '@angular/core';
import * as Fingerprint2 from 'fingerprintjs2';
import * as QRCode from 'qrcode';
import { UUID } from 'angular2-uuid';
import { SocketService } from '../../services/socket.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { EventsService } from 'angular4-events';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  Fingerprint = null;
  qrImageSrc = null;

  constructor(
    private socketService: SocketService,
    private dataService: DataService,
    private router: Router,
    private events: EventsService
  ) { }

  ngOnInit() {
    let _this = this;
    this.dataService.getServerConnection()
      .then((status) => {
        if (status['statusCode'] == 200) {
          setTimeout(function () {
            _this.generateQR();
            _this.socketService.connect();
          }, 500);
        }
      });
    
    this.events.subscribe('event:showHome')
     
  }

  async generateQR() {
    let _this = this;
    if (this.Fingerprint == null) {
      this.Fingerprint = new Fingerprint2();
    }
    this.Fingerprint.get(function (result, components) {
      //console.log("First: ", result);
      _this.convertToQR(result);
    });

    setInterval(() => {
      _this.Fingerprint.get(function (result, components) {
        //console.log(result);
        _this.convertToQR(result);
      });
    }, 3600 * 1000);

  }

  async convertToQR(text) {
    let _this = this;
    text += "|" + UUID.UUID();
    this.dataService.setWebClientDetails(text);
    this.socketService.sendWebClientDetails();
    let opts = {
      width: 250,
      color: {
        dark: '#0d87d9ff'
      }
    }
    QRCode.toDataURL(text, opts)
      .then(url => {
        _this.qrImageSrc = url;
      })
      .catch(err => {
        console.error(err)
      })
  }

}
