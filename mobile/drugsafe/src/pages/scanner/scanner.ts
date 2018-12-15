import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { QrService } from '../../providers/qr-service/qr-service';

/**
 * Generated class for the ScannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-scanner',
    templateUrl: 'scanner.html',
})
export class ScannerPage implements OnDestroy {

    private qrScannerStatus: QRScannerStatus;
    public qrinfo: any;
    private incomingdata: any;
    private scanSub: any;

    constructor(
        private alertCtrl: AlertController,
        public navCtrl: NavController,
        public navParams: NavParams,
        private qrScanner: QRScanner,
        private qrService: QrService,
        public viewCtrl: ViewController
    ) {
        // this.presentAlert("hello");
    }

    ionViewDidLoad() {
        document.body.classList.add('scanner');

        this.init();
    }

    private async init(): Promise<void> {

        try {

            this.qrScannerStatus = await this.qrScanner.prepare();


            if (this.qrScannerStatus.authorized) {
                this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
                    console.log('Scanned something', );
                    // this.presentAlert(text);
                    this.qrScanner.hide(); // hide camera preview
                    this.scanSub.unsubscribe(); // stop scanning
                    // this.presentAlert(this.loadQr(text));
                    this.qrService.getData(text).then( data => this.presentAlert(JSON.stringify(data)));

                });

                // show camera previe
                this.qrScanner.show();
            }
        } catch (err) {
            console.error(err);
        }

    }

    ngOnDestroy() {
        this.scanSub.unsubscribe();
        this.qrScanner.hide();
        this.qrScanner.destroy();
    }

    ionViewDidLeave() {
        document.body.classList.remove('scanner');
    }


    async toggleLight(): Promise<void> {

        this.qrScannerStatus = this.qrScannerStatus.lightEnabled ?
            await this.qrScanner.disableLight() :
            await this.qrScanner.enableLight();

    }
    async toggleCamera(): Promise<void> {
        this.qrScannerStatus = !!this.qrScannerStatus.currentCamera ?
            await this.qrScanner.useBackCamera() :
            await this.qrScanner.useFrontCamera();
    }

    loadQr(urltext) {
        this.incomingdata = this.qrService.getData(urltext);
        return JSON.stringify(this.incomingdata);
    }


    presentAlert(hello) {
        let alert = this.alertCtrl.create({
            title: "hello",
            subTitle: hello,
            buttons: [{
                text: 'Dismiss', handler: () => {
                    this.navCtrl.push('InfoPage', { data: hello});
                    this.viewCtrl.dismiss();
                }
            }]
        });
        alert.present();
    }
}
