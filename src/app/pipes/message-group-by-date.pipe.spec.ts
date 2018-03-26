import { MessageGroupByDatePipe } from './message-group-by-date.pipe';

describe('MessageGroupByDatePipe', () => {
  it('create an instance', () => {
    const pipe = new MessageGroupByDatePipe();
    expect(pipe).toBeTruthy();
  });
});
