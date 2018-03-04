import {Upload} from "shared/models/upload";

export class Image {
  file: Upload;
  type: number;
  name: string;
  url: string;
  constructor (uploadFile: Upload, type: number) {
    this.file = uploadFile;
    this.type = type;
    this.name = this.file.name;
    this.url = this.file.url;
  }
}
