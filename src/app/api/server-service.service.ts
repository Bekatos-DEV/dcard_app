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
  getUserbyid(id: number) {
    return this.http.get(
      'http://localhost:8888/dcard_api/mainpage.php?id=' + id
    );
  }
  getLinksbyid(id: number) {
    return this.http.get('http://localhost:8888/dcard_api/links.php?id=' + id);
  }
  addLink(data) {
    return this.http.post('http://localhost:8888/dcard_api/linkadd.php', data);
  }
  updateLink(data) {
    return this.http.post(
      'http://localhost:8888/dcard_api/linkupdate.php',
      data
    );
  }
  deleteLink(data) {
    return this.http.post(
      'http://localhost:8888/dcard_api/linkdelete.php',
      data
    );
  }
  updateFile(data) {
    return this.http.post(
      'http://localhost:8888/dcard_api/fileupdate.php',
      data
    );
  }
  updateUserProfile(data) {
    return this.http.post(
      'http://localhost:8888/dcard_api/userprofileupdate.php',
      data
    );
  }
}
