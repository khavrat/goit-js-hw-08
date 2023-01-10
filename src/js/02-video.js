import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';
let currentStorageValue = 0;

player.on('timeupdate', throttle(playerOn, 1000), true);

function playerOn(e) {
  const currentTime = e.seconds;
  localStorage.setItem(STORAGE_KEY, currentTime);

  const durationTime = e.duration;
  if (currentTime === durationTime) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function getSavedCurrentTime() {
  currentStorageValue = JSON.parse(localStorage.getItem(STORAGE_KEY));
  return currentStorageValue;
}

getSavedCurrentTime();

player
  .setCurrentTime(currentStorageValue)
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });
