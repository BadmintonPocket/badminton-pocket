document.addEventListener('DOMContentLoaded', () => {
  // Navigation links
  const navLinks = document.querySelectorAll('.sidebar nav ul li a');
  const sections = document.querySelectorAll('.main-content .section');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Remove active class on all links and hide all sections
      navLinks.forEach(nav => nav.classList.remove('active'));
      sections.forEach(section => section.classList.remove('active'));

      // Activate clicked link and show matching section
      link.classList.add('active');
      const targetId = link.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // Training videos data
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

  // Elements
  const videoList = document.getElementById('video-list');
  const levelSelect = document.getElementById('level-select');

  // Load videos by skill level
  function loadVideos(level) {
    videoList.innerHTML = '';
    if (!videos[level]) return;

    videos[level].forEach(video => {
      const videoDiv = document.createElement('div');
      videoDiv.innerHTML = `
        <h3>${video.title}</h3>
        <iframe src="${video.url}" frameborder="0" allowfullscreen></iframe>
      `;
      videoList.appendChild(videoDiv);
    });
  }

  // Initial video load
  loadVideos(levelSelect.value);

  // Change videos on select change
  levelSelect.addEventListener('change', e => {
    loadVideos(e.target.value);
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

  // Player list and bio elements
  const playerList = document.getElementById('player-list');
  const playerBio = document.getElementById('player-bio');

  // Generate player list items
  players.forEach((player, index) => {
    const li = document.createElement('li');
    li.textContent = player.name;
    li.tabIndex = 0; // keyboard accessible
    li.addEventListener('click', () => showPlayer(index));
    li.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') showPlayer(index);
    });
    playerList.appendChild(li);
  });

  // Show player bio and shots
  function showPlayer(index) {
    // Remove active from all player items
    [...playerList.children].forEach(li => li.classList.remove('active'));
    playerList.children[index].classList.add('active');

    const player = players[index];
    playerBio.innerHTML = `
      <h3>${player.name}</h3>
      <p>${player.bio}</p>
      <h4>Signature Shots