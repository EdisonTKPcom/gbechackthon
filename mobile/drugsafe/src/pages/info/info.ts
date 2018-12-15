import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-info',
    templateUrl: 'info.html',
})
export class InfoPage {
    data: any;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.data = JSON.parse(navParams.get('data'));
        console.log(navParams.get('data'));
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad InfoPage');
    }


}
