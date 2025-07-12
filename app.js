document.addEventListener('DOMContentLoaded', async () => {
  // 1) Greeting
  let username = localStorage.getItem('bp_username');
  if (!username) {
    username = prompt('Enter your name:') || 'Guest';
    localStorage.setItem('bp_username', username);
  }
  document.getElementById('user-greeting').textContent =
    `Logged in as ${username}`;

  // 2) Sidebar & Dark Mode
  document.getElementById('sidebar-toggle')
    .addEventListener('click', () =>
      document.body.classList.toggle('sidebar-open')
    );
  const darkBtn = document.getElementById('dark-toggle');
  const updateDark = () => {
    darkBtn.textContent = document.body.classList.contains('dark-mode')
      ? '☀️ Light Mode'
      : '🌙 Dark Mode';
  };
  darkBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    updateDark();
  });
  updateDark();

  // 3) Tab Navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.nav-link').forEach(x => x.classList.remove('active'));
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      link.classList.add('active');
      document.getElementById(link.getAttribute('href').slice(1))
        .classList.add('active');
      if (window.innerWidth < 768) document.body.classList.remove('sidebar-open');
    });
  });

  // 4) Players + Cards
  const players = [ 
    /* 25 entries as before… shortened for brevity, use the same array from above */ 
  ];
  const listEl  = document.getElementById('players-list');
  const cardsEl = document.getElementById('players-cards');
  players.forEach(p => {
    // link
    const li = document.createElement('li');
    li.innerHTML = `<a href="#" class="player-link" data-id="${p.id}">${p.name}</a>`;
    listEl.appendChild(li);
    // card
    const card = document.createElement('div');
    card.id = p.id; card.className = 'player-card'; card.hidden = true;
    card.innerHTML = `
      <h3>${p.name}</h3>
      <p><strong>Country:</strong> ${p.country}</p>
      <p><strong>Style:</strong> ${p.style}</p>
      <p><strong>Legacy:</strong> ${p.legacy}</p>
      <p><strong>Backstory:</strong> ${p.back}</p>
    `;
    cardsEl.appendChild(card);
  });
  document.querySelectorAll('.player-link').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.player-card').forEach(c => c.hidden = true);
      document.getElementById(a.dataset.id).hidden = false;
    });
  });

  // 5) Videos
  const videos = {
    beginner:[ /* 7 items */ ],
    intermediate:[ /* 7 items */ ],
    advanced:[ /* 5 items */ ],
    footwork:[ /* 3 items */ ],
    strategy:[ /* 3 items */ ]
  };
  const lvlV = document.getElementById('level-select');
  const vList = document.getElementById('video-list');
  function loadVideos(cat){
    vList.innerHTML = '';
    (videos[cat]||[]).forEach(v=>{
      const d = document.createElement('div');
      d.innerHTML = `<h3>${v.title}</h3>
                     <iframe src="${v.url}" allowfullscreen></iframe>`;
      vList.appendChild(d);
    });
  }
  lvlV.addEventListener('change', () => loadVideos(lvlV.value));
  loadVideos(lvlV.value);

  // 6) Workouts
  const workouts = {
    beginner:{ /* days…*/ },
    intermediate:{ /* days…*/ },
    advanced:{ /* days…*/ }
  };
  const lvlW = document.getElementById('workout-level-select');
  const wPlan = document.getElementById('workout-plan');
  function renderW(lvl){
    wPlan.innerHTML='';
    Object.entries(workouts[lvl]||{}).forEach(([day,exs])=>{
      const div = document.createElement('div');
      div.className='workout-day';
      div.innerHTML = `<h3>${day}</h3><ul>${exs.map(x=>`<li>${x}</li>`).join('')}</ul>`;
      wPlan.appendChild(div);
    });
  }
  lvlW.addEventListener('change', ()=>renderW(lvlW.value));
  renderW(lvlW.value);

  // 7) Film Analysis + 8) gpt4all-browser Chat
  const upload    = document.getElementById('video-upload');
  const gameVid   = document.getElementById('game-video');
  const canvas    = document.getElementById('frame-canvas');
  const analyzeB  = document.getElementById('analyze-btn');
  const analysisO = document.getElementById('analysis-result');
  const chatWin   = document.getElementById('chat-window');
  const chatIn    = document.getElementById('chat-input');
  const chatSend  = document.getElementById('chat-send');

  // Load MoveNet when AI tab activated
  let detector;
  analyzeB.disabled = true;
  document.querySelector('a[href="#ai-chat"]').addEventListener('click', async () => {
    if (!detector) {
      try {
        detector = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
          { modelType:'SinglePose.Lightning' }
        );
        analyzeB.disabled = false;
      } catch (e) {
        analysisO.textContent = 'Film analyzer failed to load.';
        console.error(e);
      }
    }
  });

  // Initialize gpt4all-browser
  chatSend.disabled = true;
  chatIn.disabled   = true;
  appendChat('ai','Loading coach model… 🎾');
  try {
    await GPT4AllBrowser.init();
    const systemPrompt = 
      "You are a professional badminton coach. Speak casually, offer clear drills, and add motivational emojis.";
    let conversation = systemPrompt;

    // Enable chat
    appendChat('ai','Coach loaded! Ready when you are. 👍');
    chatSend.disabled = false;
    chatIn.disabled   = false;

    // film analysis → feed to chat
    upload.addEventListener('change', e => {
      const f = e.target.files[0];
      if (f) {
        gameVid.src = URL.createObjectURL(f);
        gameVid.hidden = false;
      }
    });
    analyzeB.addEventListener('click', async () => {
      analysisO.textContent = 'Analyzing…';
      await new Promise(r => gameVid.onloadedmetadata = r);
      gameVid.pause();
      canvas.width  = gameVid.videoWidth;
      canvas.height = gameVid.videoHeight;
      const ctx = canvas.getContext('2d');
      gameVid.currentTime = gameVid.duration/2;
      await new Promise(r =>
        gameVid.addEventListener('seeked', r, { once:true })
      );
      ctx.drawImage(gameVid,0,0);
      const poses = await detector.estimatePoses(gameVid).catch(()=>[]);
      const pts = poses[0]?.keypoints
        .filter(k=>k.score>0.3).map(k=>k.name).join(', ');
      const summary = pts
        ? `Detected keypoints: ${pts}`
        : 'No keypoints detected.';
      analysisO.textContent = summary;

      // chat it
      conversation += `\nUser: ${summary}`;
      appendChat('user', summary);
      appendChat('ai','…thinking…');
      chatSend.disabled = true;
      const reply = await GPT4AllBrowser.chat(conversation);
      conversation += `\nCoach: ${reply}`;
      const last = chatWin.querySelector('.chat-message.ai:last-child');
      last.textContent = reply;
      chatSend.disabled = false;
    });

    // manual chat
    chatSend.addEventListener('click', async () => {
      const q = chatIn.value.trim();
      if (!q) return;
      conversation += `\nUser: ${q}`;
      appendChat('user', q);
      chatIn.value = '';
      appendChat('ai','…thinking…');
      chatSend.disabled = true;
      const reply = await GPT4AllBrowser.chat(conversation);
      conversation += `\nCoach: ${reply}`;
      const last = chatWin.querySelector('.chat-message.ai:last-child');
      last.textContent = reply;
      chatSend.disabled = false;
    });

  } catch(err) {
    appendChat('ai','⚠️ Coach model failed. AI chat disabled.');
    console.error(err);
  }

  function appendChat(who, txt) {
    const m = document.createElement('div');
    m.className = `chat-message ${who}`;
    m.textContent = txt;
    chatWin.appendChild(m);
    chatWin.scrollTop = chatWin.scrollHeight;
  }
});