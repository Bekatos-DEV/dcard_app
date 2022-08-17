import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ServerServiceService } from '../api/server-service.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  userid: any;
  user: any = [];
  links: any = [];
  constructor(
    public storage: Storage,
    private serverService: ServerServiceService
  ) {}
  ngOnInit(): void {}
  ionViewWillEnter() {
    this.storage.create();
    this.getStorage();
  }
  getStorage() {
    return this.storage.get('id').then((result) => {
      this.userid = result;
      console.log('user id :', this.userid);

      this.getUser(result);
      this.getLinks(result);
      return result;
    });
  }
  getUser(id) {
    console.log('id', this.userid);
    this.serverService.getUserbyid(id).subscribe((res: any) => {
      this.user = res[0];
      console.log('res : ', res);
      console.log('user :', this.user);
      console.log('name :', this.user.nameSurname);
    });
  }

  getLinks(id) {
    this.serverService.getLinksbyid(id).subscribe((res: any) => {
      this.links = res;
      console.log('links :', this.links);
    });
  }
}
