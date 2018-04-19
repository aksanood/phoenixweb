import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtml'
})

export class StripHtmlPipe implements  PipeTransform {

  transform(value: string) {
    if(!value)
      return null;

    return value ? String(value).replace(/<[^>]+>/gm, '') : '';
  }
}
