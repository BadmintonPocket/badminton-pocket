// Tab navigation
document.querySelectorAll('button.nav-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('button.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    button.classList.add('active');
    document.getElementById(button.getAttribute('data-target')).classList.add('active');
  });
});

// Videos data
const videos = {
  beginner: [
    { title: "Basic Grip & Stance", url: "https://www.youtube.com/embed/VcQ9b-1NOqA" },
    { title: "Footwork Drills", url: "https://www.youtube.com/embed/ZjZ8PyBfEEk" },
    { title: "Basic Serve Technique", url: "https://www.youtube.com/embed/5NXYlDbWy58" }
  ],
  intermediate: [
    { title: "Smash Techniques", url: "https://www.youtube.com/embed/8oXYlr_pH3o" },
    { title: "Drop Shots & Net Play", url: "https://www.youtube.com/embed/x9dxpeJ6GvQ" },
    { title: "Advanced Footwork", url: "https://www.youtube.com/embed/3T3hQZ9WLOQ" }
  ],
  advanced: [
    { title: "Deception Shots", url: "https://www.youtube.com/embed/2k0lvnkhAZg" },
    { title: "Mental Toughness", url: "https://www.youtube.com/embed/Otq50FYBo2I" },
    { title: "Speed & Agility", url: "https://www.youtube.com/embed/W8US-YFmu8c" }
  ]
};

const videoList = document.getElementById('video-list');
const levelSelect = document.getElementById('level-select');

// Load videos for selected level
function loadVideos(level) {
  videoList.innerHTML = '';
  if (!videos[level]) return;
  videos[level].forEach(video => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${video.title}</h3>
      <iframe src="${video.url}" allowfullscreen></iframe>
    `;
    videoList.appendChild(div);
  });
}

loadVideos(levelSelect.value);

levelSelect.addEventListener('change', () => {
  loadVideos(levelSelect.value);
});

// Players data
const players = [
  {
    name: "Lin Dan",
    bio: "Two-time Olympic champion and one of the greatest badminton players of all time.",
    signatureShots: ["Powerful Smash", "Fast Drop Shot", "Deceptive Net Play"]
  },
  {
    name: "Carolina Marin",
    bio: "Olympic gold medalist known for her aggressive playing style and speed.",
    signatureShots: ["Fast Drive", "Crosscourt Smash", "Net Kill"]
  },
  {
    name: "Viktor Axelsen",
    bio: "World Champion known for his tall stature and strong overhead shots.",
    signatureShots: ["Heavy Smash", "Clear Shot", "Net Shot"]
  }
];

const playerList = document.getElementById('player-list');
const playerBio = document.getElementById('player-bio');

players.forEach((player, i) => {
  const li = document.createElement('li');
  li.textContent = player.name;
  li.tabIndex = 0; // keyboard accessible
  li.style.cursor = 'pointer';
  li.addEventListener('click', () => showPlayer(i));
  li.addEventListener('keypress', e => {
    if (e.key === 'Enter') showPlayer(i);
  });
  playerList.appendChild(li);
});

function showPlayer(index) {
  [...playerList.children].forEach(li => li.classList.remove('active'));
  playerList.children[index].classList.add('active');

  const player = players[index];
  playerBio.innerHTML = `
    <h3>${player.name}</h3>
    <p>${player.bio}</p>
    <h4>Signature Shots:</h4>
    <ul>
      ${player.signatureShots.map(shot => `<li>${shot}</li>`).join('')}
    </ul>
  `;
}