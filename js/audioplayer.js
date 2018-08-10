const playlist = [
    {
        band: "Oï chante Higelin",
        title: "Grain de poussière",
        file: "music/grain-de-poussiere.mp3"
    },
    {
        band: "Oï chante Higelin",
        title: "Champagne",
        file: "music/champagne.mp3"
    },
    {
        band: "Oï chante Higelin",
        title: "La rage en d'dans",
        file: "music/la-rage-en-ddans.mp3"
    },
    {
        band: "Oï chante Higelin",
        title: "Victoria",
        file: "music/victoria.mp3"
    },
    {
        band: "Oï chante Higelin",
        title: "Tombé du ciel",
        file: "music/tombe-du-ciel.mp3"
    }
]

/*----------------------------*\
    Declare global variables
\*----------------------------*/

const audio = document.querySelector("audio")
    , ul = document.querySelector(".audio-list ul")
    , titleOfCurrentSong = document.querySelector(".audio-player .title")
    , button = document.querySelector(".button")
    , buttonImg = document.querySelector(".button img")
    , progressBar = document.querySelector(".progress")
    , spanCurrentTime = document.querySelector("span.current-time")

var getMinutes
  , getSeconds
  , length
  , allAudios

/*--------------------------------------*\
    Insert the songs into the playlist
\*--------------------------------------*/

for (let song of playlist) {
    let li = document.createElement("li")
    let spanTitle = document.createElement("span")
    let spanDuration = document.createElement("span")
    let fakeAudio = document.createElement("audio")
    spanTitle.className = "title"
    spanDuration.className = "duration"
    fakeAudio.src = `${song.file}`
    spanTitle.appendChild(document.createTextNode(`${song.band} - ${song.title}`))
    li.appendChild(spanTitle)
    li.appendChild(spanDuration)
    li.appendChild(fakeAudio)
    ul.appendChild(li)
    allAudios = document.querySelectorAll(".audio-list audio")
}

/*---------------*\
    Play a song
\*---------------*/

playThisSong = whichSong => {
    audio.src = playlist[whichSong].file
    titleOfCurrentSong.textContent = playlist[whichSong].title
    play()
    // remove the active class from all songs
    for (let li of ul.children) {
        li.firstElementChild.classList.remove("active")
    }
}

/***** Select a song in the playlist *****/

for (var i = 0; i < ul.children.length; i++) {
    ((index) => {
        ul.children[i].onclick = function(){
            let indexOfClickedSong = index
            playThisSong(indexOfClickedSong)
            this.firstElementChild.classList.add("active")
        }
    })(i);
}

/***** Loop to the next song when audio is ended *****/

audio.addEventListener("ended", function() {
    let active = document.querySelector(".active")
    let allSongs = Array.from(ul.children)
    let indexOfCurrentSong = allSongs.indexOf(active.parentElement)
    playThisSong(indexOfCurrentSong + 1)
    allSongs[indexOfCurrentSong + 1].firstElementChild.classList.add("active")
});

/***** Select by default the first song in the playlist *****/

document.addEventListener("DOMContentLoaded", function(event) {
    playThisSong(0)
    pause()
    document.querySelector(".audio-list ul li .title").classList.add("active")
});

/*--------------------*\
    Audio play/pause
\*--------------------*/

// play the audio + change button image to pause symbol
const play = () => {
    button.classList.remove("play")
    button.classList.add("pause")
    buttonImg.src = "img/pause.svg"
    audio.play()
}

// pause the audio + change button image to play symbol
const pause = () => {
    button.classList.remove("pause")
    button.classList.add("play")
    buttonImg.src = "img/play.svg"
    audio.pause()
}

// trigger the play/pause functions when clicking the button
button.addEventListener("click", function() {
    button.classList.contains("play") ? play() : pause()
})

/*-------------------*\
    Time formatting
\*-------------------*/

const timeFormat = (minutes, seconds) => {
    seconds < 10 ? seconds = `0${seconds}` : seconds = seconds
    if (minutes < 1) {
        return "00:" + seconds
    } else if (minutes > 1 && minutes < 10) {
        return "0" + minutes + ":" + seconds
    } else {
        return minutes + ":" + seconds
    }
}

/*----------------------------*\
    Get audio files duration
\*----------------------------*/

const convertToMinutesAndSeconds = (value) => {
    getMinutes = Math.floor(value / 60)
    getSeconds = Math.floor(value % 60)
}

// get current audio file duration
audio.addEventListener("loadedmetadata", function() {
    convertToMinutesAndSeconds(audio.duration)
    document.querySelector(".audio-infos .duration").textContent = timeFormat(getMinutes, getSeconds)
});

// get all audio files duration
for (let audio of allAudios) {
    audio.addEventListener("loadedmetadata", function() {
        length += audio.duration
        convertToMinutesAndSeconds(audio.duration)
        audio.previousElementSibling.textContent = timeFormat(getMinutes, getSeconds)
        // get total length of playlist
        convertToMinutesAndSeconds(length)
        document.querySelector(".playlist-length span").textContent = timeFormat(getMinutes, getSeconds)
    })
}

/*-------------------------------------------*\
    Get the current audio file current time
\*-------------------------------------------*/

const audioUpdate = (audio) => {
    let currentTime = Math.floor(audio.currentTime)
      , currentMinutes
      , currentSeconds
      , getTotal = (getMinutes * 60) + getSeconds
    // progress bar
    progressBar.style.width = Math.floor((currentTime * 100) / getTotal) + "%"
    // current time formatting : minutes and seconds
    currentTime >= 60 ?
        (currentMinutes = Math.floor(currentTime / 60), currentSeconds = currentTime % 60) :
        (currentMinutes = 0, currentSeconds = currentTime)
    // current time formatting : leading zero
    spanCurrentTime.textContent = timeFormat(currentMinutes, currentSeconds)
}
