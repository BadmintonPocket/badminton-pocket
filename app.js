document.addEventListener('DOMContentLoaded', () => {
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const darkToggle    = document.getElementById('dark-toggle');
  const navLinks      = [...document.querySelectorAll('.nav-link')];
  const pages         = [...document.querySelectorAll('.page')];
  const playerLinks   = [...document.querySelectorAll('.player-link')];
  const levelSelect   = document.getElementById('level-select');
  const videoList     = document.getElementById('video-list');
  const workoutSelect = document.getElementById('workout-level-select');
  const workoutPlan   = document.getElementById('workout-plan');
  const chatWindow    = document.getElementById('chat-window');
  const chatInput     = document.getElementById('chat-input');
  const chatSend      = document.getElementById('chat-send');

  // sidebar toggle
  sidebarToggle.addEventListener('click', () =>
    document.body.classList.toggle('sidebar-open')
  );

  // tab navigation
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      pages.forEach(p => p.classList.remove('active'));
      link.classList.add('active');
      const id = link.getAttribute('href').slice(1);
      document.getElementById(id).classList.add('active');
      if (window.innerWidth < 768)
        document.body.classList.remove('sidebar-open');
    });
  });

  // dark mode
  darkToggle.addEventListener('click', () => {
    const dark = document.body.classList.toggle('dark-mode');
    darkToggle.textContent = dark ? '☀️ Light Mode' : '🌙 Dark Mode';
  });

  // player cards
  playerLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.player-card')
              .forEach(c => c.hidden = true);
      document.getElementById(link.dataset.id).hidden = false;
    });
  });

  // video library
  const videos = {
    beginner: [ /* …full list as before… */ ],
    intermediate: [ /* … */ ],
    advanced: [ /* … */ ],
    footwork: [ /* … */ ],
    strategy: [ /* … */ ]
  };
  function loadVideos(level) {
    videoList.innerHTML = '';
    (videos[level] || []).forEach(v => {
      const d = document.createElement('div');
      d.innerHTML = `<h3>${v.title}</h3>
                     <iframe src="${v.url}" allowfullscreen></iframe>`;
      videoList.appendChild(d);
    });
  }
  levelSelect.addEventListener('change', () => loadVideos(levelSelect.value));
  loadVideos(levelSelect.value);

  // workouts
  const workouts = {
    beginner: { /* …as before…*/ },
    intermediate: { /* …*/ },
    advanced: { /* …*/ }
  };
  function renderWorkouts(level) {
    workoutPlan.innerHTML = '';
    Object.entries(workouts[level] || {}).forEach(([day, exs]) => {
      const wrap = document.createElement('div');
      wrap.classList.add('workout-day');
      wrap.innerHTML = `<h3>${day}</h3>
                        <ul>${exs.map(x => `<li>${x}</li>`).join('')}</ul>`;
      workoutPlan.appendChild(wrap);
    });
  }
  workoutSelect.addEventListener('change', () =>
    renderWorkouts(workoutSelect.value)
  );
  renderWorkouts(workoutSelect.value);

  // AI Chat logic
  function appendMessage(sender, text) {
    const m = document.createElement('div');
    m.classList.add('chat-message', sender);
    m.textContent = text;
    chatWindow.appendChild(m);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
  function mockAIResponse(msg) {
    if (/footwork/i.test(msg))
      return 'Your footwork is solid but needs smoother transitions. Try four-corner split-step drills.';
    if (/smash/i.test(msg))
      return 'Your smash is powerful—focus next on quicker recovery steps to the center court after impact.';
    return 'Interesting point. Mix multi-shuttle consistency drills with shadow footwork to build rhythm.';
  }
  function sendMessage() {
    const txt = chatInput.value.trim();
    if (!txt) return;
    appendMessage('user', txt);
    chatInput.value = '';
    setTimeout(() => appendMessage('ai', mockAIResponse(txt)), 500);
  }
  chatSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') sendMessage();
  });
});