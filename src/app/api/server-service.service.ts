import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class ServerServiceService {
  headers: HttpHeaders;
  constructor(public http: HttpClient, public storage: Storage) {
    this.headers = new HttpHeaders();
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
  }
  login(username) {
    return this.http.get(
      'http://localhost:8888/dcard_api/login.php?username=' + username
    );
  }
}
