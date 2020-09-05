const notes = [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ];
const noteOrder = {};
notes.forEach((note, i) => {
  noteOrder[note] = i;
});

const input = document.getElementById('search-input');
const scales = getScales();
const intervals = {
  'major': [ 0, 2, 4 ], // major root position
  'minor': [ 0, 2, 4 ], // minor root position
}
let active = null;


input.onkeydown = (e) => {
  if (e.code == 'Enter') {
    let tmp = input.value.split(' ');
    let note = tmp[0].toUpperCase();
    let type = 'major';

    if (tmp[1] == 'min' || tmp[1] == 'minor') {
      type = 'minor';
    }
    // otherwise assume major
    let selected = [];
    let octave = 0;
    intervals[type].forEach((i, index) => {
      if (index && (noteOrder[scales[note + type].notes[i]]
        < noteOrder[scales[note + type].notes[intervals[type][index - 1]]])) {
          octave++;
      }
      selected.push(scales[note + type].notes[i] + octave);
    });
    active = selected;
    activeKeys(selected);
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
}

//activeKeys(['C0', 'E0', 'G0']);
