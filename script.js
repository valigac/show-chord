const notes = [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ];
const noteOrder = {};
notes.forEach((note, i) => {
  noteOrder[note] = i;
});

const input = document.getElementById('search-input');
const types = document.getElementsByClassName('inversion');
const scales = getScales();
const intervals = {
  'major': [ 0, 2, 4 ], // major root position
  'minor': [ 0, 2, 4 ], // minor root position
}
let active = null;
let activeChord = null;
let activeScale = null;

let chordType = 0;

for (let i = 0; i < types.length; i++) {
  types[i].onclick = (e) => {
    types[chordType].classList.remove('active-choice');
    chordType = i;
    e.target.classList.add('active-choice');

    if (activeScale && activeChord) {
      let parts = activeChord.split(' ');
      let root = parts[0].split('/');
      let scaleNotes = activeScale;
      let type = chordType;
      deactiveKeys(active)

      if (type == 0) {
        manageChord(root[0] + ' ' + parts[1]);
      } else if (type == 1) {
        manageChord(root[0] + '/' + scaleNotes[2] + ' ' + parts[1]);
      } else {
        manageChord(root[0] + '/' + scaleNotes[4] + ' ' +  parts[1]);
      }
    }
  }
}

function manageChord(chord) {
  let tmp = chord.split(' ');
  let note = tmp[0].toUpperCase();
  let type = 'major';
  let inversion = 0;
  activeChord = chord;

  // Type
  if (tmp[1] == 'min' || tmp[1] == 'minor') {
    type = 'minor';
  } else new Promise(function(resolve, reject) {
    activeChord += ' ' + type;
  });
  // otherwise assume major

  let chordIntervals = intervals[type].slice();
  // Inversions
  if (note[1] == '/' || note[2] == '/') {
    let parts = note.split('/');
    let root = parts[0];
    let lowest = parts[1];
    note = root;

    chordIntervals.push(intervals[type][0]);
    chordIntervals.shift();
    if (scales[note + type].notes[2] == lowest) {
      inversion = 1;
    } else if (scales[note + type].notes[4] == lowest) {
      inversion = 2;
      chordIntervals.push(chordIntervals[0]);
      chordIntervals.shift();
    }
  }
  types[chordType].classList.remove('active-choice');
  chordType = inversion;
  types[chordType].classList.add('active-choice');

  let selected = [];
  let octave = 0;
  chordIntervals.forEach((i, index) => {
    if (index && (noteOrder[scales[note + type].notes[i]]
      < noteOrder[scales[note + type].notes[chordIntervals[index - 1]]])) {
        octave++;
    }
    selected.push(scales[note + type].notes[i] + octave);
  });
  active = selected;
  activeScale = scales[note + type].notes;
  activeKeys(selected);
}

input.onkeydown = (e) => {
  if (e.code == 'Enter') {
    manageChord(e.target.value);
  } else {
    if (active) {
      deactiveKeys(active);
      active = null;
    }
  }
}

/* Basic init */
function initKeys() {
  const octavesEl = document.getElementsByClassName('octave');
  let keys = {};
  for (let i = 0; i < octavesEl.length; i++) {
    // let key = octavesEl[i].childNodes;
    let tmp = octavesEl[i].getElementsByTagName('span');
    for (let j = 0; j < tmp.length; j++) {
      keys[notes[j] + i] = { note: notes[j], octave: i,
        element: tmp[j], color: (notes[j][1]) ? 'black' : 'white' };
    }
  }
  return keys;
}

const keys = initKeys();

/* Color change for notes in array */
function activeKeys(selected) {
  selected.forEach((n) => {
    keys[n].element.style.background = (keys[n].color != 'black') ? '#5e9cff' : '#063f99';
  });
}

/* Color change for notes in array (back to original) */
function deactiveKeys(selected) {
  selected.forEach((n) => {
    keys[n].element.style.background = (keys[n].color != 'black') ? 'white' : 'black';
  });
  types[chordType].classList.remove('active-choice');
  activeChord = null;
  activeScale = null;
  chordType = 0;
}

//activeKeys(['C0', 'E0', 'G0']);
