const patterns = {
  major: [ 2, 2, 1, 2, 2, 2, 1 ],
  minor: [ 2, 1, 2, 2, 1, 2, 2 ],
  diminished: [ 2, 1, 2, 1, 2, 1, 2, 1 ],
  augmented: [ 3, 1, 2, 2, 3, 1 ],
  major7: [ 2, 2, 1, 2, 2, 2, 1 ],
  minor7: [ 2, 1, 2, 2, 1, 2, 2 ],
  dominant7: [ 2, 2, 1, 2, 2, 1, 1 ], // 7th is minor
};

// const keyChords = {
//   major: [ 'major', 'minor', 'minor', 'major', 'major', 'minor', 'dim' ],
//   minor: [ 'minor', 'dim', 'major', 'minor', 'minor', 'major', 'major' ]
// }

const pitches = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
];

const intervals = {
  'major': [ 0, 2, 4 ], // major root position
  'minor': [ 0, 2, 4 ], // minor root position
  'augmented': [ 0, 2, 4 ],
  'diminished': [ 0, 2, 4 ], // diminished root position
  'major7': [ 0, 2, 4, 6 ], // major seventh
  'minor7': [ 0, 2, 4, 6 ], // minor seventh
  'dominant7': [ 0, 2, 4, 6 ] // dominant7
};

const noteOrder = {};
  pitches.forEach((note, i) => {
    noteOrder[note] = i;
});

/* Return scales */
export function getScales() {
  let scales = [];
  let index = 0;

  Object.keys(patterns).forEach((key) => {
    pitches.forEach((n, i) => {
      scales[n + key] = {};
      scales[n + key].name = n + ' ' + key;
      scales[n + key].notes = [];
      let position = i;
      patterns[key].forEach((p) => {
        scales[n + key].notes.push(pitches[position]);
        position += p;
        if (position >= pitches.length) {
          position = position - pitches.length;
        }
      });
    });
    index += pitches.length;
  });

  return scales;
}

/* Simple chord check */
export function isChord(chord) {
  let parts = chord.split(' ');
  if (!pitches.includes(parts[0])) {
    return false;
  } else if (parts[1] == 'min' || parts[1] == 'minor' || parts[1] == 'maj'
  || parts[1] == 'major' || !parts[1] || parts[1] == 'dim' || parts[1] == 'aug'
  || parts[1] == '+' || parts[1] == 'augmented' || parts[1] == 'o'
  || parts[1] == 'diminished'
  || parts[1] == '7' || parts[1] == 'major7' || parts[1] == 'minor7'
  || parts[1] == 'maj7' || parts[1] == 'min7') {
    if (parts[2] && parts[2] != '7')
      return false;
    return true;
  }
}

export function getInterval(chord, scales, inversion) {
  let tmp = chord.split(' ');
  let note = tmp[0].toUpperCase();
  let type = 'major';
  // let inversion = 0;

  // Type
  if (!tmp[2] && (tmp[1] == 'min' || tmp[1] == 'minor')) {
    type = 'minor';
  } else if (!tmp[2] && (tmp[1] == 'aug' || tmp[1] == '+' || tmp[1] == 'augmented')) {
    type = 'augmented'
  } else if (!tmp[2] && (tmp[1] == 'dim' || tmp[1] == 'o' || tmp[1] == 'diminished')) {
    type = 'diminished'
  } else if (tmp[1] == 'maj7' || tmp[1] == 'major7' || (tmp[2] == '7' && (tmp[1] == 'major' || tmp[1] == 'maj'))) {
    type = 'major7'
  } else if (tmp[1] == 'min7' || tmp[1] == 'minor7' || (tmp[2] == '7' && (tmp[1] == 'minor' || tmp[1] == 'min'))) {
    type = 'minor7'
  } else if (tmp[1] == '7') {
    type = 'dominant7'
  }

  // otherwise assume major
  let chordIntervals = intervals[type].slice();
  // Inversions
  if (note[1] == '/' || note[2] == '/') {
    let parts = note.split('/');
    let root = parts[0];
    let lowest = parts[1];
    note = root;

    if (scales[note + type].notes[2] == lowest) {
      inversion = 1;
    } else if (scales[note + type].notes[4] == lowest) {
      inversion = 2;
    }
  }

  if (inversion == 1) {
    chordIntervals.push(intervals[type][0]);
    chordIntervals.shift();
  } else if (inversion == 2) {
    chordIntervals.push(intervals[type][0]);
    chordIntervals.shift();
     chordIntervals.push(chordIntervals[0]);
    chordIntervals.shift();
  }

  let selected = [];
  let octave = 0;
  chordIntervals.forEach((i, index) => {
    if (index && (noteOrder[scales[note + type].notes[i]]
      < noteOrder[scales[note + type].notes[chordIntervals[index - 1]]])) {
        octave++;
    }
    selected.push(scales[note + type].notes[i] + octave);
  });
  return selected;
}
