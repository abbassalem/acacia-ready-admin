export class FileUpload {
    key: string;
    path: string;
    downloadURL: string;
    file?: File;
    progress?: number;
    createdOn?: Date = new Date();
    constructor(file: File) {
      this.file = file;
    }
  }