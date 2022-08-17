import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private storage: Storage, private router: Router) {}
  async ngOnInit() {
    await this.storage.create();
    console.log('storage created');
    this.storage.get('id').then((val) => {
      if (val) {
        this.router.navigate(['/tabs/tab3']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
