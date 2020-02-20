/* jshint esversion: 6 */
const audioPlayers = document.querySelectorAll('.audio-player');
const playerNumbers = [...audioPlayers].map((player) => player.classList[1]);

class AudioPlayer {
  constructor(playerNumber) {
    this.player = document.querySelector(`.audio-player.${playerNumber}`);
    this.buttons = this.player.querySelector('.audio-buttons');
    this.progressButton = this.player.querySelector('.audio-progress-button');
    this.progressBar = this.player.querySelector('.audio-progress');
    this.audio = this.player.querySelector('.audio-file');
    this.currentPosition = this.player.querySelector('.audio-current-position p');
    this.timeRemaining = this.player.querySelector('.audio-time-remaining p');
    this.volume = this.player.querySelector('.audio-volume');
    this.volumeBar = this.player.querySelector('.audio-volumeBar');
  }

  /* Gets time info from audio object and translates it to timeRemaining text*/
  getDuration() {
    let time = Math.floor(this.audio.duration.toFixed(0)) - Math.floor(this.audio.currentTime.toFixed(0));
    this.timeRemaining.innerHTML = Math.floor(time / 60) + ":" + (time < 10 ? `0${time}` : time % 60 < 10 ? `0${time % 60}` : time % 60 ? time % 60 : '00');
    if (this.audio.duration - this.audio.currentTime === 0) {
      this.buttons.src = 'images/playbutton.svg';
    }
  }


  /* Gets time info from audio object, calls getDuration to continuously update, 
  and updates progress bar value and progress button position*/
  getTime() {
    this.currentPosition.innerHTML = Math.floor(this.audio.currentTime.toFixed(0) / 60) + ":" + (this.audio.currentTime.toFixed(0) < 10 ? `0${this.audio.currentTime.toFixed(0)}` : this.audio.currentTime.toFixed(0) % 60 < 10 ? `0${this.audio.currentTime.toFixed(0) % 60}` : this.audio.currentTime.toFixed(0) % 60 ? this.audio.currentTime.toFixed(0) % 60 : '00');
    this.getDuration();
    this.progressBar.value = (this.audio.currentTime / this.audio.duration) * 100;
    this.progressButton.style.marginLeft = `${(this.progressBar.value * 2) - 68}px`;
  }

  /* When user clicks mouse on progress bar, this skips music and object positions to event location*/
  changeLocation(event) {
    let percent = event.offsetX / event.target.offsetWidth;
    this.progressButton.style.marginLeft = `${(percent * 200) - 68}px`;
    event.target.value = percent * 100;
    this.audio.currentTime = this.audio.duration * percent;
  }

  /* Handles the play/pause button logic*/
  buttonClickHandle(event) {
    let play = 'images/playbutton.svg';
    let pause = 'images/pausebutton.svg';
    if (event.target.src.includes(play)) {
      event.target.src = pause;
      this.audio.play();
    } else {
      event.target.src = play;
      this.audio.pause();
    }
  }

  /* handles the volume icons and controls*/
  muteVolume(event) {
    let mute = 'images/volumeMute.svg';
    let volumeIcon = 'images/volumeIcon.svg';

    if (event.target.src.includes(volumeIcon)) {
      event.target.src = mute;
      this.audio.muted = true;
    } else {
      event.target.src = volumeIcon;
      this.audio.muted = false;
    }
  }

  /* makes the volume bar visible*/
  volumeBarInit() {
    this.volumeBar.style.visibility = 'visible';
  }

  /* handles the logic to change the volume when moving slider*/
  volumeChange(event) {
    this.audio.volume = event.target.value;
  }

  /* hides the volume bar when leaving the slider area or after 3 seconds */
  volumeBarHide(event) {
    if (event.target === this.volume) {
      setTimeout(() => {
        this.volumeBar.style.visibility = 'hidden';
      }, 3000);
    } else {
      this.volumeBar.style.visibility = 'hidden';
    }
  }
  initEventHandlers() {
    this.buttons.onclick = () => this.buttonClickHandle(event);
    this.audio.ontimeupdate = () =>  this.getTime(event);
    this.audio.ondurationchange = () => this.getDuration(event);
    this.progressBar.onclick = () => this.changeLocation(event);
    this.volume.onclick = () => this.muteVolume(event);
    this.volume.onmouseover = () => this.volumeBarInit(event);
    this.volumeBar.oninput = () => this.volumeChange(event);
    this.volume.onmouseleave = () => this.volumeBarHide(event);
    this.volumeBar.onmouseleave = () => this.volumeBarHide(event);
    this.volumeBar.onmouseover = () => this.volumeBarInit(event);
  }
}


let player1 = new AudioPlayer('one');
player1.initEventHandlers();

// let player2 = new AudioPlayer('two');
// player2.initEventHandlers();













/* Event listeners*/



/* to do 

1. User should be able to click somwhere on the progress bar and have that skip to a part of the song
3. user should be able to hover over the volume and have a slider appear that allows to control volume
4. user clicking on volume should mute voiume and show mutes symbol.

5. progress bar should be a different color
7. possible to have text scroll? Year, album, etc.
8. Make the design more elegant.
*/