import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Storage } from '@ionic/storage-angular';
import { ServerServiceService } from '../api/server-service.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModalAddLinkComponent } from '../modal-add-link/modal-add-link.component';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild(IonModal) modal2: IonModal;
  userid: any;
  user: any = [];
  links: any = [];
  dosyaname: any;
  private file: File;
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
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {}

  async presentAlert(category: any, classe: any) {
    const alert = await this.alertController.create({
      header: 'Please enter your info',

      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Sosyal Medya URLsini Giriniz',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: (alertData) => {
            //takes the data
            this.getValues(category, classe, alertData.name1, this.userid);
          },
        },
      ],
    });

    await alert.present();
  }
  getValues(cat, classe, link, id) {
    const data = {
      category: cat,
      class: classe,
      url: link,
      userID: id,
    };
    this.serverService.addLink(data).subscribe(
      (res: any) => {
        console.log('Success', res);
      },
      (error: any) => {
        console.log('Error', error);
        console.log(data);
      }
    );
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalAddLinkComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }
  onFileChange(fileChangeEvent) {
    this.file = fileChangeEvent.target.files[0];
    console.log('filechange', fileChangeEvent.target.files[0]);
  }
  async submitForm() {
    const formData = new FormData();
    formData.append('dosya', this.file);
    formData.append('id', '1');
    formData.append('fname', this.dosyaname);
    console.log('form data file', formData.get('dosya'));
    console.log('form data id', formData.get('id'));
    console.log('form data fname', formData.get('fname'));
    this.serverService.updateFile(formData).subscribe(
      (res: any) => {
        console.log('res', res);
      },
      (error: any) => {}
    );
  }
}
