import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-modal-faq',
  templateUrl: './modal-faq.component.html',
  styleUrls: ['./modal-faq.component.scss'],
})
export class ModalFaqComponent implements OnInit {
  constructor(
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss('confirm');
  }
}
