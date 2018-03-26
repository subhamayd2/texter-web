import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampToDay'
})
export class TimestampToDayPipe implements PipeTransform {

  transform(timestamp: string): any {
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
    let millis = Date.parse(timestamp);
    let date = new Date(millis);

    if (date.getTime() == today.getTime()) {
      return 'Today';
    } else if (date.getTime() == yesterday.getTime()) {
      return 'Yesterday';
    } else {
      return timestamp;
    }
  }

}
