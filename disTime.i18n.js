/* * * * * * * * * *
 *   disTime .js   *
 *  Version 0.9.0  *
 *  License:  MIT  *
 * Simon  Waldherr *
 * * * * * * * * * */

/*jslint browser: true, indent: 2, plusplus: true */

function trim11(str) {
  "use strict";
  var i;
  str = str.replace(/^\s+/, '');
  for (i = str.length - 1; i >= 0; i--) {
    if (/\S/.test(str.charAt(i))) {
      str = str.substring(0, i + 1);
      break;
    }
  }
  return str;
}

function checkForAnd(detailed, insert, language) {
  "use strict";
  if (detailed && trim11(insert) !== language.words.preAgo && trim11(insert) !== language.words.inFuture) {
    return ' ' + language.words.and + ' ';
  }
  return '';
}

var languages = {
  declOfNum: function (mode, number, titles) {
    "use strict";
    var cases;
    if (mode === 2) {
      cases = [2, 0, 1, 1, 1, 2];
    } else {
      return number === 1 ? titles[0] : titles[1];
    }
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  },
  int: {
    words: {
      preAgo: '',
      postAgo: 'ago',
      and: ' ',
      inFuture: 'in',
      postInFuture: ''
    },
    mode: 1,
    year: ['Y', 'Y'],
    month: ['M', 'M'],
    week: ['W', 'W'],
    day: ['D', 'D'],
    hour: ['h', 'h'],
    minute: ['min', 'min'],
    second: ['sec', 'sec']
  },
  en: {
    words: {
      preAgo: '',
      postAgo: 'ago',
      and: 'and',
      inFuture: 'in',
      postInFuture: ''
    },
    mode: 1,
    year: ['year', 'years'],
    month: ['month', 'months'],
    week: ['week', 'weeks'],
    day: ['day', 'days'],
    hour: ['hour', 'hours'],
    minute: ['minute', 'minutes'],
    second: ['second', 'seconds']
  },
  de: {
    words: {
      preAgo: 'vor',
      postAgo: '',
      and: 'und',
      inFuture: 'in',
      postInFuture: ''
    },
    mode: 1,
    year: ['Jahr', 'Jahren'],
    month: ['Monat', 'Monaten'],
    week: ['Woche', 'Wochen'],
    day: ['Tag', 'Tagen'],
    hour: ['Stunde', 'Stunden'],
    minute: ['Minute', 'Minuten'],
    second: ['Sekunde', 'Sekunden']
  },
  nl: {
    words: {
      preAgo: '',
      postAgo: 'geleden',
      and: 'en',
      inFuture: 'in',
      postInFuture: ''
    },
    mode: 1,
    year: ['jaar', 'jaar'],
    month: ['maand', 'maanden'],
    week: ['week', 'weken'],
    day: ['dag', 'dagen'],
    hour: ['uur', 'uren'],
    minute: ['minuut', 'minuten'],
    second: ['seconde', 'seconden']
  },
  id: {
    words: {
      preAgo: '',
      postAgo: 'yang lalu',
      and: 'dan',
      inFuture: 'dalam',
      postInFuture: ''
    },
    mode: 1,
    year: ['tahun', 'tahun'],
    month: ['bulan', 'bulan'],
    week: ['minggu', 'minggu'],
    day: ['hari', 'hari'],
    hour: ['jam', 'jam'],
    minute: ['menit', 'menit'],
    second: ['detik', 'detik']
  },
  it: {
    words: {
      preAgo: '',
      postAgo: 'fa',
      and: 'e',
      inFuture: 'in',
      postInFuture: ''
    },
    mode: 1,
    year: ['anno', 'anni'],
    month: ['mese', 'mesi'],
    week: ['settimana', 'settimane'],
    day: ['giorno', 'giorni'],
    hour: ['ora', 'ore'],
    minute: ['minuto', 'minuti'],
    second: ['secondo', 'secondi']
  },
  es: {
    words: {
      preAgo: '',
      postAgo: 'antes',
      and: 'y',
      inFuture: 'en',
      postInFuture: ''
    },
    mode: 1,
    year: ['año', 'años'],
    month: ['mes', 'meses'],
    week: ['semana', 'semanas'],
    day: ['día ', 'días'],
    hour: ['hora', 'horas'],
    minute: ['minuto', 'minutos'],
    second: ['segundo', 'segundos']
  },
  fr: {
    words: {
      preAgo: 'il ya',
      postAgo: '',
      and: 'et',
      inFuture: 'dans ',
      postInFuture: ''
    },
    mode: 1,
    year: ['an', 'ans'],
    month: ['mois', 'mois'],
    week: ['semaine', 'semaines'],
    day: ['jour', 'jours'],
    hour: ['heure', 'heures'],
    minute: ['minute', 'minutes'],
    second: ['seconde', 'secondes']
  },
  ms: {
    words: {
      preAgo: 'selepas',
      postAgo: '',
      and: 'dan',
      inFuture: 'akan',
      postInFuture: ''
    },
    mode: 1,
    year: ['tahun', 'tahun'],
    month: ['bulan', 'bulan'],
    week: ['minggu', 'minggu'],
    day: ['hari', 'hari'],
    hour: ['jam', 'jam'],
    minute: ['minit', 'minit'],
    second: ['saat', 'saat']
  },
  oc: {
    words: {
      preAgo: 'fa',
      postAgo: '',
      and: 'e',
      inFuture: 'd’aquí',
      postInFuture: ''
    },
    mode: 1,
    year: ['an', 'ans'],
    month: ['mes', 'meses'],
    week: ['setmana', 'setmanas'],
    day: ['jorn', 'jorns'],
    hour: ['ora', 'oras'],
    minute: ['minuta', 'minutas'],
    second: ['segonda', 'segondas']
  },
  pt: {
    words: {
      preAgo: '',
      postAgo: 'atrás',
      and: 'e',
      inFuture: 'em',
      postInFuture: ''
    },
    mode: 1,
    year: ['ano', 'anos'],
    month: ['mês', 'meses'],
    week: ['semana', 'semanas'],
    day: ['dia', 'dias'],
    hour: ['hora', 'horas'],
    minute: ['minuto', 'minutos'],
    second: ['segundo', 'segundos']
  },
  ro: {
    words: {
      preAgo: 'acum',
      postAgo: '',
      and: 'si',
      inFuture: 'peste',
      postInFuture: ''
    },
    mode: 1,
    year: ['an', 'ani'],
    month: ['luna', 'luni'],
    week: ['saptamana', 'saptamani'],
    day: ['zi', 'zile'],
    hour: ['ora', 'ore'],
    minute: ['minut', 'minute'],
    second: ['secunda', 'secunde']
  },
  ta: {
    words: {
      preAgo: '',
      postAgo: 'முன்பு',
      and: 'மற்றும்',
      inFuture: 'இல்',
      postInFuture: ''
    },
    mode: 1,
    year: ['ஆண்டு', 'ஆண்டுகள்'],
    month: ['மாதம்', 'மாதங்கள்'],
    week: ['வாரம்', 'வாரங்கள்'],
    day: ['நாள்', 'நாட்கள்'],
    hour: ['மணி', 'மணி'],
    minute: ['நிமிடம்', 'நிமிடங்கள்'],
    second: ['வினாடி', 'வினாடிகள்']
  },
  ru: {
    words: {
      preAgo: '',
      postAgo: 'назад',
      and: 'и',
      inFuture: 'через',
      postInFuture: ''
    },
    mode: 2,
    year: ['год', 'года', 'лет'],
    month: ['месяц', 'месяца', 'месяцев'],
    week: ['неделя', 'недели', 'недель'],
    day: ['день', 'дня', 'дней'],
    hour: ['час', 'часа', 'часов'],
    minute: ['минуту', 'минуты', 'минут'],
    second: ['секунду', 'секунды', 'секунд']
  },
  uk: {
    words: {
      preAgo: '',
      postAgo: 'тому',
      and: '',
      inFuture: 'за',
      postInFuture: ''
    },
    mode: 2,
    year: ['рік', 'роки', 'років'],
    month: ['місяць', 'місяці', 'місяців'],
    week: ['тиждень', 'тижня', 'тижнів'],
    day: ['день', 'дні', 'днів'],
    hour: ['годину', 'години', 'годин'],
    minute: ['хвилину', 'хвилини', 'хвилин'],
    second: ['секунду', 'секунди', 'секунд']
  },
  hi: {
    words: {
      preAgo: '',
      postAgo: 'पूर्व',
      and: 'और',
      inFuture: 'में',
      postInFuture: ''
    },
    mode: 1,
    year: ['वर्ष', 'वर्षों'],
    month: ['महीना', 'महीने'],
    week: ['सप्ताह', 'सप्ताह'],
    day: ['दिन', 'दिन'],
    hour: ['घंटा', 'घंटे'],
    minute: ['मिनट', 'मिनट'],
    second: ['सेकंड', 'सेकंड']
  },
  no: {
    words: {
      preAgo: '',
      postAgo: 'siden',
      and: 'og',
      inFuture: 'om',
      postInFuture: ''
    },
    mode: 1,
    year: ['år', 'år'],
    month: ['måned', 'måneder'],
    week: ['uke', 'uker'],
    day: ['dag', 'dager'],
    hour: ['time', 'timer'],
    minute: ['minutt', 'minutter'],
    second: ['sekund', 'sekunder']
  },
  pl: {
    words: {
      preAgo: '',
      postAgo: 'temu',
      and: 'i',
      inFuture: 'za',
      postInFuture: ''
    },
    mode: 1,
    year: ['rok', 'lata'],
    month: ['miesiąc', 'miesiące'],
    week: ['tydzień', 'tygodni'],
    day: ['dzień', 'dni'],
    hour: ['godzina', 'godziny'],
    minute: ['minuta', 'minuty'],
    second: ['sekunda', 'sekundy']
  },
  sv: {
    words: {
      preAgo: '',
      postAgo: 'sedan',
      and: 'och',
      inFuture: 'om',
      postInFuture: ''
    },
    mode: 1,
    year: ['år', 'år'],
    month: ['månad', 'månader'],
    week: ['vecka', 'veckor'],
    day: ['dag', 'dagar'],
    hour: ['timme', 'timmar'],
    minute: ['minut', 'minuter'],
    second: ['sekund', 'sekunder']
  },
  tl: {
    words: {
      preAgo: '',
      postAgo: 'ang nakalipas',
      and: 'at',
      inFuture: 'sa',
      postInFuture: ''
    },
    mode: 1,
    year: ['taon', 'taon'],
    month: ['buwan', 'buwan'],
    week: ['linggo', 'linggo'],
    day: ['araw', 'araw'],
    hour: ['oras', 'oras'],
    minute: ['minuto', 'minuto'],
    second: ['segundo', 'segundo']
  },
  tr: {
    words: {
      preAgo: '',
      postAgo: 'önce',
      and: 've',
      inFuture: '',
      postInFuture: 'içinde'
    },
    mode: 1,
    year: ['yıl', 'yıl'],
    month: ['ay', 'ay'],
    week: ['hafta', 'hafta'],
    day: ['gün', 'gün'],
    hour: ['saat', 'saat'],
    minute: ['dakika', 'dakika'],
    second: ['saniye', 'saniye']
  },
  fi: {
    words: {
      preAgo: '',
      postAgo: 'sitten',
      and: 'ja',
      inFuture: '',
      postInFuture: 'kuluttua'
    },
    mode: 1,
    year: ['vuosi', 'vuotta'],
    month: ['kuukausi', 'kuukautta'],
    week: ['viikko', 'viikkoa'],
    day: ['päivä', 'päivää'],
    hour: ['tunti', 'tuntia'],
    minute: ['minuutti', 'minuuttia'],
    second: ['sekunti', 'sekuntia']
  },
  ja: {
    words: {
      preAgo: '',
      postAgo: '前',
      and: 'と',
      inFuture: '',
      postInFuture: '後'
    },
    mode: 1,
    year: ['年', '年'],
    month: ['月', '月'],
    week: ['週', '週'],
    day: ['日', '日'],
    hour: ['時間', '時間'],
    minute: ['分', '分'],
    second: ['秒', '秒']
  },
  zh: {
    words: {
      preAgo: '',
      postAgo: '前',
      and: '和',
      inFuture: '',
      postInFuture: '后'
    },
    mode: 1,
    year: ['年', '年'],
    month: ['月', '月'],
    week: ['周', '周'],
    day: ['日', '日'],
    hour: ['小时', '小时'],
    minute: ['分钟', '分钟'],
    second: ['秒', '秒']
  },
  ko: {
    words: {
      preAgo: '',
      postAgo: '전',
      and: '그리고',
      inFuture: '',
      postInFuture: '후'
    },
    mode: 1,
    year: ['년', '년'],
    month: ['개월', '개월'],
    week: ['주', '주'],
    day: ['일', '일'],
    hour: ['시간', '시간'],
    minute: ['분', '분'],
    second: ['초', '초']
  },
  bg: {
    words: {
      preAgo: 'преди',
      postAgo: '',
      and: 'и',
      inFuture: 'след',
      postInFuture: ''
    },
    mode: 2,
    year: ['година', 'години', 'години'],
    month: ['месец', 'месеца', 'месеци'],
    week: ['седмица', 'седмици', 'седмици'],
    day: ['ден', 'дни', 'дни'],
    hour: ['час', 'часа', 'часа'],
    minute: ['минута', 'минути', 'минути'],
    second: ['секунда', 'секунди', 'секунди']
  },
  da: {
    words: {
      preAgo: '',
      postAgo: 'siden',
      and: 'og',
      inFuture: 'om',
      postInFuture: ''
    },
    mode: 1,
    year: ['år', 'år'],
    month: ['måned', 'måneder'],
    week: ['uge', 'uger'],
    day: ['dag', 'dage'],
    hour: ['time', 'timer'],
    minute: ['minut', 'minutter'],
    second: ['sekund', 'sekunder']
  },
  he: {
    words: {
      preAgo: 'לפני',
      postAgo: '',
      and: 'ו',
      inFuture: 'בעוד',
      postInFuture: ''
    },
    mode: 1,
    year: ['שנה', 'שנים'],
    month: ['חודש', 'חודשים'],
    week: ['שבוע', 'שבועות'],
    day: ['יום', 'ימים'],
    hour: ['שעה', 'שעות'],
    minute: ['דקה', 'דקות'],
    second: ['שנייה', 'שניות']
  },
  el: {
    words: {
      preAgo: '',
      postAgo: 'πριν',
      and: 'και',
      inFuture: 'σε',
      postInFuture: ''
    },
    mode: 1,
    year: ['χρόνος', 'χρόνια'],
    month: ['μήνας', 'μήνες'],
    week: ['εβδομάδα', 'εβδομάδες'],
    day: ['ημέρα', 'ημέρες'],
    hour: ['ώρα', 'ώρες'],
    minute: ['λεπτό', 'λεπτά'],
    second: ['δευτερόλεπτο', 'δευτερόλεπτα']
  },
  hr: {
    words: {
      preAgo: 'prije',
      postAgo: '',
      and: 'i',
      inFuture: 'za',
      postInFuture: ''
    },
    mode: 1,
    year: ['godina', 'godine'],
    month: ['mjesec', 'mjeseci'],
    week: ['tjedan', 'tjedna'],
    day: ['dan', 'dana'],
    hour: ['sat', 'sati'],
    minute: ['minuta', 'minute'],
    second: ['sekunda', 'sekunde']
  },
  hu: {
    words: {
      preAgo: '',
      postAgo: 'ezelőtt',
      and: 'és',
      inFuture: 'múlva',
      postInFuture: ''
    },
    mode: 1,
    year: ['év', 'év'],
    month: ['hónap', 'hónap'],
    week: ['hét', 'hét'],
    day: ['nap', 'nap'],
    hour: ['óra', 'óra'],
    minute: ['perc', 'perc'],
    second: ['másodperc', 'másodperc']
  },
  vi: {
    words: {
      preAgo: 'trước',
      postAgo: '',
      and: 'và',
      inFuture: 'trong',
      postInFuture: ''
    },
    mode: 1,
    year: ['năm', 'năm'],
    month: ['tháng', 'tháng'],
    week: ['tuần', 'tuần'],
    day: ['ngày', 'ngày'],
    hour: ['giờ', 'giờ'],
    minute: ['phút', 'phút'],
    second: ['giây', 'giây']
  },
  th: {
    words: {
      preAgo: '',
      postAgo: 'ที่แล้ว',
      and: 'และ',
      inFuture: 'ใน',
      postInFuture: ''
    },
    mode: 1,
    year: ['ปี', 'ปี'],
    month: ['เดือน', 'เดือน'],
    week: ['สัปดาห์', 'สัปดาห์'],
    day: ['วัน', 'วัน'],
    hour: ['ชั่วโมง', 'ชั่วโมง'],
    minute: ['นาที', 'นาที'],
    second: ['วินาที', 'วินาที']
  }
};