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

    // Audio source URLs for Surahs (examples, replace with actual links)
    const audioSources = {
        'Al-Fatiha': 'https://aswaatulqurraa.com/downloads/quran-audio/quran-in-surahs/a/abdul-basit-abdulsamad/al-fatihah.mp3',
        'Al-Baqarah': 'https://aswaatulqurraa.com/downloads/quran-audio/quran-in-surahs/a/abdul-basit-abdulsamad/al-baqarah.mp3',
        // Add more Surahs as needed
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

        const items = type === 'surah' ? Object.keys(audioSources) : ['Juz 1', 'Juz 2', 'Juz 3']; // Add Juz audio sources as needed
        items.forEach(item => {
            $('#contentList').append(`<li class="list-group-item" data-audio="${audioSources[item]}">${item}</li>`);
        });

        // Click event to play audio
        $('#contentList').on('click', 'li', function() {
            const audioSource = $(this).data('audio');
            $('#audioSource').attr('src', audioSource);
            audio.load();
            audio.play();
        });
    }
});
