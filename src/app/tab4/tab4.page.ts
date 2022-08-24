import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ServerServiceService } from '../api/server-service.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  userid: any;
  user: any = [];
  namesurname: any;
  phone: any;
  gsm: any;
  mail: any;
  country: any;
  company: any;
  address: any;
  website: any;

  constructor(
    public storage: Storage,
    private serverService: ServerServiceService
  ) {}

  ngOnInit() {
    this.storage.create();
    this.getStorage();
  }
  getStorage() {
    return this.storage.get('id').then((x) => {
      this.userid = x;
      console.log('user id :', this.userid);
      this.getUser(x);
      return x;
    });
  }
  getUser(id) {
    this.serverService.getUserbyid(id).subscribe(
      (res: any) => {
        this.user = res[0];
        console.log('user', this.user);
      },
      (error: any) => {
        console.log('error', error);
      }
    );
  }
  updateUser() {
    console.log('user', this.user);
    this.serverService.updateUserProfile(this.user).subscribe(
      (res: any) => {
        console.log('res', res);
      },
      (error: any) => {
        console.log('error', error);
      }
    );
  }
}
