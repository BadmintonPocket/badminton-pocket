document.addEventListener('DOMContentLoaded', () => {
  // 1) Greeting
  let username = localStorage.getItem('bp_username');
  if (!username) {
    username = prompt('Enter your name:') || 'Guest';
    localStorage.setItem('bp_username', username);
  }
  document.getElementById('user-greeting').textContent =
    `Logged in as ${username}`;

  // 2) Sidebar toggle
  document.getElementById('sidebar-toggle')
    ?.addEventListener('click', () =>
      document.body.classList.toggle('sidebar-open')
    );

  // 3) Dark-mode toggle
  const darkToggle = document.getElementById('dark-toggle');
  const updateDarkText = () => {
    darkToggle.textContent = document.body.classList.contains('dark-mode')
      ? '☀️ Light Mode'
      : '🌙 Dark Mode';
  };
  darkToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    updateDarkText();
  });
  updateDarkText();

  // 4) Tab navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.nav-link').forEach(x => x.classList.remove('active'));
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      link.classList.add('active');
      document.getElementById(link.getAttribute('href').slice(1))
        ?.classList.add('active');
      if (window.innerWidth < 768) document.body.classList.remove('sidebar-open');
    });
  });

  // 5) Player cards
  document.querySelectorAll('.player-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.player-card').forEach(c => c.hidden = true);
      document.getElementById(link.dataset.id).hidden = false;
    });
  });

  // 6) Video library
  const videos = {
    beginner: [
      { title: "Your Shots Are WAY Too Predictable!", url: "https://www.youtube.com/embed/gqIsUa4gCz4" },
      { title: "Master Overhead Pronation",       url: "https://www.youtube.com/embed/JzkigWSDucw" },
      { title: "Dry Swing Perfection",             url: "https://www.youtube.com/embed/GolGwsK9Nxg" },
      { title: "Forehand Net Cross-Court",         url: "https://www.youtube.com/embed/w4us5HVuFgg" },
      { title: "Backhand Drive Basics",            url: "https://www.youtube.com/embed/SoXecwpUKnE" },
      { title: "Grip Hacks You Need",              url: "https://www.youtube.com/embed/pGd56ZQwAvE" },
      { title: "Beginner Defensive Tips",          url: "https://www.youtube.com/embed/zDzsdU4LO0g" }
    ],
    intermediate: [
      { title: "Dropshot Improvement", url: "https://www.youtube.com/embed/WY9tbZTuS_c" },
      { title: "Fix Your Stance",      url: "https://www.youtube.com/embed/S6idcFJ2Ym8" },
      { title: "Net Lift Variations",  url: "https://www.youtube.com/embed/qy4XJ3ZGkcE" },
      { title: "Overhead Swing Phases",url: "https://www.youtube.com/embed/eVNY8r6Oeek" },
      { title: "Backhand Angle Drills",url: "https://www.youtube.com/embed/fCq-SO6rixQ" },
      { title: "Consistency Drills",   url: "https://www.youtube.com/embed/K88F95osw0I" },
      { title: "Tactics & Court Control", url: "https://www.youtube.com/embed/MrvYbLAnecY" }
    ],
    advanced: [
      { title: "Lee vs Bullet Smasher Breakdown", url: "https://www.youtube.com/embed/xWyMt08KWJY" },
      { title: "Lin Dan Olympics 2008",           url: "https://www.youtube.com/embed/FF86j8I-ndM" },
      { title: "Match of the Century",            url: "https://www.youtube.com/embed/R9cd-RwuFk8" },
      { title: "Momota Footwork Secrets",         url: "https://www.youtube.com/embed/osptHe5dyPM" },
      { title: "2019 Strategic Insights",         url: "https://www.youtube.com/embed/yxBVlMncudg" }
    ],
    footwork: [
      { title: "Lin Dan’s Legendary Steps", url: "https://www.youtube.com/embed/CBgcPzbA9Kw" },
      { title: "8 Speed Steps",             url: "https://www.youtube.com/embed/0E6mm6PgeY4" },
      { title: "Ladder & Hopscotch Combo",  url: "https://www.youtube.com/embed/jNdlYBI5ZGU" }
    ],
    strategy: [
      { title: "Must-Master Deceptions",       url: "https://www.youtube.com/embed/z5L7SWuj860" },
      { title: "Court Control Tactics",        url: "https://www.youtube.com/embed/MrvYbLAnecY" },
      { title: "Tournament Mindset Prep",      url: "https://www.youtube.com/embed/R0rsw3mRTOA" }
    ]
  };

  const lvlSel = document.getElementById('level-select');
  const vList  = document.getElementById('video-list');

  function loadVideos(cat) {
    if (!vList) return;
    vList.innerHTML = '';
    (videos[cat] || []).forEach(v => {
      const div = document.createElement('div');
      div.innerHTML = `<h3>${v.title}</h3>
                       <iframe src="${v.url}" allowfullscreen></iframe>`;
      vList.appendChild(div);
    });
  }
  if (lvlSel) {
    lvlSel.addEventListener('change', () => loadVideos(lvlSel.value));
    loadVideos(lvlSel.value);
  }

  // 7) Workouts
  const workouts = {
    beginner: {
      Monday:   ['10 min jog + leg swings', '4×30s shuttle runs', '3×15 lunges', '5 min 4-corner footwork'],
      Tuesday:  ['3×15 squats', '3×10 push-ups', '3×20s plank', '5 min shadow split-step'],
      Wednesday:['5×30s side-shuffles', '3×12 single-leg deadlifts', '5 min hopscotch'],
      Thursday: ['3×10 rows', '3×12 press', '3×20 Russian twists'],
      Friday:   ['10 min run', '4×30s high knees', '30 shadow net swings & 30 clears'],
      Saturday: ['4×5 min rally practice', '10 min cooldown & stretch']
    },
    intermediate: {
      Monday:   ['15 min intervals', '5×40m shuttle sprints', '5 min cross-court clears'],
      Tuesday:  ['4×8 goblet squats', '4×10 rows', '3×20 Russian twists'],
      Wednesday:['3×8 box jumps', '5 min agility ladder', '3×15 lateral bounds'],
      Thursday: ['4×8 pull-ups', '4×10 diamond push-ups', '3×12 dips', '3×30s side-plank'],
      Friday:   ['10 min tempo run', '3×20 fly-runs', '30 drive drills'],
      Saturday: ['30 min multi-shuttle', '15 min tactical rally', '10 min stretch']
    },
    advanced: {
      Monday:   ['20 min intervals', '6×50m sprints', '4×8 eight-corner'],
      Tuesday:  ['5×5 back squats', '4×6 deadlifts', '4×8 lunges', '4×15 wipers'],
      Wednesday:['4×6 depth jumps', '10 min advanced ladder', '4×8 bounding'],
      Thursday: ['5×5 push-press', '4×8 weighted pull-ups', '4×10 dips', '3×60s hollow hold'],
      Friday:   ['10 min run + 5×20m fly-runs', '30 flick returns', '30 smash drills'],
      Saturday: ['Best-of-three matches', '15 min cooldown']
    }
  };
  const wSel = document.getElementById('workout-level-select');
  const wPlan= document.getElementById('workout-plan');
  function renderW(lvl) {
    if (!wPlan) return;
    wPlan.innerHTML = '';
    Object.entries(workouts[lvl] || {}).forEach(([day, exs]) => {
      const d = document.createElement('div');
      d.className = 'workout-day';
      d.innerHTML = `<h3>${day}</h3><ul>${exs.map(x=>`<li>${x}</li>`).join('')}</ul>`;
      wPlan.appendChild(d);
    });
  }
  if (wSel) {
    wSel.addEventListener('change', () => renderW(wSel.value));
    renderW(wSel.value);
  }

  // 8) Film Analysis (single-frame midpoint)
  const upload   = document.getElementById('video-upload');
  const gameVid  = document.getElementById('game-video');
  const canvas   = document.getElementById('frame-canvas');
  const analyze  = document.getElementById('analyze-btn');
  const out      = document.getElementById('analysis-result');
  if (upload && gameVid && canvas && analyze && out) {
    (async () => {
      let detector;
      try {
        detector = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
          { modelType: 'SinglePose.Lightning' }
        );
      } catch {
        out.textContent = 'Model load failed.';
        return;
      }
      upload.addEventListener('change', e => {
        const f = e.target.files[0];
        if (f) gameVid.src = URL.createObjectURL(f);
      });
      analyze.addEventListener('click', async () => {
        out.textContent = 'Processing…';
        await new Promise(r => gameVid.onloadedmetadata = r);
        gameVid.pause();
        canvas.width  = gameVid.videoWidth;
        canvas.height = gameVid.videoHeight;
        const ctx = canvas.getContext('2d');
        gameVid.currentTime = gameVid.duration / 2;
        await new Promise(r => gameVid.addEventListener('seeked', r, { once: true }));
        ctx.drawImage(gameVid, 0, 0);
        const poses = await detector.estimatePoses(gameVid).catch(() => []);
        const pts = poses[0]?.keypoints
          .filter(k => k.score > 0.3)
          .map(k => k.name)
          .join(', ');
        out.textContent = pts
          ? `Detected keypoints: ${pts}`
          : 'No keypoints detected.';
      });
    })();
  }

  // 9) In-browser chat (gpt4all-browser)
  ;(async () => {
    const win = document.getElementById('chat-window');
    const inp = document.getElementById('chat-input');
    const btn = document.getElementById('chat-send');
    if (!win || !inp || !btn) return;
    // init model
    await GPT4AllBrowser.init();
    const gpt = GPT4AllBrowser;
    function append(cls, txt) {
      const m = document.createElement('div');
      m.className = `chat-message ${cls}`;
      m.textContent = txt;
      win.appendChild(m);
      win.scrollTop = win.scrollHeight;
    }
    btn.addEventListener('click', async () => {
      const q = inp.value.trim();
      if (!q) return;
      append('user', q);
      inp.value = '';
      append('ai', '…thinking…');
      const placeholder = win.querySelector('.chat-message.ai:last-child');
      try {
        const resp = await gpt.chat(q);
        placeholder.textContent = resp;
      } catch {
        placeholder.textContent = 'Error: model failed.';
      }
    });
  })();
});