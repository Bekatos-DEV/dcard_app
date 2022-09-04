import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalAddLinkComponent } from './modal-add-link/modal-add-link.component';
import { ModalChangePasswordComponent } from './modal-change-password/modal-change-password.component';
import { ModalFaqComponent } from './modal-faq/modal-faq.component';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@awesome-cordova-plugins/native-geocoder/ngx';
@NgModule({
  declarations: [
    AppComponent,
    ModalAddLinkComponent,
    ModalChangePasswordComponent,
    ModalFaqComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    FormsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    File,
    Camera,
    ImagePicker,
    Crop,
    Geolocation,
    NativeGeocoder,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
