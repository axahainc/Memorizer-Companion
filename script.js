$(document).ready(function() {
    const audio = $('#quranAudio')[0];

    // Change playback speed
    $('#speedControl').on('change', function() {
        audio.playbackRate = parseFloat($(this).val());
    });

    // Save progress
    audio.addEventListener('pause', function() {
        localStorage.setItem('progress', audio.currentTime);
    });

    // Load progress
    $(window).on('load', function() {
        let savedTime = localStorage.getItem('progress');
        if (savedTime) {
            audio.currentTime = savedTime;
        }
    });

    // Update progress bar
    setInterval(function() {
        if (!audio.paused) {
            $('#progressBar').val((audio.currentTime / audio.duration) * 100);
        }
    }, 1000);

    // Navigation buttons
    $('#surahButton').on('click', function() {
        loadContent('surah');
    });

    $('#juzButton').on('click', function() {
        loadContent('juz');
    });

    function loadContent(type) {
        $('#content').show();
        $('#contentList').empty();
        $('#contentTitle').text(type === 'surah' ? 'Surah List' : 'Juz List');

        const items = type === 'surah' ? ['Al-Fatiha', 'Al-Baqarah', 'Al-Imran'] : ['Juz 1', 'Juz 2', 'Juz 3'];
        items.forEach(item => {
            $('#contentList').append(`<li class="list-group-item">${item}</li>`);
        });
    }
});
