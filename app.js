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
    { id:'lee-chong-wei', name:'Lee Chong Wei',   country:'Malaysia 🇲🇾',
      style:'Fast footwork, deceptive net play', legacy:'349 weeks No.1; 3× Olympic silver',
      back:'Rose from Bagan Serai juniors under coach Teh Peng Huat.' },
    { id:'lin-dan',        name:'Lin Dan',          country:'China 🇨🇳',
      style:'Explosive, clutch performer',         legacy:'2× Olympic Gold; 5× World Champion',
      back:'Joined national squad at 10, honed killer instinct.' },
    { id:'lee-zii-jia',    name:'Lee Zii Jia',      country:'Malaysia 🇲🇾',
      style:'Offensive power, backhand flair',     legacy:'2021 All England Champion',
      back:'Overcame injuries & visa issues with Chong Wei’s guidance.' },
    { id:'kento-momota',   name:'Kento Momota',     country:'Japan 🇯🇵',
      style:'Tactical, precise rally control',     legacy:'2× World Champion; 11 titles in 2019',
      back:'Rebuilt his career with discipline after a serious crash.' },
    { id:'victor-axelsen', name:'Victor Axelsen',   country:'Denmark 🇩🇰',
      style:'Dominant, disciplined footwork',      legacy:'Olympic Gold 2020; World Champion',
      back:'Balances elite training with sports management studies.' },
    { id:'chen-long',      name:'Chen Long',        country:'China 🇨🇳',
      style:'Solid defense, powerful clears',      legacy:'Olympic Gold 2016; 2× World Champion',
      back:'Protégé of Lin Dan at the Anhui academy.' },
    { id:'carolina-marin', name:'Carolina Marín',   country:'Spain 🇪🇸',
      style:'Aggressive footwork, fierce smashes', legacy:'Olympic Gold 2016; 3× World Champion',
      back:'First European Olympic badminton champion.' },
    { id:'tai-tzu-ying',   name:'Tai Tzu-ying',     country:'Taiwan 🇹🇼',
      style:'Deceptive, creative rallying',        legacy:'Longest-reigning Women’s No.1',
      back:'Junior prodigy famed for her court vision.' },
    { id:'pv-sindhu',      name:'P. V. Sindhu',     country:'India 🇮🇳',
      style:'Powerful smashes, athletic defense',  legacy:'Olympic silver 2016 & 2020; World Champion 2019',
      back:'Coached by Gopichand, turned pro at 16.' },
    { id:'ratchanok-intanon',name:'Ratchanok Intanon',country:'Thailand 🇹🇭',
      style:'Precise touch, court vision',        legacy:'Youngest World Champion at 18',
      back:'Rose from Nonthaburi to global stardom.' },
    { id:'nozomi-okuhara', name:'Nozomi Okuhara',   country:'Japan 🇯🇵',
      style:'Relentless defense, stamina',        legacy:'World Champion 2017; Olympic bronze 2016',
      back:'“Iron Lady” of high-school tournaments.' },
    { id:'anders-antonsen',name:'Anders Antonsen',  country:'Denmark 🇩🇰',
      style:'Tactical, accurate shot-making',     legacy:'European Champion 2018; World silver 2019',
      back:'Trained at Gentofte under Danish legends.' },
    { id:'jonatan-christie',name:'Jonatan Christie', country:'Indonesia 🇮🇩',
      style:'Aggressive drives, flair',            legacy:'Asian Champion 2019; Superseries titles',
      back:'PB Djarum academy graduate with charisma.' },
    { id:'anthony-ginting', name:'Anthony Ginting',  country:'Indonesia 🇮🇩',
      style:'Explosive attacks, fast rallies',     legacy:'World Tour Finals champ; Olympic bronze 2020',
      back:'Developed in Medan’s club system.' },
    { id:'akane-yamaguchi', name:'Akane Yamaguchi',  country:'Japan 🇯🇵',
      style:'Speedy defense, relentless pressure', legacy:'World Champion 2023; former No.1',
      back:'One of the fastest movers, forged in youth system.' },
    { id:'loh-kean-yew',    name:'Loh Kean Yew',     country:'Singapore 🇸🇬',
      style:'Quick footwork, tactical smashes',    legacy:'World Champion 2021; Commonwealth gold',
      back:'First Singaporean world champion.' },
    { id:'srikanth-kidambi',name:'Srikanth Kidambi', country:'India 🇮🇳',
      style:'Aggressive attack, deceptive net',    legacy:'World Champion 2019; Superseries titles',
      back:'Relentless circuit player turned top-10.' },
    { id:'he-bingjiao',     name:'He Bingjiao',       country:'China 🇨🇳',
      style:'Agile rallies, creative defense',     legacy:'World Tour champ; Olympic semifinalist',
      back:'Crafty Zhejiang academy graduate.' },
    { id:'kodai-naraoka',   name:'Kodai Naraoka',     country:'Japan 🇯🇵',
      style:'Balanced offense, steady defense',    legacy:'International Series titles; rising star',
      back:'All-Japan junior standout turned tactician.' },
    { id:'gregoria-tunjung',name:'Gregoria Mariska Tunjung',country:'Indonesia 🇮🇩',
      style:'Fast drives, sharp angles',           legacy:'SEA Games gold; World Tour semis',
      back:'Junior world champion at 17.' },
    { id:'chen-yufei',      name:'Chen Yufei',         country:'China 🇨🇳',
      style:'Calm rallies, deceptive defense',     legacy:'Olympic Gold 2020; World Champion 2019',
      back:'Ice-cool temperament from Hunan academy.' },
    { id:'saina-nehwal',    name:'Saina Nehwal',       country:'India 🇮🇳',
      style:'Versatile attack, gritty defense',    legacy:'Olympic bronze 2012; former No.1',
      back:'India’s first World No.1.' },
    { id:'michelle-li',     name:'Michelle Li',        country:'Canada 🇨🇦',
      style:'Consistent drives, tactical net',     legacy:'2× Olympic bronze; Pan Am champ',
      back:'Broke Canada’s Olympic badminton drought.' },
    { id:'sayaka-takahashi',name:'Sayaka Takahashi',   country:'Japan 🇯🇵',
      style:'Precise footwork, clinical smashes',  legacy:'Former World No.6; Superseries finalist',
      back:'Veteran of Japan’s powerhouse squad.' },
    { id:'chou-tien-chen',  name:'Chou Tien-Chen',     country:'Chinese Taipei 🇹🇼',
      style:'Deceptive net shots, powerful clears',legacy:'Superseries titles; World silver 2019',
      back:'Crafty Taipei youth circuit graduate.' }
  ];
  // build links & cards
  const listEl  = document.getElementById('players-list');
  const cardsEl = document.getElementById('players-cards');
  players.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="#" class="player-link" data-id="${p.id}">${p.name}</a>`;
    listEl.appendChild(li);
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
  document.querySelectorAll('.player-link').forEach(a=>{
    a.addEventListener('click',e=>{
      e.preventDefault();
      document.querySelectorAll('.player-card').forEach(c=>c.hidden=true);
      document.getElementById(a.dataset.id).hidden=false;
    });
  });

  //
  // 5) Videos
  //
  const videos = {
    beginner: [
      {title:"Your Shots Are WAY Too Predictable!",url:"https://www.youtube.com/embed/gqIsUa4gCz4"},
      {title:"Master Overhead Pronation",         url:"https://www.youtube.com/embed/JzkigWSDucw"},
      {title:"Dry Swing Perfection",               url:"https://www.youtube.com/embed/GolGwsK9Nxg"},
      {title:"Forehand Net Cross-Court",           url:"https://www.youtube.com/embed/w4us5HVuFgg"},
      {title:"Magical Cross Net Shot",             url:"https://www.youtube.com/embed/6kFhxbab55E"},
      {title:"Two Types of Backhand Drive",        url:"https://www.youtube.com/embed/SoXecwpUKnE"},
      {title:"Beginner Defensive Tips",            url:"https://www.youtube.com/embed/zDzsdU4LO0g"}
    ],
    intermediate: [
      {title:"Improve Your Dropshot",          url:"https://www.youtube.com/embed/WY9tbZTuS_c"},
      {title:"Fix Your Stance Today",          url:"https://www.youtube.com/embed/S6idcFJ2Ym8"},
      {title:"Net Lift Variations",            url:"https://www.youtube.com/embed/qy4XJ3ZGkcE"},
      {title:"Overhead Swing Phases",          url:"https://www.youtube.com/embed/eVNY8r6Oeek"},
      {title:"Backhand Angle Control",         url:"https://www.youtube.com/embed/fCq-SO6rixQ"},
      {title:"Consistency in 4 Minutes",       url:"https://www.youtube.com/embed/K88F95osw0I"},
      {title:"Court Control Tactics",          url:"https://www.youtube.com/embed/MrvYbLAnecY"}
    ],
    advanced: [
      {title:"Lee vs Bullet Smasher Breakdown",url:"https://www.youtube.com/embed/xWyMt08KWJY"},
      {title:"Lin Dan Olympics 2008",          url:"https://www.youtube.com/embed/FF86j8I-ndM"},
      {title:"Match of the Century",           url:"https://www.youtube.com/embed/R9cd-RwuFk8"},
      {title:"Momota’s Footwork Secrets",      url:"https://www.youtube.com/embed/osptHe5dyPM"},
      {title:"Strategic Insights from 2019",   url:"https://www.youtube.com/embed/yxBVlMncudg"}
    ],
    footwork: [
      {title:"Lin Dan’s Legendary Footwork",url:"https://www.youtube.com/embed/CBgcPzbA9Kw"},
      {title:"8 Steps to Make You Faster",  url:"https://www.youtube.com/embed/0E6mm6PgeY4"},
      {title:"Ladder & Hopscotch Combo",    url:"https://www.youtube.com/embed/jNdlYBI5ZGU"}
    ],
    strategy: [
      {title:"Deceptions You Should Practice",url:"https://www.youtube.com/embed/z5L7SWuj860"},
      {title:"Control Your Opponent",         url:"https://www.youtube.com/embed/MrvYbLAnecY"},
      {title:"Tournament Mindset Prep",       url:"https://www.youtube.com/embed/R0rsw3mRTOA"}
    ]
  };
  const lvlV = document.getElementById('level-select');
  const vList = document.getElementById('video-list');
  function loadVideos(cat){
    vList.innerHTML='';
    (videos[cat]||[]).forEach(v=>{
      const d=document.createElement('div');
      d.innerHTML=`<h3>${v.title}</h3><iframe src="${v.url}" allowfullscreen></iframe>`;
      vList.appendChild(d);
    });
  }
  lvlV.addEventListener('change',()=>loadVideos(lvlV.value));
  loadVideos(lvlV.value);

  //
  // 6) Workouts
  //
  const workouts = {
    beginner:{
      Monday:   ['10 min jog & leg swings','4×30s shuttle runs','3×15 lunges','5 min footwork drill'],
      Tuesday:  ['3×15 squats','3×10 push-ups','3×20s plank','5 min split-step'],
      Wednesday:['5×30s shuffles','3×12 deadlifts','5 min hopscotch'],
      Thursday: ['3×10 rows','3×12 press','3×20 twists'],
      Friday:   ['10 min run','4×30s hi knees','30 nets & 30 clears'],
      Saturday: ['4×5 min rally','10 min stretch']
    },
    intermediate:{
      Monday:   ['15 min intervals','5×40m sprints','5 min clears'],
      Tuesday:  ['4×8 goblet squats','4×10 rows','3×20 twists'],
      Wednesday:['3×8 box jumps','5 min ladder','3×15 bounds'],
      Thursday: ['4×8 pull-ups','4×10 dips','3×30s plank'],
      Friday:   ['10 min tempo','3×20 fly-runs','30 drives'],
      Saturday: ['30 min multi-shuttle','15 min tactic','10 min stretch']
    },
    advanced:{
      Monday:   ['20 min intervals','6×50m sprints','4×8 eight-corner'],
      Tuesday:  ['5×5 back squats','4×6 deadlifts','4×8 lunges','4×15 wipers'],
      Wednesday:['4×6 jumps','10 min ladder','4×8 bounds'],
      Thursday: ['5×5 push-press','4×8 pull-ups','4×10 dips','3×60s hold'],
      Friday:   ['10 min run','5×20 fly-runs','30 smash drills'],
      Saturday: ['Match-play BO3','15 min cooldown']
    }
  };
  const lvlW = document.getElementById('workout-level-select');
  const wPlan= document.getElementById('workout-plan');
  function renderW(lvl){
    wPlan.innerHTML='';
    Object.entries(workouts[lvl]||{}).forEach(([d,exs])=>{
      const div=document.createElement('div');
      div.className='workout-day';
      div.innerHTML=`<h3>${d}</h3><ul>${exs.map(x=>`<li>${x}</li>`).join('')}</ul>`;
      wPlan.appendChild(div);
    });
  }
  lvlW.addEventListener('change',()=>renderW(lvlW.value));
  renderW(lvlW.value);

  //
  // 7) Film Analyzer & 8) gpt4all-browser Chat
  //
  const upload   = document.getElementById('video-upload');
  const gameVid  = document.getElementById('game-video');
  const canvas   = document.getElementById('frame-canvas');
  const analyzeB = document.getElementById('analyze-btn');
  const analysisO= document.getElementById('analysis-result');
  const chatWin  = document.getElementById('chat-window');
  const chatIn   = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');

  // Load MoveNet
  let detector;
  try {
    detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      { modelType:'SinglePose.Lightning' }
    );
  } catch {
    analysisO.textContent = 'Film model load failed.';
  }

  // Init LLM
  await GPT4AllBrowser.init();
  const bot = GPT4AllBrowser;
  const systemPrompt = 
    "You are a professional badminton coach. Speak casually, offer training advice, and add motivational emojis.";

  function appendMsg(who,txt){
    const m=document.createElement('div');
    m.className=`chat-message ${who}`;
    m.textContent=txt;
    chatWin.appendChild(m);
    chatWin.scrollTop=chatWin.scrollHeight;
  }

  // Welcome
  appendMsg('ai','Hello! I’m your badminton coach—ask me anything or analyze a clip.');

  // Video upload
  upload.addEventListener('change',e=>{
    const f=e.target.files[0];
    if(f){
      gameVid.src=URL.createObjectURL(f);
      gameVid.hidden=false;
    }
  });

  // Analyze film → chat
  analyzeB.addEventListener('click',async ()=>{
    if(!detector) return;
    analysisO.textContent='Analyzing…';
    await new Promise(r=>gameVid.onloadedmetadata=r);
    gameVid.pause();
    canvas.width=gameVid.videoWidth;
    canvas.height=gameVid.videoHeight;
    const ctx=canvas.getContext('2d');
    gameVid.currentTime=gameVid.duration/2;
    await new Promise(r=>gameVid.addEventListener('seeked',r,{once:true}));
    ctx.drawImage(gameVid,0,0);
    const poses=await detector.estimatePoses(gameVid).catch(()=>[]);
    const pts=poses[0]?.keypoints
      .filter(k=>k.score>0.3).map(k=>k.name).join(', ');
    const summary=pts?`Detected keypoints: ${pts}`:'No keypoints detected.';
    analysisO.textContent=summary;

    // feed into LLM
    const prompt=`${systemPrompt}\nFilm analysis: ${summary}\nCoach:`;
    appendMsg('user', summary);
    appendMsg('ai','…thinking…');
    const reply=await bot.chat(prompt);
    const last=chatWin.querySelector('.chat-message.ai:last-child');
    last.textContent=reply;
  });

  // Manual chat
  chatSend.addEventListener('click',async ()=>{
    const q=chatIn.value.trim();
    if(!q) return;
    appendMsg('user',q);
    chatIn.value='';
    appendMsg('ai','…thinking…');
    const prompt=`${systemPrompt}\nUser: ${q}\nCoach:`;
    const reply=await bot.chat(prompt);
    const last=chatWin.querySelector('.chat-message.ai:last-child');
    last.textContent=reply;
  });

});