document.addEventListener('DOMContentLoaded', () => {
  // 1) User greeting
  let username = localStorage.getItem('bp_username') || prompt('Enter your name:') || 'Guest';
  localStorage.setItem('bp_username', username);
  const greetEl = document.getElementById('user-greeting');
  if (greetEl) greetEl.textContent = `Logged in as ${username}`;

  // 2) Sidebar toggle
  document.getElementById('sidebar-toggle')
    ?.addEventListener('click', () => document.body.classList.toggle('sidebar-open'));

  // 3) Dark-mode toggle with correct text
  const darkToggle = document.getElementById('dark-toggle');
  if (darkToggle) {
    const updateText = () => {
      darkToggle.textContent = document.body.classList.contains('dark-mode')
        ? '☀️ Light Mode'
        : '🌙 Dark Mode';
    };
    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      updateText();
    });
    updateText();
  }

  // 4) Tabs navigation
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
  const videos = { /* your video arrays here, unchanged */ };
  const levelSelect = document.getElementById('level-select');
  const videoList    = document.getElementById('video-list');
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

  // 7) Workouts – full schedule restored
  const workouts = {
    beginner: {
      Monday:   ['10 min jog + leg swings', '4×30s shuttle runs', '3×15 lunges', '5 min 4-corner footwork'],
      Tuesday:  ['3×15 squats', '3×10 push-ups', '3×20s plank', '5 min shadow split-step'],
      Wednesday:['5×30s side-shuffles', '3×12 single-leg deadlifts', '5 min hopscotch drill'],
      Thursday: ['3×10 rows', '3×12 overhead press', '3×20 Russian twists'],
      Friday:   ['10 min steady run', '4×30s high knees', '30 shadow net swings & 30 clear swings'],
      Saturday: ['4×5 min rally practice', '10 min cooldown & stretching']
    },
    intermediate: {
      Monday:   ['15 min interval run', '5×40m shuttle sprints', '5 min cross-court clears'],
      Tuesday:  ['4×8 goblet squats', '4×10 bent-over rows', '3×20 Russian twists'],
      Wednesday:['3×8 box jumps', '5 min agility ladder', '3×15 lateral bounds'],
      Thursday: ['4×8 pull-ups', '4×10 diamond push-ups', '3×12 dips', '3×30s side-plank'],
      Friday:   ['10 min tempo run', '3×20 fly-runs', '30 drive shot drills'],
      Saturday: ['30 min multi-shuttle', '15 min tactical rally patterns', '10 min stretching']
    },
    advanced: {
      Monday:   ['20 min interval run', '6×50m shuttle sprints', '4×8 eight-corner footwork'],
      Tuesday:  ['5×5 back squats', '4×6 deadlifts', '4×8 weighted lunges', '4×15 windshield wipers'],
      Wednesday:['4×6 depth jumps', '10 min advanced ladder', '4×8 bounding drills'],
      Thursday: ['5×5 push-press', '4×8 weighted pull-ups', '4×10 dips', '3×60s hollow holds'],
      Friday:   ['10 min run + 5×20m fly-runs', '30 flick serve returns', '30 smash drills'],
      Saturday: ['Best-of-three match play', '15 min cooldown & stretch']
    }
  };
  const workoutSelect = document.getElementById('workout-level-select');
  const workoutPlan   = document.getElementById('workout-plan');
  function renderWorkouts(lvl) {
    if (!workoutPlan) return;
    workoutPlan.innerHTML = '';
    Object.entries(workouts[lvl] || {}).forEach(([day, exs]) => {
      const w = document.createElement('div');
      w.className = 'workout-day';
      w.innerHTML = `<h3>${day}</h3><ul>${exs.map(x => `<li>${x}</li>`).join('')}</ul>`;
      workoutPlan.appendChild(w);
    });
  }
  if (workoutSelect) {
    workoutSelect.addEventListener('change', () => renderWorkouts(workoutSelect.value));
    renderWorkouts(workoutSelect.value);
  }

  // 8) Film analysis & 9) In-browser chat remain unchanged…
  //    (no need to touch your existing MoveNet + gpt4all-browser code here)
});