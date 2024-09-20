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

    // Surah links from quran.com
    const surahLinks = {
        'Al-Fatiha': 'https://quran.com/1',
        'Al-Baqarah': 'https://quran.com/2',
        'Aal-E-Imran': 'https://quran.com/3',
        'An-Nisa': 'https://quran.com/4',
        'Al-Ma\'idah': 'https://quran.com/5',
        'Al-An\'am': 'https://quran.com/6',
        'Al-A\'raf': 'https://quran.com/7',
        // Add all 114 surah links here...
        'An-Nas': 'https://quran.com/114'
    };

    // Juz links from quran.com
    const juzLinks = {
        'Juz 1': 'https://quran.com/juz/1',
        'Juz 2': 'https://quran.com/juz/2',
        'Juz 3': 'https://quran.com/juz/3',
        'Juz 4': 'https://quran.com/juz/4',
        // Add all 30 Juz links here...
        'Juz 30': 'https://quran.com/juz/30'
    };

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

        const items = type === 'surah' ? Object.keys(surahLinks) : Object.keys(juzLinks);
        items.forEach(item => {
            const link = type === 'surah' ? surahLinks[item] : juzLinks[item];
            $('#contentList').append(`<li class="list-group-item"><a href="${link}" target="_blank">${item}</a></li>`);
        });
    }
});
