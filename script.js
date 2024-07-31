document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const statusElement = document.getElementById('status');

    let intervalId;
    let running = false;

    startButton.addEventListener('click', () => {
        if (running) return;

        const choices = document.getElementById('choices').value.split(',').map(choice => choice.trim());
        const interval = parseFloat(document.getElementById('interval').value) * 1000;
        const duration = parseFloat(document.getElementById('duration').value) * 60 * 1000;
        const iterations = duration / interval;

        let count = 0;
        running = true;
        statusElement.textContent = 'Running...';

        intervalId = setInterval(() => {
            if (count >= iterations || !running) {
                clearInterval(intervalId);
                running = false;
                statusElement.textContent = 'The process has finished.';
                return;
            }

            const selectedAlphabet = choices[Math.floor(Math.random() * choices.length)];
            console.log(selectedAlphabet);
            speak(selectedAlphabet);
            count++;
        }, interval);
    });

    stopButton.addEventListener('click', () => {
        running = false;
        clearInterval(intervalId);
        statusElement.textContent = 'Stopped.';
    });

    function speak(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    }
});
