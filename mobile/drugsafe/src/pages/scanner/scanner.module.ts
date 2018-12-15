import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScannerPage } from './scanner';
import { QRScanner } from '@ionic-native/qr-scanner';

@NgModule({
  declarations: [
    ScannerPage,
  ],
  imports: [
    IonicPageModule.forChild(ScannerPage),
  ],
  providers:[
    QRScanner
  ]
})
export class ScannerPageModule {}
