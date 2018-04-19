import {Image} from "shared/models/image";

export class ShowcaseItem {
  $key: string;
  title: string;
  description: string;
  images: any[] = [];
  date: number;
  coverImage: any = {};

  constructor(info: any,  imagesArrayMap: {[imageId: string]: any}, date: number) {

    for (let imageId in imagesArrayMap) {
      this.images.push(imagesArrayMap[imageId]);
    }
    this.title = info.title;
    this.description = info.description;
    this.coverImage = info.coverImage;
    this.date = date;
  }
}
