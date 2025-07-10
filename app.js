document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  const navButtons = document.querySelectorAll('nav button.nav-btn');
  const sections = document.querySelectorAll('main .section');

  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      console.log(`Clicked button: ${button.textContent}`);

      // Remove active from all buttons
      navButtons.forEach(btn => btn.classList.remove('active'));
      // Hide all sections
      sections.forEach(section => section.classList.remove('active'));

      // Activate clicked button & matching section
      button.classList.add('active');
      const targetId = button.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      if(targetSection) {
        targetSection.classList.add('active');
      } else {
        console.error(`No section with id '${targetId}' found!`);
      }
    });
  });

  // Video data
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

  function loadVideos(level) {
    console.log(`Loading videos for level: ${level}`);
    videoList.innerHTML = '';
    if (!videos[level]) {
      console.warn(`No videos found for level: ${level}`);
      return;
    }

    videos[level].forEach(video => {
      const videoDiv = document.createElement('div');
      videoDiv.innerHTML = `
        <h3>${video.title}</h3>
        <iframe width="320" height="180" src="${video.url}" frameborder="0" allowfullscreen></iframe>
      `;
      videoList.appendChild(videoDiv);
    });
  }

  loadVideos(levelSelect.value);

  levelSelect.addEventListener('change', (e) => {
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

  const playerList = document.getElementById('player-list');
  const playerBio = document.getElementById('player-bio');

  players.forEach((player, i) => {
    const li = document.createElement('li');
    li.textContent = player.name;
    li.tabIndex = 0; // keyboard focusable
    li.addEventListener('click', () => showPlayer(i));
    li.addEventListener('keypress', (e) => {
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

  // Dark mode toggle
  const darkModeBtn = document.getElementById('dark-mode-toggle');
  darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
  });
});