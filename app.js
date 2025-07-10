document.addEventListener('DOMContentLoaded', () => {
  // Nav Switching
  const links = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      links.forEach(l => l.classList.remove('active'));
      pages.forEach(p => p.classList.remove('active'));

      link.classList.add('active');
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.classList.add('active');
    });
  });

  // Dark Mode Toggle
  const darkToggle = document.getElementById('dark-toggle');
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    darkToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  });

  // Video Loader
  const videos = {
    beginner: [
      { title: "Basic Grip", url: "https://www.youtube.com/embed/VcQ9b-1NOqA" },
      { title: "Footwork Drills", url: "https://www.youtube.com/embed/ZjZ8PyBfEEk" },
      { title: "Serve Technique", url: "https://www.youtube.com/embed/5NXYlDbWy58" },
      { title: "Backhand Basics", url: "https://www.youtube.com/embed/Yu4WgK6JVeA" },
      { title: "Lunges", url: "https://www.youtube.com/embed/VOX05L8C_LU" },
      { title: "Warm-Up", url: "https://www.youtube.com/embed/l9A6ZMMd2SM" },
      { title: "Net Shots", url: "https://www.youtube.com/embed/XA9WFLZ8QgA" },
      { title: "Basic Drills", url: "https://www.youtube.com/embed/oXJkvy43IYk" },
      { title: "Beginner Rallies", url: "https://www.youtube.com/embed/lMrDkf9DAkk" },
      { title: "Forehand Drive", url: "https://www.youtube.com/embed/l5D-fhH01-M" }
    ],
    intermediate: [
      { title: "Smash Techniques", url: "https://www.youtube.com/embed/8oXYlr_pH3o" },
      { title: "Drop Shots", url: "https://www.youtube.com/embed/x9dxpeJ6GvQ" },
      { title: "Deception Basics", url: "https://www.youtube.com/embed/zJj0-RfL-VY" },
      { title: "Net Kill", url: "https://www.youtube.com/embed/qBh0KOukEyY" },
      { title: "Racket Grips", url: "https://www.youtube.com/embed/DBF9ofSdzHI" },
      { title: "Movement Drills", url: "https://www.youtube.com/embed/UThDUL7H5uo" },
      { title: "Midcourt Control", url: "https://www.youtube.com/embed/X7I9HIMIEr4" },
      { title: "Smash Recovery", url: "https://www.youtube.com/embed/NbcAFGIVvqs" },
      { title: "Backhand Smash", url: "https://www.youtube.com/embed/hHaJrH7u9IY" },
      { title: "Push Defense", url: "https://www.youtube.com/embed/IWg0lK6XY9Q" }
    ],
    advanced: [
      { title: "Deception Mastery", url: "https://www.youtube.com/embed/2k0lvnkhAZg" },
      { title: "Mental Strength", url: "https://www.youtube.com/embed/Otq50FYBo2I" },
      { title: "Fast Pace Rallies", url: "https://www.youtube.com/embed/9pWZAnEaywU" },
      { title: "Net Feints", url: "https://www.youtube.com/embed/CULp3Qe7ugU" },
      { title: "Jump Smash", url: "https://www.youtube.com/embed/Whg9eMgDRLw" },
      { title: "Defense Recovery", url: "https://www.youtube.com/embed/Ak8CWbObL3U" },
      { title: "Pro-Level Stamina", url: "https://www.youtube.com/embed/vnI3e-YKzp8" },
      { title: "Crosscourt Deception", url: "https://www.youtube.com/embed/Jm7bA7Nv0j0" },
      { title: "Advanced Strategy", url: "https://www.youtube.com/embed/WKEMGEbcdFo" },
      { title: "Doubles Rotation", url: "https://www.youtube.com/embed/krF-3zI8s8c" }
    ]
  };

  const levelSelect = document.getElementById('level-select');
  const videoList = document.getElementById('video-list');

  function loadVideos(level) {
    videoList.innerHTML = '';
    if (!videos[level]) return;

    videos[level].forEach(video => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${video.title}</h3>
        <iframe width="320" height="180" src="${video.url}" frameborder="0" allowfullscreen></iframe>
      `;
      videoList.appendChild(div);
    });
  }

  levelSelect.addEventListener('change', () => {
    loadVideos(levelSelect.value);
  });

  loadVideos(levelSelect.value); // Initial load

  // Player Bios — placeholder structure for future expansion
  const players = [
    {
      name: "Lin Dan",
      bio: "Two-time Olympic champion known for his powerful smashes and net control."
    },
    {
      name: "Lee Zii Jia",
      bio: "Malaysian star with explosive movement and deadly jump smashes."
    },
    {
      name: "Kento Momota",
      bio: "Japan’s finesse master with deceptive shots and strategic precision."
    }
  ];

  const playerList = document.getElementById('player-list');
  const playerBio = document.getElementById('player-bio');

  if (playerList && playerBio) {
    players.forEach((player, i) => {
      const li = document.createElement('li');
      li.textContent = player.name;
      li.addEventListener('click', () => showPlayer(i));
      playerList.appendChild(li);
    });

    function showPlayer(index) {
      const player = players[index];
      playerBio.innerHTML = `<h3>${player.name}</h3><p>${player.bio}</p>`;
    }
  }
});