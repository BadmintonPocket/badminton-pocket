document.addEventListener('DOMContentLoaded', async () => {
  //
  // 1) Greeting
  //
  let username = localStorage.getItem('bp_username');
  if (!username) {
    username = prompt('Enter your name:') || 'Guest';
    localStorage.setItem('bp_username', username);
  }
  document.getElementById('user-greeting').textContent =
    `Logged in as ${username}`;

  //
  // 2) Sidebar & Dark Mode
  //
  document.getElementById('sidebar-toggle')
    .addEventListener('click', () =>
      document.body.classList.toggle('sidebar-open')
    );
  const darkToggle = document.getElementById('dark-toggle');
  const updateDark = () => {
    darkToggle.textContent = document.body.classList.contains('dark-mode')
      ? '☀️ Light Mode'
      : '🌙 Dark Mode';
  };
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    updateDark();
  });
  updateDark();

  //
  // 3) Tab Navigation
  //
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('.nav-link').forEach(x => x.classList.remove('active'));
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      link.classList.add('active');
      document.getElementById(link.getAttribute('href').substring(1))
        .classList.add('active');
      if (window.innerWidth < 768) document.body.classList.remove('sidebar-open');
    });
  });

  //
  // 4) Dynamic Players + Cards
  //
  const players = [
    { id:'lee-chong-wei',  name:'Lee Chong Wei',    country:'Malaysia 🇲🇾',
      style:'Fast footwork, deceptive net play', legacy:'349 weeks No.1; 3× Olympic silver',
      back:'Rose from Bagan Serai juniors under coach Teh Peng Huat.' },
    { id:'lin-dan',         name:'Lin Dan',           country:'China 🇨🇳',
      style:'Explosive, clutch performer',         legacy:'2× Olympic Gold; 5× World Champion',
      back:'Joined national squad at 10, forged killer instinct in Hubei.' },
    { id:'lee-zii-jia',     name:'Lee Zii Jia',       country:'Malaysia 🇲🇾',
      style:'Offensive power, backhand flair',     legacy:'2021 All England Champion',
      back:'Overcame injuries & visa delays, mentored by Chong Wei.' },
    { id:'kento-momota',    name:'Kento Momota',      country:'Japan 🇯🇵',
      style:'Tactical, precise rally control',     legacy:'2× World Champion; 11 titles in 2019',
      back:'Rebuilt from a career-threatening crash with unmatched discipline.' },
    { id:'victor-axelsen',  name:'Victor Axelsen',    country:'Denmark 🇩🇰',
      style:'Dominant, disciplined footwork',      legacy:'Olympic Gold 2020; World Champion',
      back:'Balances training with sports management studies.' },
    { id:'chen-long',       name:'Chen Long',         country:'China 🇨🇳',
      style:'Solid defense, powerful clears',      legacy:'Olympic Gold 2016; 2× World Champion',
      back:'Protégé of Lin Dan at the Anhui academy.' },
    { id:'carolina-marin',  name:'Carolina Marín',    country:'Spain 🇪🇸',
      style:'Aggressive footwork, fierce smashes', legacy:'Olympic Gold 2016; 3× World Champion',
      back:'First European to win Olympic badminton gold.' },
    { id:'tai-tzu-ying',    name:'Tai Tzu-ying',      country:'Taiwan 🇹🇼',
      style:'Deceptive, creative rallying',        legacy:'Longest-reigning Women’s No.1',
      back:'Junior prodigy from Penghu, famed for court vision.' },
    { id:'pv-sindhu',       name:'P. V. Sindhu',      country:'India 🇮🇳',
      style:'Powerful smashes, athletic defense',  legacy:'Olympic silver 2016 & 2020; World Champion 2019',
      back:'Trained by Pullela Gopichand, turned pro at 16.' },
    { id:'ratchanok-intanon',name:'Ratchanok Intanon',country:'Thailand 🇹🇭',
      style:'Precise touch, court vision',        legacy:'Youngest World Champion at 18',
      back:'From Nonthaburi courts to global stardom.' },
    { id:'nozomi-okuhara',  name:'Nozomi Okuhara',    country:'Japan 🇯🇵',
      style:'Relentless defense, unmatched stamina',legacy:'World Champion 2017; Olympic bronze 2016',
      back:'Known as the “Iron Lady,” rose through high-school ranks.' },
    { id:'anders-antonsen', name:'Anders Antonsen',   country:'Denmark 🇩🇰',
      style:'Tactical, accurate shot-making',     legacy:'European Champion 2018; World silver 2019',
      back:'Trained at Gentofte under Danish legends.' },
    { id:'jonatan-christie',name:'Jonatan Christie',  country:'Indonesia 🇮🇩',
      style:'Aggressive drives, flair',            legacy:'Asian Champion 2019; Superseries titles',
      back:'PB Djarum academy product with charismatic style.' },
    { id:'anthony-ginting', name:'Anthony Ginting',   country:'Indonesia 🇮🇩',
      style:'Explosive attacks, fast rallies',     legacy:'World Tour Finals champ; Olympic bronze 2020',
      back:'Medan club system graduate, famed for reflexes.' },
    { id:'akane-yamaguchi', name:'Akane Yamaguchi',   country:'Japan 🇯🇵',
      style:'Speedy defense, relentless pressure', legacy:'World Champion 2023; former No.1',
      back:'One of the quickest movers, honed in youth system.' },
    { id:'loh-kean-yew',    name:'Loh Kean Yew',      country:'Singapore 🇸🇬',
      style:'Quick footwork, tactical smashes',    legacy:'World Champion 2021; Commonwealth gold',
      back:'First Singaporean world champ, balanced study & sport.' },
    { id:'srikanth-kidambi',name:'Srikanth Kidambi',  country:'India 🇮🇳',
      style:'Aggressive attack, deceptive net',    legacy:'World Champion 2019; Superseries titles',
      back:'Broke into top 10 via relentless circuit play.' },
    { id:'he-bingjiao',     name:'He Bingjiao',       country:'China 🇨🇳',
      style:'Agile rallies, creative defense',     legacy:'World Tour champ; Olympic semifinalist',
      back:'Zhejiang academy graduate, crafty shotmaker.' },
    { id:'kodai-naraoka',   name:'Kodai Naraoka',     country:'Japan 🇯🇵',
      style:'Balanced offense, steady defense',    legacy:'International Series titles; rising star',
      back:'All-Japan junior standout turned tactician.' },
    { id:'gregoria-tunjung',name:'Gregoria M. Tunjung',country:'Indonesia 🇮🇩',
      style:'Fast drives, sharp angles',           legacy:'SEA Games gold; World Tour semis',
      back:'Junior world champion at 17, fearless net play.' },
    { id:'chen-yufei',      name:'Chen Yufei',        country:'China 🇨🇳',
      style:'Calm rallies, deceptive defense',     legacy:'Olympic Gold 2020; World Champion 2019',
      back:'Ice-cool temperament from Hunan academy.' },
    { id:'saina-nehwal',    name:'Saina Nehwal',      country:'India 🇮🇳',
      style:'Versatile attack, gritty defense',    legacy:'Olympic bronze 2012; former No.1',
      back:'India’s first World No.1, sparked a badminton boom.' },
    { id:'michelle-li',     name:'Michelle Li',       country:'Canada 🇨🇦',
      style:'Consistent drives, tactical net',     legacy:'2× Olympic bronze; Pan Am champ',
      back:'Broke Canada’s Olympic badminton drought.' },
    { id:'sayaka-takahashi',name:'Sayaka Takahashi',  country:'Japan 🇯🇵',
      style:'Precise footwork, clinical smashes',  legacy:'Former World No.6; Superseries finalist',
      back:'Veteran of Japan’s powerhouse squad.' },
    { id:'chou-tien-chen',  name:'Chou Tien-Chen',    country:'Tpe 🇹🇼',
      style:'Deceptive net shots, powerful clears',legacy:'Superseries titles; World silver 2019',
      back:'Crafty Taipei youth circuit graduate.' }
  ];

  const listEl  = document.getElementById('players-list');
  const cardsEl = document.getElementById('players-cards');
  players.forEach(p => {
    // Link
    const li = document.createElement('li');
    li.innerHTML = `<a href="#" class="player-link" data-id="${p.id}">${p.name}</a>`;
    listEl.appendChild(li);
    // Card
    const card = document.createElement('div');
    card.id = p.id;
    card.className = 'player-card';
    card.hidden = true;
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

  //
  // 5) Videos
  //
  const videos = {
    beginner: [
      {title:"Predictable Shots? Fix Now!",url:"https://www.youtube.com/embed/gqIsUa4gCz4"},
      {title:"Overhead Pronation Mastery", url:"https://www.youtube.com/embed/JzkigWSDucw"},
      {title:"Dry Swing Perfection",       url:"https://www.youtube.com/embed/GolGwsK9Nxg"},
      {title:"Forehand Net Cross-Court",   url:"https://www.youtube.com/embed/w4us5HVuFgg"},
      {title:"Backhand Drive Basics",      url:"https://www.youtube.com/embed/SoXecwpUKnE"}
    ],
    intermediate: [
      {title:"Dropshot Improvement", url:"https://www.youtube.com/embed/WY9tbZTuS_c"},
      {title:"Fix Your Stance",      url:"https://www.youtube.com/embed/S6idcFJ2Ym8"},
      {title:"Net Lift Variations",  url:"https://www.youtube.com/embed/qy4XJ3ZGkcE"}
    ],
    advanced: [
      {title:"Lee vs Bullet Smasher", url:"https://www.youtube.com/embed/xWyMt08KWJY"},
      {title:"Lin Dan Olympics 2008",  url:"https://www.youtube.com/embed/FF86j8I-ndM"}
    ],
    footwork: [
      {title:"Lin Dan’s Footwork", url:"https://www.youtube.com/embed/CBgcPzbA9Kw"},
      {title:"8 Steps to Speed",   url:"https://www.youtube.com/embed/0E6mm6PgeY4"}
    ],
    strategy: [
      {title:"Must-Master Deceptions", url:"https://www.youtube.com/embed/z5L7SWuj860"},
      {title:"Court Control Tactics",  url:"https://www.youtube.com/embed/MrvYbLAnecY"}
    ]
  };
  const lvlSel = document.getElementById('level-select');
  const vList  = document.getElementById('video-list');
  function loadVideos(cat) {
    vList.innerHTML = '';
    (videos[cat]||[]).forEach(v => {
      const div = document.createElement('div');
      div.innerHTML = `<h3>${v.title}</h3>
                       <iframe src="${v.url}" allowfullscreen></iframe>`;
      vList.appendChild(div);
    });
  }
  lvlSel.addEventListener('change', () => loadVideos(lvlSel.value));
  loadVideos(lvlSel.value);

  //
  // 6) Workouts
  //
  const workouts = {
    beginner:{
      Monday:   ['10min jog & leg swings','4×30s shuttle runs','3×15 lunges','5min footwork'],
      Tuesday:  ['3×15 squats','3×10 pushups','3×20s plank','5min split-step'],
      Wednesday:['5×30s shuffles','3×12 deadlifts','5min hopscotch'],
      Thursday: ['3×10 rows','3×12 press','3×20 twists'],
      Friday:   ['10min run','4×30s high knees','30 drives & clears'],
      Saturday: ['4×5min rally','10min stretch']
    },
    intermediate:{
      Monday:   ['15min intervals','5×40m sprints','5min clears'],
      Tuesday:  ['4×8 squats','4×10 rows','3×20 twists'],
      Wednesday:['3×8 box jumps','5min ladder','3×15 bounds'],
      Thursday: ['4×8 pullups','4×10 dips','3×30s plank'],
      Friday:   ['10min tempo','3×20 fly-runs','30 drive drills'],
      Saturday: ['30min multi-shuttle','15min tactics','10min stretch']
    },
    advanced:{
      Monday:   ['20min intervals','6×50m sprints','4×8 footwork drills'],
      Tuesday:  ['5×5 squats','4×6 deadlifts','4×8 lunges','4×15 wipers'],
      Wednesday:['4×6 jumps','10min ladder','4×8 bounds'],
      Thursday: ['5×5 pushpress','4×8 pullups','4×10 dips','3×60s hold'],
      Friday:   ['10min run','5×20 fly-runs','30 smash drills'],
      Saturday: ['Match-play BO3','15min cooldown']
    }
  };
  const wSel = document.getElementById('workout-level-select');
  const wPlan= document.getElementById('workout-plan');
  function renderW(lvl) {
    wPlan.innerHTML = '';
    Object.entries(workouts[lvl]||{}).forEach(([day,exs])=>{
      const d = document.createElement('div');
      d.className = 'workout-day';
      d.innerHTML = `<h3>${day}</h3><ul>${exs.map(x=>`<li>${x}</li>`).join('')}</ul>`;
      wPlan.appendChild(d);
    });
  }
  wSel.addEventListener('change', ()=>renderW(wSel.value));
  renderW(wSel.value);

  //
  // 7) Film Analyzer +
  // 8) gpt4all-browser Chat
  //
  // init MoveNet
  const upload = document.getElementById('video-upload');
  const gameVid= document.getElementById('game-video');
  const cvs    = document.getElementById('frame-canvas');
  const analyzeBtn = document.getElementById('analyze-btn');
  const analysisOut= document.getElementById('analysis-result');
  let detector;
  try {
    detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      { modelType:'SinglePose.Lightning' }
    );
  } catch {
    analysisOut.textContent = 'Model load failed.';
  }

  // init chat
  await GPT4AllBrowser.init();
  const gpt = GPT4AllBrowser;
  const chatWin  = document.getElementById('chat-window');
  const chatIn   = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  function appendChat(who, txt) {
    const m = document.createElement('div');
    m.className = `chat-message ${who}`;
    m.textContent = txt;
    chatWin.appendChild(m);
    chatWin.scrollTop = chatWin.scrollHeight;
  }
  // seed
  appendChat('ai','Hello! I’m your badminton coach—ask me anything or analyze a clip.');

  // video upload
  upload.addEventListener('change', e=>{
    const f = e.target.files[0];
    if (f) {
      gameVid.src = URL.createObjectURL(f);
      gameVid.hidden = false;
    }
  });

  // Analyze & chat
  analyzeBtn.addEventListener('click', async ()=>{
    if (!detector) return;
    analysisOut.textContent = 'Processing…';
    await new Promise(r=>gameVid.onloadedmetadata = r);
    gameVid.pause();
    cvs.width  = gameVid.videoWidth;
    cvs.height = gameVid.videoHeight;
    const ctx = cvs.getContext('2d');
    gameVid.currentTime = gameVid.duration/2;
    await new Promise(r=>gameVid.addEventListener('seeked', r, { once:true }));
    ctx.drawImage(gameVid,0,0);
    const poses = await detector.estimatePoses(gameVid).catch(()=>[]);
    const pts = poses[0]?.keypoints
      .filter(k=>k.score>0.3).map(k=>k.name).join(', ');
    const summary = pts
      ? `Detected keypoints: ${pts}`
      : 'No keypoints detected.';
    analysisOut.textContent = summary;

    // feed into chat
    const prompt = `Here are my film stats: ${summary}. What should I work on?`;
    appendChat('user', prompt);
    appendChat('ai', '…thinking…');
    try {
      const resp = await gpt.chat(prompt);
      // replace placeholder
      const last = chatWin.querySelector('.chat-message.ai:last-child');
      last.textContent = resp;
    } catch {
      const last = chatWin.querySelector('.chat-message.ai:last-child');
      last.textContent = 'Error: local AI failed.';
    }
  });

  // Manual chat
  chatSend.addEventListener('click', async ()=>{
    const q = chatIn.value.trim();
    if (!q) return;
    appendChat('user', q);
    chatIn.value = '';
    appendChat('ai','…thinking…');
    try {
      const resp = await gpt.chat(q);
      const last = chatWin.querySelector('.chat-message.ai:last-child');
      last.textContent = resp;
    } catch {
      const last = chatWin.querySelector('.chat-message.ai:last-child');
      last.textContent = 'Error: local AI failed.';
    }
  });
});