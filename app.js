// Navigation
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main .page');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    sections.forEach(s => s.classList.remove('active'));
    const target = link.getAttribute('href').substring(1);
    document.getElementById(target).classList.add('active');
  });
});

// Dark mode
const darkToggle = document.getElementById('dark-toggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkToggle.textContent = document.body.classList.contains('dark-mode')
    ? '☀️ Light Mode'
    : '🌙 Dark Mode';
});

// Video data
const videos = {
  beginner: [
    { title: "How to Return the Flick Serve", url: "https://www.youtube.com/embed/AVs3bIhdQig" },
    { title: "How to Smash (for beginners)", url: "https://www.youtube.com/embed/9gZx_6UYyo0" },
    { title: "Serve Return Positioning", url: "https://www.youtube.com/embed/JzkigWSDucw" }
  ],
  intermediate: [
    { title: "Footwork Correction Drill", url: "https://www.youtube.com/embed/7cRW_KaU-e4" },
    { title: "Improve Badminton Stamina", url: "https://www.youtube.com/embed/FPXoW-hrKxg" },
    { title: "Slice Drop Shot", url: "https://www.youtube.com/embed/6n5OqqdpY_M" }
  ],
  advanced: [
    { title: "Reading Opponent's Movement", url: "https://www.youtube.com/embed/wlTXLGBoZyA" },
    { title: "Backhand Smash Tutorial", url: "https://www.youtube.com/embed/bO9oFvKqQ20" },
    { title: "Recovery Steps in Defense", url: "https://www.youtube.com/embed/MUcwSo2a5Ng" }
  ]
};

const levelSelect = document.getElementById('level-select');
const videoList = document.getElementById('video-list');

function loadVideos(level) {
  videoList.innerHTML = '';
  if (!videos[level]) return;
  videos[level].forEach(video => {
    const div = document.createElement('div');
    div.innerHTML = `<h3>${video.title}</h3><iframe src="${video.url}" allowfullscreen></iframe>`;
    videoList.appendChild(div);
  });
}

loadVideos(levelSelect.value);
levelSelect.addEventListener('change', () => loadVideos(levelSelect.value));

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
  },
  {
    name: "Lee Zii Jia",
    bio: "Top Malaysian player known for his explosive power and agility.",
    signatureShots: ["Smash Power", "Quick Net Play", "Fast Footwork"]
  },
  {
    name: "Kento Momota",
    bio: "Japanese star famous for his defensive skills and consistency.",
    signatureShots: ["Precision Drops", "Strong Defense", "Accurate Clears"]
  }
];

const playerList = document.getElementById('player-list');
const playerBio = document.getElementById('player-bio');

players.forEach((player, index) => {
  const li = document.createElement('li');
  li.textContent = player.name;
  li.style.cursor = "pointer";
  li.style.padding = "8px";
  li.style.borderBottom = "1px solid #ccc";

  li.addEventListener('click', () => {
    [...playerList.children].forEach(child => {
      child.style.backgroundColor = '';
      child.style.color = '';
    });
    li.style.backgroundColor = '#1e88e5';
    li.style.color = 'white';

    playerBio.innerHTML = `
      <h3>${player.name}</h3>
      <p>${player.bio}</p>
      <h4>Signature Shots:</h4>
      <ul>
        ${player.signatureShots.map(shot => `<li>${shot}</li>`).join('')}
      </ul>
    `;
  });

  playerList.appendChild(li);
});

// Select first player by default
if (playerList.children.length > 0) {
  playerList.children[0].click();
}