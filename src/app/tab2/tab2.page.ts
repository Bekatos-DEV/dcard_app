import { Component } from '@angular/core';
import { ServerServiceService } from '../api/server-service.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  dosyaname: any;
  private file: File;
  constructor(private serverService: ServerServiceService) {}
  onFileChange(fileChangeEvent) {
    this.file = fileChangeEvent.target.files[0];
    console.log('filechange', fileChangeEvent.target.files[0]);
  }
  async submitForm() {
    const formData = new FormData();
    formData.append('dosya', this.file);
    formData.append('id', '1');
    formData.append('fname', this.dosyaname);
    console.log('form data file', formData.get('dosya'));
    console.log('form data id', formData.get('id'));
    console.log('form data fname', formData.get('fname'));
    this.serverService.updateFile(formData).subscribe(
      (res: any) => {
        console.log('res', res);
      },
      (error: any) => {}
    );
  }
}
