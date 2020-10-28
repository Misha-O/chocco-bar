let player;
const playerContainer = $(".player");

let eventsInit = () => {
  $(".player__start").click((e) => {
    e.preventDefault();

    if (playerContainer.hasClass("paused")) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  });

  $(".player__mute").click((e) => {
    e.preventDefault();

    if (playerContainer.hasClass("muted")) {
      playerContainer.removeClass("muted");
      player.unMute();
    } else {
      playerContainer.addClass("muted");
      player.mute();
    }
  });

  $(".player__volume--playback").click((e) => {
    volumeBar = $(e.currentTarget);
    const clickedVolPosition = e.originalEvent.layerX;
    newVolPositionPercent = (clickedVolPosition / volumeBar.width()) * 100;

    const newVolPosition = (player.getVolume() / 100) * newVolPositionPercent;
    console.log(newVolPosition);

    $(".player__volume--playback--btn").css({
      left: `${newVolPosition}%`,
    });
    player.setVolume(newVolPosition);
  });

  $(".player__playback").click((e) => {
    const sliderBar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    newBtnPositionPercent = (clickedPosition / sliderBar.width()) * 100;

    const newPlaybackPositionSec =
      (player.getDuration() / 100) * newBtnPositionPercent;

    $(".player__playback--btn").css({
      left: `${newBtnPositionPercent}%`,
    });
    player.seekTo(newPlaybackPositionSec);
  });

  $(".player__splash").click((e) => {
    player.playVideo();
  });
};

const timeFormat = (timeSec) => {
  const roundTime = Math.round(timeSec);
  const minutes = addZero(Math.floor(roundTime / 60));
  //   const minutes = Math.floor(roundTime % 60);
  const seconds = addZero(roundTime - minutes * 60);

  function addZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  return `${minutes} : ${seconds}`;
};

const onPlayerReady = () => {
  let interval;
  const durationSec = player.getDuration();

  $(".player__duration--estimate").text(timeFormat(durationSec));

  if (typeof interval !== undefined) {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    const completedTime = player.getCurrentTime();
    const completedPercentage = (completedTime / durationSec) * 100;

    $(".player__playback--btn").css({
      left: `${completedPercentage}%`,
    });

    $(".player__duration--completed").text(timeFormat(completedTime));
  }, 1000);
};

const onPlayerStateChange = (event) => {
  /*
  -1 (unstarted)
  0 (ended)
  1 (playing)
  2 (paused)
  3 (buffering)
  5 (video cued)
  */

  switch (event.data) {
    case 1:
      playerContainer.addClass("active");
      playerContainer.addClass("paused");
      break;

    case 2:
      playerContainer.removeClass("active");
      playerContainer.removeClass("paused");
      break;
  }
};

function onYouTubeIframeAPIReady() {
  player = new YT.Player("youtb--player", {
    height: "410",
    width: "705",
    videoId: "wAEzpwvrveg",
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      autoplay: 0,
      modestbranding: 0,
      rel: 0,
    },
  });
}
eventsInit();

// !logic
// todo 1. start with event init declaration (call it after evrt is called)
// todo 2. j save player vrb in global
// todo 3. if player has class paused -> means its playing and it needs to be stopped thus youtube method pause and remove class, else, means it is stopped and can be played -> add class paused and run youtibe method play

// todo 4.when player is ready, function onPlayerReady called, and after we can get video length
// todo 5. ytb method getduration to vrb and put that value into total time estimated

// todo 6. then func to change sec time to standard format with time in sec as parameter
// todo 7. round it with math.round(parameter) // calc total min -> math.floor (totalSec / 60) -> get remaining seconds by subtracting minutes from total time and multiplying by 60
// todo 8. return with template literals -> use this function on total time estimated inside getduration function
// todo 8. to make "0minutes" format -> create function inside timeFormat -> addZero when its parameter(num) < 10, and nothing if not (return it and use template literals)

// todo 9. vrb interval inside readyPlayer func to get elapsed time
// todo 10. if it exists (!== undefined) -> run clearInterval method
// todo 11. interval set to default function setInterval (every 1s) and use ytb getCurrentTime method / put into vrb
// todo 12. then put that value into total time completed using prev vrb

// todo 13. to move range slider calc % of time elapsed and move it accordingly
// todo 14. thus completed% = (elapsed / completed) * 100
// todo 15. then move that % your needed btn // inside interval func use jQ css and change btn position dynamically
// todo 16. add event to playback div (use already created Init)
// todo 17. by clicking get where was currentTarget, e.originalEvent.layerX into vrb
// todo 18. newBtnPositionPercent - calc what % from total
// todo 19. change css position

// todo 20. to sync slider with actual sec, start vrb with newPlaybackPosition = total time / 100 and * by newBtnPosition on slider
// todo 21.still inside that slider call player.seekTo with received vrb
// todo 22. const onPlayerStateChange and use switch and
// todo 22.
// todo 22.
