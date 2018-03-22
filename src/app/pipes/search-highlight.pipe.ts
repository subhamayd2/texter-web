import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchHighlight'
})
export class SearchHighlightPipe implements PipeTransform {

  transform(value: any, searchString?: any): any {
    let result: string = "";

    let regex = new RegExp(searchString, "i");
    let pos = value.search(regex);

    if (pos > -1) {
      result = value.substr(0, pos) + "<b>" + value.substr(pos, searchString.length) + "</b>" + value.substr(pos + searchString.length);
    } else {
      result = value;
    }
    
    return result;
  }

}
