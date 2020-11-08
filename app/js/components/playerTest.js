let player;
const playerContainer = document.querySelector(".player");

function onYouTubeIframeAPIReady() {
  player = new YT.Player("youtb--player", {
    height: "410",
    width: "705",
    videoId: "IUN664s7N-c",
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
    playerVars: {
      disablekb: 0,
      showinfo: 0,
      autoplay: 0,
      modestbranding: 0,
      rel: 0,
    },
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

let done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}
