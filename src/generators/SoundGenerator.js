import { useRef, useEffect } from 'react';

import { Soundfont } from 'smplr';

import { AudioContext as StandardizedAudioContext } from 'standardized-audio-context';

const SoundGenerator = () => {
    const audioContextRef = useRef({});
    const instrumentsRef = useRef({});

    useEffect(() => {
        const loadAudioContext = async () => {
            audioContextRef.current = new StandardizedAudioContext();
        }

        const loadInstruments = async () => {
            instrumentsRef.current['piano'] = await new Soundfont(audioContextRef.current, {'instrument': 'acoustic_grand_piano', 'kit': 'FluidR3_GM'}).load;
            instrumentsRef.current['guitar'] = await new Soundfont(audioContextRef.current, {'instrument': 'acoustic_guitar_nylon', 'kit': 'FluidR3_GM'}).load;
            instrumentsRef.current['marimba'] = await new Soundfont(audioContextRef.current, {'instrument': 'marimba', 'kit': 'FluidR3_GM'}).load;
            instrumentsRef.current['violin'] = await new Soundfont(audioContextRef.current, {'instrument': 'violin', 'kit': 'FluidR3_GM'}).load;
            instrumentsRef.current['flute'] = await new Soundfont(audioContextRef.current, {'instrument': 'flute', 'kit': 'FluidR3_GM'}).load;
            instrumentsRef.current['trombone'] = await new Soundfont(audioContextRef.current, {'instrument': 'trombone', 'kit': 'FluidR3_GM'}).load;
        };

        loadAudioContext();
        loadInstruments();
    }, []);

    const stopPlaying = () => {
        for (const instrument in instrumentsRef.current) {
            instrumentsRef.current[instrument].stop();
        }
    };

    // if input is a single note, play it
    // if input is an array of notes, play them simultaneously
    // if input is an array of arrays of notes, play them sequentially with a delay
    const playNotes = (notes, duration, instrument='piano') => {
        if (Array.isArray(notes)) notes = notes.flat();
        if (typeof notes === 'number') {
            instrumentsRef.current[instrument].start({ note: notes, time: audioContextRef.current.currentTime, duration: duration });
        } else if (Array.isArray(notes)) {
            for (let note of notes) {
                instrumentsRef.current[instrument].start({ note: note, time: audioContextRef.current.currentTime, duration: duration });
            }
        }
    };

    return {
        playNotes,
        stopPlaying
    };
};

export default SoundGenerator;
