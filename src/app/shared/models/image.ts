import {Upload} from "shared/models/upload";

export class Image {
  file: Upload;
  type: number;
  name: string;
  url: string;

  constructor (uploadFile: Upload) {
    this.file = uploadFile;
    this.name = this.file.name;
    this.url = this.file.url;
  }
}
