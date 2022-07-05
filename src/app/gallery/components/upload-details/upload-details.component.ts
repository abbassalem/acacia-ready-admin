import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FileUpload } from '../../file-upload.model';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-upload-details',
  templateUrl: 'upload-details.component.html'
})

export class UploadDetailsComponent implements OnInit {

  @Input() fileUpload: FileUpload;
  @Output() done: EventEmitter<boolean> = new EventEmitter();
  constructor(private uploadService: FileUploadService, private router: Router) { }

  ngOnInit(): void {
  }

  deleteFileUpload(fileUpload: FileUpload): void {
    this.uploadService.deleteFile(fileUpload);
    this.done.emit(true);
  }
}