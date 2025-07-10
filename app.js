document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main .page');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = link.getAttribute('href').substring(1);

      navLinks.forEach(l => l.classList.remove('active'));
      sections.forEach(sec => sec.classList.remove('active'));

      link.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });

  const videos = {
    beginner: [
      { title: "Grip Basics", url: "https://www.youtube.com/embed/Ld6Wyb1B_XA" },
      { title: "Stance & Footwork", url: "https://www.youtube.com/embed/Wz0vpf3LU5s" },
      { title: "Overhead Clear", url: "https://www.youtube.com/embed/JKZs-UutkU4" },
      { title: "Drop Shot", url: "https://www.youtube.com/embed/QRYG-ZwnhJg" },
      { title: "Drive Shot", url: "https://www.youtube.com/embed/z-fP6RBWBQ4" },
      { title: "Net Play", url: "https://www.youtube.com/embed/MboDJh0a1nY" },
      { title: "Low Serve", url: "https://www.youtube.com/embed/k6ooGAKyUpA" },
      { title: "High Serve", url: "https://www.youtube.com/embed/BThBgHxaQqs" },
      { title: "Basic Defense", url: "https://www.youtube.com/embed/0ZVYK8rkpDA" },
      { title: "Shadow Drills", url: "https://www.youtube.com/embed/qqh8Z5Xz9Xg" }
    ],
    intermediate: [
      { title: "Smash Technique", url: "https://www.youtube.com/embed/8oXYlr_pH3o" },
      { title: "Recovery Footwork", url: "https://www.youtube.com/embed/HrSwYxY5IYc" },
      { title: "Backhand Clear", url: "https://www.youtube.com/embed/Z--yFMJhK5g" },
      { title: "Push Defense", url: "https://www.youtube.com/embed/mB8MCEi5RRM" },
      { title: "Split Step Drill", url: "https://www.youtube.com/embed/N1aa5N-MxCg" },
      { title: "Smash Return", url: "https://www.youtube.com/embed/OefV1sVKH4s" },
      { title: "Lift from Net", url: "https://www.youtube.com/embed/08mCg4cZmrA" },
      { title: "Crosscourt Drop", url: "https://www.youtube.com/embed/kGr2PfDFhzk" },
      { title: "Racket Grip Change", url: "https://www.youtube.com/embed/pHyAxVCG7sM" },
      { title: "Recovery Patterns", url: "https://www.youtube.com/embed/XPKL5u-bOlg" }
    ],
    advanced: [
      { title: "Deception Shots", url: "https://www.youtube.com/embed/2k0lvnkhAZg" },
      { title: "Advanced Net Play", url: "https://www.youtube.com/embed/4W9sLhSmX9I" },
      { title: "Jump Smash", url: "https://www.youtube.com/embed/nKb-EGgNWDQ" },
      { title: "Flick Serve", url: "https://www.youtube.com/embed/T1qBLbJKM30" },
      { title: "Wrist Training", url: "https://www.youtube.com/embed/cFrgwprhxz8" },
      { title: "Fast Recovery", url: "https://www.youtube.com/embed/W8US-YFmu8c" },
      { title: "Game Strategy", url: "https://www.youtube.com/embed/0LUevv93aFM" },
      { title: "Cross Smash", url: "https://www.youtube.com/embed/JrpoPxtSzZ8" },
      { title: "Backhand Smash", url: "https://www.youtube.com/embed/Otq50FYBo2I" },
      { title: "Mental Training", url: "https://www.youtube.com/embed/Lq1zR7ptWng" }
    ]
  };

  const videoList = document.getElementById('video-list');
  const levelSelect = document.getElementById('level-select');

  function loadVideos(level) {
    videoList.innerHTML = '';
    videos[level].forEach(video => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>${video.title}</h3>
        <iframe src="${video.url}" frameborder="0" allowfullscreen></iframe>
      `;
      videoList.appendChild(div);
    });
  }

  levelSelect.addEventListener('change', () => {
    loadVideos(levelSelect.value);
  });

  loadVideos(levelSelect.value); // Initial load

  const darkBtn = document.getElementById('dark-toggle');
  darkBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
});