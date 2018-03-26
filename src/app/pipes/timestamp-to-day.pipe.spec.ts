import { TimestampToDayPipe } from './timestamp-to-day.pipe';

describe('TimestampToDayPipe', () => {
  it('create an instance', () => {
    const pipe = new TimestampToDayPipe();
    expect(pipe).toBeTruthy();
  });
});
