'use strict';

const debug = require('debug')('Reps');
const StorageHandler = require('./storage-handler');
const storageHandler = new StorageHandler();

class Reps {
  static getAll() {
    return storageHandler.getStorageItem('reps');
  }

  static getGroupedByMonth() {
    debug('Getting all Reps grouped by month');
    const reps = this.getAll();

    const repsWithDates = reps.map((rep) => {
      rep.profile.date_joined_program = new Date(rep.profile.date_joined_program);
      const date = rep.profile.date_joined_program;
      const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      // Looks very ugly, but is really easy to sort to our needs ;)
      rep.joined = month + '-' + day + '-' + date.getFullYear();
      return rep;
    });

    const sorted = repsWithDates.sort((a, b) => {
      if (a.joined < b.joined) {
        return -1;
      } else if (a.joined > b.joined) {
        return 1;
      }

      return 0;
    });

    return sorted;
  }
}

module.exports = Reps;
