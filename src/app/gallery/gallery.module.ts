import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UploadListComponent } from './components/upload-list/upload-list.component';
import { UploadDetailsComponent } from './components/upload-details/upload-details.component';
import { FileUploadService } from './services/file-upload.service';
import { DropzoneDirective } from './dropzone.directive';
import { UploaderComponent } from './components/uploader/uploader.component';
import { UploadTaskComponent } from './components/upload-task/upload-task.component';
import { MaterialModule } from '../material';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,

    RouterModule.forChild([
      { path: '', component: UploadListComponent},
      { path: 'upload', component: UploaderComponent},
      { path: 'details', component: UploadDetailsComponent}
      
    ]),
  ],
  declarations: [  
    // UploadFormComponent,
    UploadDetailsComponent,
    UploadListComponent,
    DropzoneDirective,
    UploaderComponent,
    UploadTaskComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [FileUploadService]
})
export class GalleryModuleModule { }
