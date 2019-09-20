$(document).ready(function (){
     // Create audio (context) container
    var audioCtx = new (AudioContext || webkitAudioContext)();
    
    // Table of notes with correspending keyboard codes. Frequencies are in hertz.
    // The notes start from middle C
    var notesByKeyCode = {
        65: { noteName: 'c4', frequency: 261.63, keyName: 'a', col: 'blanca' }, //blanca
        87: { noteName: 'cs', frequency: 277.18, keyName: 'w', col: 'negra'}, //negra
        83: { noteName: 'd4', frequency: 293.7, keyName: 's', col: 'blanca' }, //blanca
        69: { noteName: 'ds', frequency: 311.13, keyName: 'e', col: 'negra'}, //negra
        68: { noteName: 'e4', frequency: 329.6, keyName: 'd', col: 'blanca' }, //blanca
        70: { noteName: 'f4', frequency: 349.2, keyName: 'f', col: 'blanca' }, //blanca
        84: { noteName: 'fs', frequency: 369.99, keyName: 't', col: 'negra'}, //negra
        71: { noteName: 'g4', frequency: 392, keyName: 'g', col: 'blanca' }, //blanca
        89: { noteName: 'gs', frequency: 415.30, keyName: 'y', col: 'negra'}, //negra
        72: { noteName: 'a4', frequency: 440, keyName: 'h', col: 'blanca' }, //blanca
        85: { noteName: 'as', frequency: 466.16, keyName: 'u', col: 'negra'}, //negra
        74: { noteName: 'b4', frequency: 493.9, keyName: 'j', col: 'blanca' }, //blanca
        75: { noteName: 'c5', frequency: 523.3, keyName: 'k', col: 'blanca' }, //blanca
        79: { noteName: 'c5s', frequency: 554.37, keyName: 'o', col: 'negra'}, //negra
        76: { noteName: 'd5', frequency: 587.3, keyName: 'l', col: 'blanca' }, //blanca
        80: { noteName: 'd5s', frequency: 622.25, keyName: 'p', col: 'negra'}, //negra
        186: { noteName: 'e5', frequency: 659.3, keyName: ';', col: 'blanca' } //blanca
    };

    function Key(keyCode, noteName, keyName, frequency, col) {
        var keyHTML = document.createElement('div');
        var keySound = new Sound(frequency, 'sine');
        
        /* Cheap way to map key on touch screens */
        keyHTML.setAttribute('data-key', keyCode);

        /* Style the key */
        keyHTML.className = 'key';
        keyHTML.classList.add(col);
        keyHTML.setAttribute('id',noteName);
        keyHTML.innerHTML = noteName + '<br><span>' + keyName + '</span>';

        return {
            html: keyHTML,
            sound: keySound
        };
    }

    function Sound(frequency, type) {
        audioCtx.resume();
        this.osc = audioCtx.createOscillator(); // Create oscillator node
        this.pressed = false; // flag to indicate if sound is playing

        /* Set default configuration for sound */
        if(typeof frequency !== 'undefined') {
            /* Set frequency. If it's not set, the default is used (440Hz) */
            this.osc.frequency.value = frequency;
        }

        /* Set waveform type. Default is actually 'sine' but triangle sounds better :) */
        this.osc.type = type || 'sine';

        /* Start playing the sound. You won't hear it yet as the oscillator node needs to be
        piped to output (AKA your speakers). */
        this.osc.start(0);
    };

    Sound.prototype.play = function() {

        if(!this.pressed) {
            audioCtx.resume();
            this.pressed = true;
            this.osc.connect(audioCtx.destination);
        }
    };

    Sound.prototype.stop = function() {
        this.pressed = false;
        this.osc.disconnect();
    };

    function createKeyboard(notes, containerId) {
        var sortedKeys = []; // Placeholder for keys to be sorted
        //var waveFormSelector = document.getElementById('soundType');

        for(var keyCode in notes) {
            var note = notes[keyCode];

            /* Generate playable key */
            note.key = new Key(keyCode, note.noteName, note.keyName, note.frequency, note.col);

            /* Add new key to array to be sorted */
            sortedKeys.push(notes[keyCode]);
        }

        /* Sort keys by frequency so that they'll be added to the DOM in the correct order */
        sortedKeys = sortedKeys.sort(function(note1, note2) {
            if (note1.frequency < note2.frequency) return -1;
            if (note1.frequency > note2.frequency) return 1;

            return 0;
        });

        // Add those sorted keys to DOM
        for(var i = 0; i < sortedKeys.length; i++) {
            document.getElementById(containerId).appendChild(sortedKeys[i].key.html);
        }

        var playNote = function(event) {
            event.preventDefault();
          
            var keyCode = event.keyCode || event.target.getAttribute('data-key');

            if(typeof notesByKeyCode[keyCode] !== 'undefined') {
                // Pipe sound to output (AKA speakers)
                notesByKeyCode[keyCode].key.sound.play();

                // Highlight key playing
                notesByKeyCode[keyCode].key.html.classList.add('playing');
            }
        };

        var endNote = function(event) {
            var keyCode = event.keyCode || event.target.getAttribute('data-key');

            if(typeof notesByKeyCode[keyCode] !== 'undefined') {
                // Kill connection to output
                notesByKeyCode[keyCode].key.sound.stop();

                // Remove key highlight
                notesByKeyCode[keyCode].key.html.classList.remove('playing');
            }
        };


        // Check for changes in the waveform selector and update all oscillators with the selected type
        //waveFormSelector.addEventListener('change', setWaveform);

        window.addEventListener('keydown', playNote);
        window.addEventListener('keyup', endNote);
        window.addEventListener('mousedown', playNote);
        window.addEventListener('mouseup', endNote);
    }

    window.addEventListener('load', function() {
        createKeyboard(notesByKeyCode, 'keyboard');
    });

})
   