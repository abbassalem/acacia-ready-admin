import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUpload } from '../../file-upload.model';
import { FileUploadService } from '../../services/file-upload.service';
import { map } from 'rxjs/operators';
import {  QuerySnapshot } from '@angular/fire/compat/firestore';

@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html',
  styleUrls: []
})
export class UploaderComponent {

  isHovering: boolean;
  files: File[] = [];
  fileUploads$: Observable<FileUpload[]>;

  constructor(private uploadService: FileUploadService) { 
  }

  ngOnInit() {
    
    this.fileUploads$ = this.uploadService.getFiles().get().pipe(
        map(
          (result: QuerySnapshot<FileUpload>) => {
              return result.docs.map(doc => ({ key: doc.id, path: doc.data().path, downloadURL: doc.data().downloadURL}));
          }
        ));
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }


}