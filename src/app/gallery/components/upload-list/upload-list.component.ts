import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/gallery/services/file-upload.service';
import { map } from 'rxjs/operators';
import {  QuerySnapshot } from '@angular/fire/compat/firestore';
import { FileUpload } from '../../file-upload.model';
import { Observable } from 'rxjs';
 
@Component({
  selector: 'app-upload-list',
  templateUrl: 'upload-list.component.html'
})

export class UploadListComponent implements OnInit {
  
  fileUploads$: Observable<FileUpload[]>;

  constructor(private uploadService: FileUploadService) { }

  ngOnInit() {
    
  this.fileUploads$ = this.uploadService.getFiles().get().pipe(
    map((result: QuerySnapshot<FileUpload>) => {
      return result.docs.map(doc => ({ key: doc.id, path: doc.data().path, downloadURL: doc.data().downloadURL }))
    }
    ));

  }
}
