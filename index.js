/* jshint esversion: 6 */

class AudioPlayer {
	constructor(playerNumber) {
		this.allPlayers = document.querySelectorAll(".audio-player");
		this.player = document.querySelector(`.${playerNumber}`);
		this.player = document.querySelector(`.audio-player.${playerNumber}`);
		this.buttons = this.player.querySelector(".audio-buttons");
		this.progressButton = this.player.querySelector(".audio-progress-button");
		this.progressBar = this.player.querySelector(".audio-progress");
		this.audio = this.player.querySelector(".audio-file");
		this.currentPosition = this.player.querySelector(
			".audio-current-position p"
		);
		this.timeRemaining = this.player.querySelector(".audio-time-remaining p");
		this.volume = this.player.querySelector(".audio-volume");
		this.volumeBar = this.player.querySelector(".audio-volumeBar");
		this.mediaTitle = this.player.classList[1];
		this.progContainer = this.player.querySelector(".prog-button-container");
	}

	/* Gets time info from audio object and translates it to timeRemaining text*/
	getDuration() {
		let time =
			Math.floor(this.audio.duration.toFixed(0)) -
			Math.floor(this.audio.currentTime.toFixed(0));
		this.timeRemaining.innerHTML =
			Math.floor(time / 60) +
			":" +
			(time < 10
				? `0${time}`
				: time % 60 < 10
				? `0${time % 60}`
				: time % 60
				? time % 60
				: "00");
		if (this.audio.duration - this.audio.currentTime === 0) {
			this.buttons.src = "images/playbutton.svg";
		}
	}

	/* Gets time info from audio object, calls getDuration to continuously update, 
  and updates progress bar value and progress button position*/
	getTime() {
		let progressWidth = this.progressBar.clientWidth / 100;
		this.currentPosition.innerHTML =
			Math.floor(this.audio.currentTime.toFixed(0) / 60) +
			":" +
			(this.audio.currentTime.toFixed(0) < 10
				? `0${this.audio.currentTime.toFixed(0)}`
				: this.audio.currentTime.toFixed(0) % 60 < 10
				? `0${this.audio.currentTime.toFixed(0) % 60}`
				: this.audio.currentTime.toFixed(0) % 60
				? this.audio.currentTime.toFixed(0) % 60
				: "00");
		this.getDuration();
		this.progressBar.value =
			(this.audio.currentTime / this.audio.duration) * 100;
		this.progressButton.style.left = `${
			this.progressBar.value * progressWidth - 4
		}px`;
	}

	/* When user clicks mouse on progress bar, this skips music and object positions to event location*/
	changeLocation(event) {
		let progressWidth = this.progressBar.clientWidth;
		let percent = event.offsetX / event.target.offsetWidth;
		this.progressButton.style.left = `${percent * progressWidth - 4}px`;
		event.target.value = percent * 100;
		this.audio.currentTime = this.audio.duration * percent;
	}

	/* Handles the play/pause button logic*/
	buttonClickHandle(event) {
		let play = "images/playbutton.svg";
		let pause = "images/pausebutton.svg";

		if (event.target.src.includes(play)) {
			stopOtherAudio(event);
			event.target.src = pause;
			this.audio.play();
		} else {
			event.target.src = play;
			this.audio.pause();
		}
	}

	/* handles the volume icons and controls*/
	muteVolume(event) {
		let mute = "images/volumeMute.svg";
		let volumeIcon = "images/volumeIcon.svg";

		if (event.target.src.includes(volumeIcon)) {
			event.target.src = mute;
			this.audio.muted = true;
		} else {
			event.target.src = volumeIcon;
			this.audio.muted = false;
		}
	}

	/* makes the volume bar visible*/
	volumeBarInit() {}

	/* handles the logic to change the volume when moving slider*/
	volumeChange(event) {
		this.audio.volume = event.target.value;
	}

	/* hides the volume bar when leaving the slider area or after 3 seconds */
	volumeBarHide(event) {
		if (event.type === "mouseover") {
			this.volumeBar.classList.add("show");
			this.volumeBar.classList.remove("fade");
		} else {
			this.volumeBar.classList.toggle("fade");
			this.volumeBar.classList.remove("show");
		}
	}

	nextPlayer(event) {
		const audioPlayers = document.querySelectorAll(".audio-player");
		const playerNames = [...audioPlayers].map((player) => player.classList[1]);
		let nextIndex = playerNames.indexOf(this.playerNumber) + 1;

		//need a next player variable that increments by 1
		if (this.player.classList[1] === playerNames[playerNames.length - 1]) {
			allPlayersArray.playersArray[0].play();
		} else if (this.player.classList[1].includes(playerNames[0])) {
			setTimeout(function () {
				allPlayersArray.playersArray[1].play();
			}, 1000);

			//Not sure why I need this extra setTimeout. But it doesn't wor without it. Maybe it's loading too fast or something?
		} else {
			allPlayersArray.playersArray[nextIndex].play();
		}
	}
	play() {
		this.buttons.click();
	}

	initEventHandlers() {
		this.buttons.onclick = () => this.buttonClickHandle(event);
		this.audio.ontimeupdate = () => this.getTime(event);
		this.audio.ondurationchange = () => this.getDuration(event);
		this.progContainer.onclick = () => this.changeLocation(event);
		this.volume.onclick = () => this.muteVolume(event);
		this.volume.onmouseover = () => this.volumeBarHide(event);
		this.volumeBar.oninput = () => this.volumeChange(event);
		this.volume.onmouseleave = () => this.volumeBarHide(event);
		this.volumeBar.onmouseleave = () => this.volumeBarHide(event);
		this.volumeBar.onmouseover = () => this.volumeBarHide(event);
		this.audio.onended = () => this.nextPlayer();
		this.getDuration();
	}
}

/* SOME HELPER FUNCTIONS FOR AUTO PLAY, player creation etc. - Could reconfigure into larger playback object */

const allPlayersArray = {
	playersArray: [],
};

createAudioPlayers = () => {
	// Large Audio Players

	const audioPlayers = document.querySelectorAll(".audio-player");
	const playerNames = [...audioPlayers].map((player) => player.classList[1]);

	playerNames.forEach((name) => {
		let playerSpace = {};
		let player = `player${playerNames.indexOf(name) + 1}`;
		playerSpace[player] = new AudioPlayer(name);
		playerSpace[player].initEventHandlers();
		allPlayersArray.playersArray.push(playerSpace[player]);
	});
};

const nextTrack = (player) => {
	let newSpace = {};
	newSpace[player].play();
};

const stopOtherAudio = (event) => {
	const allButtons = document.querySelectorAll(".audio-buttons");
	let pause = "images/pausebutton.svg";
	let playing = [...allButtons].filter((btn) => {
		return btn.src.includes(pause);
	});
	if (playing.length > 0) {
		playing[0].click();
	}
};

createAudioPlayers();

// let player1 = new AudioPlayer('turning-point');
// player1.initEventHandlers();

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
