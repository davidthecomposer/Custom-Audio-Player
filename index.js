/* jshint esversion: 6 */

Class

const buttons = document.querySelector('.buttons');
const progressButton = document.querySelector('.progress-button');
const progressBar = document.querySelector('progress');
const audio = document.querySelector('audio');
const currentPosition = document.querySelector('.current-position p');
const timeRemaining = document.querySelector('.time-remaining p');
const volume = document.querySelector('.volume');
const volumeBar = document.querySelector('.volumeBar');

/* Gets time info from audio object and translates it to timeRemaining text*/

const getDuration = () => {
  let time = Math.floor(audio.duration.toFixed(0)) - Math.floor(audio.currentTime.toFixed(0));
  timeRemaining.innerHTML = Math.floor(time / 60) + ":" + (time < 10 ? `0${time}` : time % 60 < 10 ? `0${time % 60}` : time % 60 ? time % 60 : '00');
  if (audio.duration - audio.currentTime === 0) {
    buttons.src = 'images/playbutton.svg';
  }
  
};

/* Gets time info from audio object, calls getDuration to continuously update, 
and updates progress bar value and progress button position*/

const getTime = () => {
  currentPosition.innerHTML = Math.floor(audio.currentTime.toFixed(0) / 60) + ":" + (audio.currentTime.toFixed(0) < 10 ? `0${audio.currentTime.toFixed(0)}` : audio.currentTime.toFixed(0) % 60 < 10 ? `0${audio.currentTime.toFixed(0) % 60}` : audio.currentTime.toFixed(0) % 60 ? audio.currentTime.toFixed(0) % 60 : '00');
  getDuration();
  progressBar.value = (audio.currentTime / audio.duration) * 100;
  progressButton.style.marginLeft = `${(progressBar.value * 2) - 68}px`;

};

/* When user clicks mouse on progress bar, this skips music and object positions to event location*/
const changeLocation = (event) => {
  let percent = event.offsetX / event.target.offsetWidth;
  progressButton.style.marginLeft = `${(percent * 200) - 68}px`;
  event.target.value = percent * 100;
  audio.currentTime = audio.duration * percent;
};

/* Handles the play/pause button logic*/
const buttonClickHandle = (event) => {
  let play = 'images/playbutton.svg';
  let pause = 'images/pausebutton.svg';
  if (event.target.src.includes(play)) {
    event.target.src = pause;
    audio.play();


  } else {
    event.target.src = play;
    audio.pause();
  }

};
/* handles the volume icons and controls*/
const muteVolume = (event) => {
  let mute = 'images/volumeMute.svg';
  let volumeIcon = 'images/volumeIcon.svg';

  if (event.target.src.includes(volumeIcon)) {
    event.target.src = mute;
    audio.muted = true;

  }
 
  else {
    event.target.src = volumeIcon;
    audio.muted = false;
  }
};

/* makes the volume bar visible*/
const volumeBarInit = () => {
volumeBar.style.visibility = 'visible';

};

/* handles the logic to change the volume when moving slider*/
const volumeChange = (event) => {
audio.volume = event.target.value;
};

/* hides the volume bar when leaving the slider area or after 3 seconds */
const volumeBarHide = (event) => {
  if(event.target === volume) {
    setTimeout(() => {
      volumeBar.style.visibility = 'hidden';
    }, 3000);
  } else {
    volumeBar.style.visibility = 'hidden';
  }
};

/* Event listeners*/
buttons.addEventListener('click', buttonClickHandle);
audio.addEventListener('timeupdate', getTime);
audio.addEventListener('durationchange', getDuration);
progressBar.addEventListener('click', changeLocation);
volume.addEventListener('click', muteVolume);
volume.addEventListener('mouseover', volumeBarInit);
volumeBar.addEventListener('input', volumeChange);
volume.addEventListener('mouseleave', volumeBarHide);
volumeBar.addEventListener('mouseleave', volumeBarHide);
volumeBar.addEventListener('mouseover', volumeBarInit);


/* to do 

1. User should be able to click somwhere on the progress bar and have that skip to a part of the song
3. user should be able to hover over the volume and have a slider appear that allows to control volume
4. user clicking on volume should mute voiume and show mutes symbol.

5. progress bar should be a different color
7. possible to have text scroll? Year, album, etc.
8. Make the design more elegant.
*/