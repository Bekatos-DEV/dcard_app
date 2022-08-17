import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  constructor(private storage: Storage, private router: Router) {}

  ngOnInit() {
    this.storage.create();
  }
  logout() {
    this.storage.remove('id');
    console.log('clear');
    this.router.navigate(['/login']);
  }
}
