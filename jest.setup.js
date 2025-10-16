global.AudioContext = global.AudioContext || function() {
    return {
        createGain: () => ({
            gain: {
                value: 1,
                linearRampToValueAtTime: jest.fn()
            }
        }),
        currentTime: 0,
        resume: jest.fn(),
        close: jest.fn(),
        state: 'running'
    };
};
