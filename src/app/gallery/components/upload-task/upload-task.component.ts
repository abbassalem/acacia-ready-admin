import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: []
})
export class UploadTaskComponent implements OnInit {

  @Input() file: File;

  @Output() done: EventEmitter<boolean> = new EventEmitter();

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  imagePath = 'images';

  constructor(private storage: AngularFireStorage, private db: AngularFirestore, private router: Router, private uploadService: FileUploadService) { }

  ngOnInit() {
    this.startUpload();
  }

  startUpload() {
    const path = `/${this.imagePath}/${this.file.name}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, this.file);
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges().pipe(
      finalize( async() =>  {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        this.db.collection(this.imagePath).add( { downloadURL: this.downloadURL, path });   
        this.done.emit(true);   
      }),
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}