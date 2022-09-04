/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ServerServiceService } from '../api/server-service.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import {
  ImagePicker,
  ImagePickerOptions,
} from '@awesome-cordova-plugins/image-picker/ngx';
import { Crop, CropOptions } from '@ionic-native/crop/ngx';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { File, FileEntry } from '@awesome-cordova-plugins/file/ngx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  userid: any;
  user: any = [];
  imageurl: any;
  securepath: any = window;
  url: any;

  imageOptions: CropOptions = {
    quality: 80,
    targetWidth: -1,
    targetHeight: -1,
  };

  constructor(
    public storage: Storage,
    private serverService: ServerServiceService,
    private actionsheet: ActionSheetController,
    private camera: Camera,
    private file: File,
    private loading: LoadingController,
    private imagepicker: ImagePicker,
    private crop: Crop,
    private domsanitize: DomSanitizer
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

  chooseFromCamera(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      mediaType: this.camera.MediaType.PICTURE,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
    };

    this.camera.getPicture(options).then(
      (result) => {
        alert(result);
        // this.imageurl = result;
        this.imageurl = this.securepath.Ionic.WebView.convertFileSrc(result);
        if (result.hasPermission !== false) {
          this.cropimage(result);
        }
      },
      (error) => {
        console.log('Error CAMERA', error);
      }
    );
  }

  santizeUrl(imageUrl) {
    return this.domsanitize.bypassSecurityTrustUrl(imageUrl);
  }

  pickImagesFromLibrary() {
    const options: ImagePickerOptions = {
      quality: 100,
      maximumImagesCount: 1,
    };
    this.imagepicker.getPictures(options).then(
      (imageresult) => {
        alert(imageresult);
        console.log('image Picker Results', imageresult);
        this.cropimage(imageresult);
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < imageresult.length; i++) {
          this.url = this.securepath.Ionic.WebView.convertFileSrc(
            imageresult[i]
          );
        }
      },
      (rror) => {
        console.log('Image Picker Error:', rror);
      }
    );
  }

  async selectimageOptions() {
    const actionsheet = await this.actionsheet.create({
      header: 'Select image Source',
      buttons: [
        {
          text: 'Load from Gallery',
          handler: () => {
            this.pickImagesFromLibrary();
            console.log('Image Selected from Gallery');
          },
        },
        {
          text: 'Select Camera',
          handler: () => {
            this.chooseFromCamera(this.camera.PictureSourceType.CAMERA);
            console.log('Camera Selected');
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await actionsheet.present();
  }

  cropimage(imageurl) {
    this.crop.crop(imageurl, this.imageOptions).then(
      (crop) => {
        console.log('Cropped Image:', crop);
        console.log('Cropped Image02:', crop.split('?')[0]);
        this.getimagefile(crop);
      },
      (error) => {
        console.log('error croping Image', error);
      }
    );
  }

  getimagefile(imageurl) {
    const file = this.file
      .resolveLocalFilesystemUrl(imageurl)
      .then((entry: FileEntry) => {
        entry.file(
          // eslint-disable-next-line @typescript-eslint/no-shadow
          (file) => {
            console.log('return entry File:', file.name);
            this.uploadimageFiletoServer(file);
          },
          (error) => {
            console.log('error accessing the image entry files', error);
          }
        );
      });
  }

  uploadimageFiletoServer(file) {
    const formdata = new FormData();
    const read = new FileReader();
    read.onload = () => {
      const blob = new Blob([read.result], {
        type: file.type,
      });
      console.log('fileImage: ', file);
      formdata.append('UPLOADCARE_PUB_KEY', 'ff144b94384588a4bceb');
      formdata.append('UPLOADCARE_STORE', '1');
      formdata.append('name', 'ImageUpload');
      formdata.append('file', blob, file.name);
    };
    read.readAsArrayBuffer(file);
  }
}
