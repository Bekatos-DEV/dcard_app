import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ModalController } from '@ionic/angular';
import { ModalFaqComponent } from '../modal-faq/modal-faq.component';

import { ModalChangePasswordComponent } from '../modal-change-password/modal-change-password.component';
@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  constructor(
    private storage: Storage,
    private router: Router,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.storage.create();
  }
  async openChangePassword() {
    const modal = await this.modalCtrl.create({
      component: ModalChangePasswordComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }
  async openSSS() {
    const modal = await this.modalCtrl.create({
      component: ModalFaqComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }
  logout() {
    this.storage.remove('id');
    console.log('clear');
    this.router.navigate(['/login']);
  }
}
