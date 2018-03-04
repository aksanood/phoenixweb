import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titlecase'
})

export class TitlecasePipe implements  PipeTransform {

  transform(value: string, args?: any) {
    if(!value)
      return null;
    return value.replace(/\w+/g, function(txt){ return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  }
}
