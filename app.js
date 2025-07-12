document.addEventListener('DOMContentLoaded', () => {
  try {
    // 1) Sidebar toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', () =>
        document.body.classList.toggle('sidebar-open')
      );
    }

    // 2) Dark mode
    const darkToggle = document.getElementById('dark-toggle');
    if (darkToggle) {
      darkToggle.addEventListener('click', () => {
        const dark = document.body.classList.toggle('dark-mode');
        darkToggle.textContent = dark ? '☀️ Light Mode' : '🌙 Dark Mode';
      });
    }

    // 3) Tab navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const pages    = document.querySelectorAll('.page');
    navLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        pages.forEach(p => p.classList.remove('active'));
        link.classList.add('active');
        const id = link.getAttribute('href').substring(1);
        const page = document.getElementById(id);
        if (page) page.classList.add('active');

        if (window.innerWidth < 768)
          document.body.classList.remove('sidebar-open');
      });
    });

    // 4) Player cards
    const playerLinks = document.querySelectorAll('.player-link');
    playerLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelectorAll('.player-card').forEach(c => c.hidden = true);
        const card = document.getElementById(link.dataset.id);
        if (card) card.hidden = false;
      });
    });

    // 5) Video library loader
    const levelSelect = document.getElementById('level-select');
    const videoList   = document.getElementById('video-list');
    const videos = {
      beginner: [ /* your full beginner array */ ],
      intermediate: [ /* your full intermediate array */ ],
      advanced: [ /* your full advanced array */ ],
      footwork: [ /* your full footwork array */ ],
      strategy: [ /* your full strategy array */ ],
    };
    function loadVideos(cat) {
      if (!videoList) return;
      videoList.innerHTML = '';
      (videos[cat] || []).forEach(v => {
        const div = document.createElement('div');
        div.innerHTML = `<h3>${v.title}</h3>
                         <iframe src="${v.url}" allowfullscreen></iframe>`;
        videoList.appendChild(div);
      });
    }
    if (levelSelect) {
      levelSelect.addEventListener('change', () => loadVideos(levelSelect.value));
      loadVideos(levelSelect.value);
    }

    // 6) Workouts renderer
    const workoutSelect = document.getElementById('workout-level-select');
    const workoutPlan   = document.getElementById('workout-plan');
    const workouts = {
      beginner: { /* ... */ },
      intermediate: { /* ... */ },
      advanced: { /* ... */ }
    };
    function renderWorkouts(lvl) {
      if (!workoutPlan) return;
      workoutPlan.innerHTML = '';
      Object.entries(workouts[lvl] || {}).forEach(([day, exs]) => {
        const w = document.createElement('div');
        w.className = 'workout-day';
        w.innerHTML = `<h3>${day}</h3>
                       <ul>${exs.map(x => `<li>${x}</li>`).join('')}</ul>`;
        workoutPlan.appendChild(w);
      });
    }
    if (workoutSelect) {
      workoutSelect.addEventListener('change', () => renderWorkouts(workoutSelect.value));
      renderWorkouts(workoutSelect.value);
    }

    // 7) Film analyzer (MoveNet)
    const upload     = document.getElementById('video-upload');
    const gameVideo  = document.getElementById('game-video');
    const frameCanvas= document.getElementById('frame-canvas');
    const analyzeBtn = document.getElementById('analyze-btn');
    const analysisOut= document.getElementById('analysis-result');

    if (upload && gameVideo && frameCanvas && analyzeBtn && analysisOut) {
      ;(async () => {
        const detector = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
          { modelType: 'SinglePose.Lightning' }
        );

        upload.addEventListener('change', e => {
          const file = e.target.files[0];
          if (file) gameVideo.src = URL.createObjectURL(file);
        });

        async function analyzeFilm() {
          frameCanvas.width  = gameVideo.videoWidth;
          frameCanvas.height = gameVideo.videoHeight;
          const ctx = frameCanvas.getContext('2d');
          let sumY = 0, count = 0;

          for (let t = 0; t < gameVideo.duration; t += 0.5) {
            gameVideo.currentTime = t;
            await new Promise(r => (gameVideo.onseeked = r));
            ctx.drawImage(gameVideo, 0, 0);
            const poses = await detector.estimatePoses(gameVideo);
            const kp = poses[0]?.keypoints
              .find(pt => pt.name === 'left_elbow' && pt.score > 0.4);
            if (kp) {
              sumY += kp.y;
              count++;
            }
          }
          return count ? (sumY / count).toFixed(1) : null;
        }

        analyzeBtn.addEventListener('click', async () => {
          const avgY = await analyzeFilm();
          analysisOut.textContent = avgY
            ? `Avg left-elbow Y: ${avgY}px`
            : 'Could not detect keypoints.';
        });
      })();
    }

    // 8) (Optional) HuggingFace embed needs no JS hooks

  } catch (err) {
    console.error('App initialization error:', err);
  }
});