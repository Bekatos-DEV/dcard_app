import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerServiceService } from '../api/server-service.service';
import { Md5 } from 'ts-md5/dist/md5';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: any;
  password: any;
  md5password: any;
  user: any = [];
  constructor(
    private route: Router,
    public storage: Storage,
    public serverService: ServerServiceService
  ) {}

  ngOnInit() {}

  async tabs() {
    this.md5password = Md5.hashStr(this.password);
    this.serverService.login(this.username).subscribe(
      (res: any) => {
        this.user = res;
        if (
          this.username === this.user[0].username &&
          this.md5password === this.user[0].password
        ) {
          const userid = this.user[0].id;
          const id = this.storage.set('id', userid);
          console.log('id :', id);
          this.route.navigateByUrl('/tabs');
        }
      },
      (error: any) => {
        console.log('Error', error);
        //hata mesajı
      }
    );

    console.log('tabs');

    //this.navCtrl.navigateRoot('/app/tabs/(home:home)')
  }

  getStorage() {
    return this.storage.get('id').then((result) => {
      console.log('storage id :', result);
      return result;
    });
  }
  clear() {
    this.storage.remove('id');
    console.log('clear');
  }
}
