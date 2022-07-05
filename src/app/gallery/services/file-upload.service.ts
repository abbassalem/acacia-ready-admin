import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FileUpload } from '../file-upload.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  private basePath = 'images';
  private uploadTask: AngularFireUploadTask;

  constructor(private db: AngularFirestore, private storage: AngularFireStorage) { 
  }


  getFiles(): AngularFirestoreCollection<FileUpload> {
    return this.db.collection(this.basePath);
    // , ref => {
      // console.dir(ref);
      // ref.limitToLast(numberItems)
      // );
    // }
  }

  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        console.log(fileUpload.path);
        this.deleteFileStorage(fileUpload.path);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.doc(this.basePath +'/'+key).delete();
  }

  private deleteFileStorage(path: string): void {
    const name = path.split('/');
    console.dir(name);
    const storageRef = this.storage.ref('/'+ name[1]);
    storageRef.child(name[2]).delete();
  }

  // pushFileToStorage(fileUpload: FileUpload) {

  //   const filePath = `${this.basePath}/${fileUpload.file.name}`;
  //   const storageRef = this.storage.ref(filePath);
  //   this.uploadTask = this.storage.upload(filePath, fileUpload.file);
    
  //   this.uploadTask.task.on('STATE_CHANGED', 
  //     (snapshot) => {
  //       fileUpload.progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
         
  //     },
  //     (error) => {
  //       console.info('uploadtask ');
  //       console.dir(error);
  //     }
  //   ,
  //   async() => {
  //       await this.uploadTask.task.snapshot.ref.getDownloadURL().then( url => fileUpload.downloadURL = url);
  //       fileUpload.path = this.basePath + '/'+ fileUpload.file.name;
  //       this.saveFileData(fileUpload);
  //   }
  //   ) 
  // }

    // uploadTask.snapshotChanges().pipe(
    //   finalize(() => {
    //     storageRef.getDownloadURL().subscribe(downloadURL => {

    //     }); 
    //   })
    // ).subscribe();
    // return uploadTask.percentageChanges();
  // }

  // private saveFileData(fileUpload: FileUpload): void {
  //   this.db.collection(this.basePath).add(fileUpload);
  // }

 
}