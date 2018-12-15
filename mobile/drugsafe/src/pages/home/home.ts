import { Component } from '@angular/core';
import { CertificatePage } from '../certificate/certificate';
import { NavController, AlertController, LoadingController , ViewController} from 'ionic-angular';
import { QrService } from '../../providers/qr-service/qr-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    // incomingdata: any;
    constructor(public navCtrl: NavController, private alertCtrl: AlertController, private qrService: QrService, public loadingController: LoadingController, public viewCtrl: ViewController) {
        // this.incomingdata = this.loadQr('https://edisontkp.com/api/tchain/qrcode?id=1000');
        // this.presentAlert(this.incomingdata);
        // console.log(this.incomingdata);
    }

    goScanner(): void {
        this.navCtrl.push('ScannerPage');
    }

    loadQr(urltext) {
        // this.qrService.getData(urltext).subscribe(res => {
        //     this.incomingdata = res;
        // })
        
       let incomingdata = this.qrService.getData(urltext);
        console.log("incomingdata loadqr", incomingdata);
        return JSON.stringify(incomingdata);
    }

    qrscanner() {
        this.loadingController.create({
            content: 'Please wait...',
            duration: 3000,
            dismissOnPageChange: true
        }).present();
        this.navCtrl.push(CertificatePage, {
            param1: 'fromLogin'
        });
        this.viewCtrl.dismiss();
    }
}
