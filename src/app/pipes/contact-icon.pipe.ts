import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contactIcon'
})
export class ContactIconPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let arr: Array<string> = value.split(" ");
    let initials = "";
    arr = arr.filter(n => {
      return isNaN(parseFloat(n))
    });
    //console.log(arr);
    if (arr.length > 1) {
      initials += arr[0][0].toUpperCase();
      initials += arr[arr.length - 1][0].toUpperCase();
    } else {
      initials = arr[0][0].toUpperCase();
    }
    return initials;
  }

}
