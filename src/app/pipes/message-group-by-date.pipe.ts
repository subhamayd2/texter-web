import { Pipe, PipeTransform } from '@angular/core';
import { MessageModel } from '../models/message.model';

@Pipe({
  name: 'messageGroupByDate'
})
export class MessageGroupByDatePipe implements PipeTransform {

  transform(collection: Array<MessageModel>, property: string): any {
    // prevents the application from breaking if the array of objects doesn't exist yet
    if (!collection) {
      return null;
    }


    const groupedCollection = collection.reduce((previous, current) => {
      let d = new Date(current[property]);
      let currProp = d.toDateString();
      if (!previous[currProp]) {
        previous[currProp] = [current];
      } else {
        previous[currProp].push(current);
      }

      return previous;
    }, {});

    // this will return an array of objects, each object containing a group of objects
    return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
  }

}
