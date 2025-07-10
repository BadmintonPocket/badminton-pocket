document.addEventListener('DOMContentLoaded', () => {
  const navButtons = document.querySelectorAll('nav button.nav-btn');
  const sections = document.querySelectorAll('main .section');

  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      navButtons.forEach(btn => btn.classList.remove('active'));
      sections.forEach(sec => sec.classList.remove('active'));
      button.classList.add('active');
      const target = button.getAttribute('data-target');
      document.getElementById(target).classList.add('active');
    });
  });

  document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

  const videos = {
    beginner: [
      { title: "Grip Basics", url: "https://www.youtube.com/embed/dHXfWwwZySU" },
      { title: "Footwork Drill", url: "https://www.youtube.com/embed/EQzgrGwjK7c" },
      { title: "Serve Tutorial", url: "https://www.youtube.com/embed/B05jQd-6lfU" },
      { title: "Backhand Clear", url: "https://www.youtube.com/embed/3a-Rs8VE9ho" },
      { title: "Drop Shots", url: "https://www.youtube.com/embed/w6qVG4kU--k" },
      { title: "Net Shots", url: "https://www.youtube.com/embed/8KfG7ZaDn7k" },
      { title: "Simple Rallies", url: "https://www.youtube.com/embed/4JGMNkPVjSc" },
      { title: "Smash Prep", url: "https://www.youtube.com/embed/2k0lvnkhAZg" },
      { title: "Badminton Rules", url: "https://www.youtube.com/embed/zUyOSJ6vSyo" },
      { title: "Warm-Up Routine", url: "https://www.youtube.com/embed/zn83k10Go6Q" }
    ],
    intermediate: [
      { title: "Intermediate Footwork", url: "https://www.youtube.com/embed/3T3hQZ9WLOQ" },
      { title: "Net Deception", url: "https://www.youtube.com/embed/HgqB_GZ-WjY" },
      { title: "Body Smash", url: "https://www.youtube.com/embed/XdGbMJsNfwE" },
      { title: "Cross-Court Drops", url: "https://www.youtube.com/embed/AJrXMGTezM0" },
      { title: "Singles Strategy", url: "https://www.youtube.com/embed/7nOhftALQ9o" },
      { title: "Doubles Rotation", url: "https://www.youtube.com/embed/b6wOeeHbU0M" },
      { title: "Backhand Drive", url: "https://www.youtube.com/embed/KoygklsWwko" },
      { title: "Power Smash Tips", url: "https://www.youtube.com/embed/LLAaECzCRRM" },
      { title: "Defense Drill", url: "https://www.youtube.com/embed/jrHzAtLg7Pg" },
      { title: "Improve Consistency", url: "https://www.youtube.com/embed/nxV4VkiFCZs" }
    ],
    advanced: [
      { title: "Jump Smash Mastery", url: "https://www.youtube.com/embed/qFiBEkqxwnU" },
      { title: "Professional Routines", url: "https://www.youtube.com/embed/hO3Hi_U7Cgo" },
      { title: "Deceptive Flick", url: "https://www.youtube.com/embed/GEs3qicMNK0" },
      { title: "Anticipation Drill", url: "https://www.youtube.com/embed/hfgzv-Ve9Vo" },
      { title: "Pro Footwork", url: "https://www.youtube.com/embed/6aT-h68Pxzk" },
      { title: "Recovery Steps", url: "https://www.youtube.com/embed/T96Ue1kQ4MI" },
      { title: "Backhand Smash", url: "https://www.youtube.com/embed/BW5RM4LQQzw" },
      { title: "Match Mentality", url: "https://www.youtube.com/embed/Otq50FYBo2I" },
      { title: "Attack from Defense", url: "https://www.youtube.com/embed/je_3AmFpPIo" },
      { title: "Game Analysis", url: "https://www.youtube.com/embed/0T6EiF7rFqg" }
    ]
  };

  const levelSelect = document.getElementById('level-select');
  const videoList = document.getElementById('video-list');

  function loadVideos(level) {
    videoList.innerHTML = '';
    if (!videos[level]) return;
    videos[level].forEach(video => {
      const div = document.createElement('div');
      div.innerHTML = `<h3>${video.title}</h3>
      <iframe src="${video.url}" frameborder="0" allowfullscreen></iframe>`;
      videoList.appendChild(div);
    });
  }

  loadVideos(levelSelect.value);
  levelSelect.addEventListener('change', () => {
    loadVideos(levelSelect.value);
  });
});