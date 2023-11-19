
export default class Note {
  constructor(note, interval) {
    this.note = note;
    this.interval = interval;
  }

  isRoot() {
    return this.interval === '1P'
  }

  isMinorSecond() {
    return this.interval === '2m';
  }
  isMajorSecond() {
    return this.interval === '2M';
  }
  isMinorThird() {
    return this.interval === '3m';
  }
  isMajorThird() {
    return this.interval === '3M';
  }
  isPerfectFourth() {
    return this.interval === '4P';
  }
  isDiminishedFifth() {
    return this.interval === '5d';
  }
  isPerfectFifth() {
    return this.interval === '5P';
  }
  isMinorSixth() {
    return this.interval === '6m';
  }
  isMajorSixth() {
    return this.interval === '6M';
  }
  isMinorSeventh() {
    return this.interval === '7m';
  }
  isMajorSeventh() {
    return this.interval === '7M';
  }
}
