import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private route: Router) {}

  ngOnInit() {}
  async tabs() {
    //you can use either of below
    console.log('tabs');
    this.route.navigateByUrl('/tabs');
    //this.navCtrl.navigateRoot('/app/tabs/(home:home)')
  }
}