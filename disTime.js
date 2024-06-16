/* * * * * * * * * *
 *   disTime .js   *
 *  Version 1.0.0  *
 *  License:  MIT  *
 * Simon  Waldherr *
 * * * * * * * * * */

/*jslint browser: true, indent: 2, plusplus: true */
/*globals languages, checkForAnd */
/*exported disTime */

var disTimeRepeater, disTimeObject, disTime;

"use strict";

disTimeObject = {
  parseTimestamp: function (language, thisTime, systemTime, detailed = false) {
    var insert, distime, years, months, weeks, days, hours, minutes, seconds;

    function pInt(string) {
      return parseInt(string, 10);
    }

    distime = Math.abs(systemTime - thisTime);
    insert = systemTime > thisTime ? ' ' + language.words.preAgo + ' ' : ' ' + language.words.inFuture + ' ';

    years = pInt(distime / 31536000);
    months = pInt((distime % 31536000) / 2419200);
    weeks = pInt((distime % 2419200) / 604800);
    days = pInt((distime % 604800) / 86400);
    hours = pInt((distime % 86400) / 3600);
    minutes = pInt((distime % 3600) / 60);
    seconds = distime % 60;

    insert += this.formatTimePart(language, years, 'year');
    insert += this.formatTimePart(language, months, 'month', detailed, insert);
    insert += this.formatTimePart(language, weeks, 'week', detailed, insert);
    insert += this.formatTimePart(language, days, 'day', detailed, insert);
    insert += this.formatTimePart(language, hours, 'hour', detailed, insert);
    insert += this.formatTimePart(language, minutes, 'minute', detailed, insert);
    insert += this.formatTimePart(language, seconds, 'second', detailed, insert);

    insert += systemTime > thisTime ? ' ' + language.words.postAgo : ' ' + language.words.postInFuture;
    return insert;
  },

  formatTimePart: function (language, value, unit, detailed = false, currentInsert = '') {
    //"use strict";
    if (value > 0 || (detailed && value === 0 && currentInsert)) {
      let conjunction = checkForAnd(detailed, currentInsert, language);
      return `${conjunction}${value} ${languages.declOfNum(language.mode, value, language[unit])}`;
    }
    return '';
  }
};

disTime = function (timedifference, language, detailed = false) {
  //"use strict";
  var elements = document.getElementsByClassName('distime'),
    elementcount = elements.length,
    timestamp = parseInt(Date.now() / 1000, 10) + timedifference,
    smallest = timestamp,
    elementtime, distime, i;

  language = determineLanguage(language);

  for (i = 0; i < elementcount; i++) {
    elementtime = parseInt(elements[i].getAttribute('data-time'), 10);
    elements[i].innerHTML = disTimeObject.parseTimestamp(languages[language], elementtime, timestamp, detailed);
    distime = Math.abs(timestamp - elementtime);
    if (!elements[i].hasAttribute('alt')) {
      elements[i].setAttribute('title', new Date(elementtime * 1000).toString());
    }
    smallest = Math.min(smallest, distime);
  }

  window.clearTimeout(disTimeRepeater);
  disTimeRepeater = setTimeout(disTime, getTimeoutDuration(smallest, detailed), timedifference, language, detailed);
};

function determineLanguage(language) {
  //"use strict";
  if (!language) {
    language = navigator.language || navigator.userLanguage;
  }
  if (!languages[language]) {
    language = language.split('-')[0] || 'en';
    if (!languages[language]) {
      language = 'en';
    }
  }
  return language;
}

function getTimeoutDuration(smallest, detailed) {
  //"use strict";
  if (smallest < 61 || (detailed && smallest < 3601)) {
    return 1000; // 1 second
  } else if (smallest < 3601 || (detailed && smallest < 86400)) {
    return 60000; // 1 minute
  } else if (smallest < 86400 || detailed) {
    return 3600001; // 1 hour
  } else {
    return 86400001; // 1 day
  }
}