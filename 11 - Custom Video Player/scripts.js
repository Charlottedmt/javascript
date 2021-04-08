// Get the Elements //

const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const full = player.querySelector(".full");


// build the functions //

const togglePlay = () => {
  if(video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

const updateButton = (event) => {
  const icon = event.currentTarget.paused ? '►' : '❚ ❚';
  toggle.innerText = icon;
}

const skip = (event) => {
  const skipValue = parseFloat(event.currentTarget.dataset.skip)
  const newSkip = video.currentTime + skipValue;
  video.currentTime = newSkip;
}

const handleRangeUpdate = (event) => {
  video[event.currentTarget.name] = event.currentTarget.value;
}

const handleProgress = (event) => {
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%` ;
}

const scrub = (event) => {
  const scrubTime = (event.offsetX / progress.offsetWidth) * 100
  video.currentTime = (scrubTime * video.duration) / 100
}

const fullScreen = (event) => {
  video.requestFullscreen();
}

toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('pause', updateButton);
video.addEventListener('play', updateButton);
skipButtons.forEach((button) => {
  button.addEventListener('click', skip);
})
ranges.forEach((range) => {
  range.addEventListener('change', handleRangeUpdate )
  range.addEventListener('mousemove', handleRangeUpdate)
})
video.addEventListener('timeupdate', handleProgress);

let mousedown = false
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => { mousedown = true });
progress.addEventListener('mouseup', () => { mousedown = false });

full.addEventListener('click', fullScreen);


