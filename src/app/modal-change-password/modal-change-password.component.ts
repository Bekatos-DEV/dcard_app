import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ServerServiceService } from '../api/server-service.service';
import { AlertController } from '@ionic/angular';
import { Md5 } from 'ts-md5/dist/md5';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-modal-change-password',
  templateUrl: './modal-change-password.component.html',
  styleUrls: ['./modal-change-password.component.scss'],
})
export class ModalChangePasswordComponent implements OnInit {
  user: any = [];
  userid: any;
  oldpass: any;
  newpass: any;
  newpassagain: any;
  constructor(
    public storage: Storage,
    private alertController: AlertController,
    private serverService: ServerServiceService,
    private modalCtrl: ModalController
  ) {
    this.storage.create();
    this.getStorage();
  }

  ngOnInit() {}
  getStorage() {
    return this.storage.get('id').then((result) => {
      this.userid = result;
      console.log('user id :', this.userid);
      this.getUser(this.userid);
      return result;
    });
  }
  getUser(id) {
    console.log('id', this.userid);
    this.serverService.getUserbyid(id).subscribe((res: any) => {
      this.user = res[0];
    });
  }
  changePassword() {
    console.log('oldpass,', Md5.hashStr(this.oldpass));
    console.log('user password', this.user.password);
    if (Md5.hashStr(this.oldpass) === this.user.password) {
      if (this.newpass === this.newpassagain) {
        console.log('success');
      } else {
        //şifreler aynı değil
      }
    } else {
      //eski şifre yanlış
    }
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss('confirm');
  }
}
