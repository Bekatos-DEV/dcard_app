import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ServerServiceService } from '../api/server-service.service';
@Component({
  selector: 'app-modal-add-link',
  templateUrl: './modal-add-link.component.html',
  styleUrls: ['./modal-add-link.component.scss'],
})
export class ModalAddLinkComponent {
  userid: any;
  user: any = [];
  links: any = [];

  constructor(
    public storage: Storage,
    private serverService: ServerServiceService,
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) {
    this.storage.create();
    this.getStorage();
  }
  getStorage() {
    return this.storage.get('id').then((result) => {
      this.userid = result;
      console.log('user id :', this.userid);
      this.getLinks(result);
      return result;
    });
  }
  getLinks(id) {
    this.serverService.getLinksbyid(id).subscribe((res: any) => {
      this.links = res;
      console.log('links :', this.links);
    });
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss('confirm');
  }
  async presentAlert(linkurl: any, linkid: any) {
    const alert = await this.alertController.create({
      header: 'Please enter your info',

      inputs: [
        {
          name: 'name1',
          type: 'text',
          value: linkurl,
        },
      ],
      buttons: [
        {
          text: 'İptal',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Güncelle',
          cssClass: 'secondary',
          handler: (alertData) => {
            //takes the data
            this.getValues(alertData.name1, linkid);
          },
        },
        {
          text: 'Sil',
          cssClass: 'danger',
          handler: (alertData) => {
            //takes the data
            this.deleteData(linkid);
          },
        },
      ],
    });

    await alert.present();
  }
  getValues(link, linkid) {
    const data = {
      url: link,
      id: linkid,
    };
    this.serverService.updateLink(data).subscribe(
      (res: any) => {
        console.log('Success', res);
      },
      (error: any) => {
        console.log('Error', error);
        console.log(data);
      }
    );
  }
  deleteData(linkid) {
    const datas = {
      id: linkid,
    };
    console.log('datas :', datas);
    this.deleteLink(datas);
  }

  deleteLink(data) {
    console.log('delete data :', data);
    this.serverService.deleteLink(data).subscribe(
      (res: any) => {
        console.log('Success', res);
      },
      (error: any) => {
        console.log('error', error);
      }
    );
  }
}
