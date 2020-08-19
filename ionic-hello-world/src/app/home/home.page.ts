import { Component } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  items = [];
  photo: string;
  location: string;

  constructor(private http: HttpClient, private alertCtrl: AlertController, private modalCtrl: ModalController) {

  }

  ngOnInit() {
    console.log('ngOnInit...');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter...');

    this.http.get('https://randomuser.me/api/').subscribe( (res: any) => this.items = res.results);
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave...');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave...');
  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      message: 'Show an Alert',
      subHeader: 'My subHeader',
      header: 'My header',
      buttons: [
        {
          role: 'Cancel',
          text: 'Close',
          handler: () => console.log('close btn clicked')
        }
      ]
    });

    alert.present();
  }

  async showModal(item) {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: {
        item
      }
    });

    modal.present();
  }

  async takePhoto() {
    const { Camera } = Plugins;
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.photo = image.dataUrl;
  }

  async getLocation() {
    const { Geolocation } = Plugins;
    const currentPos = await Geolocation.getCurrentPosition();
    this.location = `${currentPos.coords.latitude}:${currentPos.coords.longitude}`;
  }
}
