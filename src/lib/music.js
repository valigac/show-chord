const patterns = {
  major: [ 2, 2, 1, 2, 2, 2, 1 ],
  minor: [ 2, 1, 2, 2, 1, 2, 2 ],
};

const keyChords = {
  major: [ 'major', 'minor', 'minor', 'major', 'major', 'minor', 'dim' ],
  minor: [ 'minor', 'dim', 'major', 'minor', 'minor', 'major', 'major' ]
}

const pitches = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
];

function getScales() {
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

console.log(getScales());
