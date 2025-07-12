document.addEventListener('DOMContentLoaded', async () => {
  //
  // 1) Sidebar, Dark Mode & Tabs
  //
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

  //
  // 2) Training Videos (full library)
  //
  const videos = {
    beginner: [
      {title:"Your Shots Are WAY Too Predictable!", url:"https://www.youtube.com/embed/gqIsUa4gCz4"},
      {title:"Master Overhead Pronation",        url:"https://www.youtube.com/embed/JzkigWSDucw"},
      {title:"Dry Swing Perfection",              url:"https://www.youtube.com/embed/GolGwsK9Nxg"},
      {title:"Forehand Net Cross-Court",          url:"https://www.youtube.com/embed/w4us5HVuFgg"},
      {title:"Magical Cross Net Shot",            url:"https://www.youtube.com/embed/6kFhxbab55E"},
      {title:"Two Types of Backhand Drive",       url:"https://www.youtube.com/embed/SoXecwpUKnE"},
      {title:"Beginner Defensive Tips",           url:"https://www.youtube.com/embed/zDzsdU4LO0g"}
    ],
    intermediate: [
      {title:"Improve Your Dropshot",            url:"https://www.youtube.com/embed/WY9tbZTuS_c"},
      {title:"Fix Your Stance Today",            url:"https://www.youtube.com/embed/S6idcFJ2Ym8"},
      {title:"Net Lift Variations",              url:"https://www.youtube.com/embed/qy4XJ3ZGkcE"},
      {title:"Overhead Swing Phases",            url:"https://www.youtube.com/embed/eVNY8r6Oeek"},
      {title:"Backhand Angle Control",           url:"https://www.youtube.com/embed/fCq-SO6rixQ"},
      {title:"Consistency in 4 Minutes",         url:"https://www.youtube.com/embed/K88F95osw0I"},
      {title:"Court Control Tactics",            url:"https://www.youtube.com/embed/MrvYbLAnecY"}
    ],
    advanced: [
      {title:"Lee vs Bullet Smasher Breakdown", url:"https://www.youtube.com/embed/xWyMt08KWJY"},
      {title:"Lin Dan Olympics 2008",           url:"https://www.youtube.com/embed/FF86j8I-ndM"},
      {title:"Match of the Century",            url:"https://www.youtube.com/embed/R9cd-RwuFk8"},
      {title:"Momota’s Footwork Secrets",       url:"https://www.youtube.com/embed/osptHe5dyPM"},
      {title:"Strategic Insights from 2019",    url:"https://www.youtube.com/embed/yxBVlMncudg"}
    ],
    footwork: [
      {title:"Lin Dan’s Legendary Footwork", url:"https://www.youtube.com/embed/CBgcPzbA9Kw"},
      {title:"8 Steps to Make You Faster",   url:"https://www.youtube.com/embed/0E6mm6PgeY4"},
      {title:"Ladder & Hopscotch Combo",     url:"https://www.youtube.com/embed/jNdlYBI5ZGU"},
      {title:"Advanced Agility Drill",       url:"https://www.youtube.com/embed/1PvvieFrDCQ"},
      {title:"Split-Step Timing Guide",      url:"https://www.youtube.com/embed/jPzY61jw3ao"}
    ],
    strategy: [
      {title:"Deceptions You Should Practice", url:"https://www.youtube.com/embed/z5L7SWuj860"},
      {title:"Control Your Opponent",          url:"https://www.youtube.com/embed/MrvYbLAnecY"},
      {title:"Tournament Mindset Prep",        url:"https://www.youtube.com/embed/R0rsw3mRTOA"},
      {title:"Doubles Strategy Basics",        url:"https://www.youtube.com/embed/UAeXBTnKv3s"},
      {title:"Match Tempo & Pacing",           url:"https://www.youtube.com/embed/EBSuXbW3eVk"}
    ]
  };
  const lvlSel = document.getElementById('level-select');
  const vList  = document.getElementById('video-list');
  function loadVideos(cat) {
    vList.innerHTML = '';
    (videos[cat]||[]).forEach(v=>{
      const d = document.createElement('div');
      d.innerHTML = `<h3>${v.title}</h3>
                     <iframe src="${v.url}" allowfullscreen></iframe>`;
      vList.appendChild(d);
    });
  }
  lvlSel.addEventListener('change', ()=>loadVideos(lvlSel.value));
  loadVideos(lvlSel.value);

  //
  // 3) Players & Profiles
  //
  const players = [
    { id:'lee-chong-wei', name:'Lee Chong Wei',   country:'Malaysia 🇲🇾',
      style:'Fast footwork, deceptive net play', legacy:'349 weeks No.1; 3× Olympic silver',
      back:'Rose from Bagan Serai juniors under coach Teh Peng Huat.' },
    { id:'lin-dan',        name:'Lin Dan',          country:'China 🇨🇳',
      style:'Explosive, clutch performer',         legacy:'2× Olympic Gold; 5× World Champion',
      back:'Joined national squad at 10, honed killer instinct.' },
    { id:'lee-zii-jia',    name:'Lee Zii Jia',      country:'Malaysia 🇲🇾',
      style:'Offensive power, backhand flair',     legacy:'2021 All England Champion',
      back:'Overcame injuries & visa issues with Chong Wei’s guidance.' },
    { id:'kento-momota',   name:'Kento Momota',     country:'Japan 🇯🇵',
      style:'Tactical, precise rally control',     legacy:'2× World Champion; 11 titles in 2019',
      back:'Rebuilt his career after a serious crash.' },
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
    { id:'pv-sindhu',      name:'P. V. Sindhu',      country:'India 🇮🇳',
      style:'Powerful smashes, athletic defense',  legacy:'Olympic silver 2016 & 2020; World Champion 2019',
      back:'Trained by coach Gopichand from age 16.' },
    { id:'ratchanok-intanon',name:'Ratchanok Intanon',country:'Thailand 🇹🇭',
      style:'Precise touch, court vision',        legacy:'Youngest World Champion at 18',
      back:'Rose from Nonthaburi courts to global stardom.' },
    { id:'nozomi-okuhara', name:'Nozomi Okuhara',    country:'Japan 🇯🇵',
      style:'Relentless defense, stamina',        legacy:'World Champion 2017; Olympic bronze 2016',
      back:'“Iron Lady” with unmatched stamina.' },
    { id:'anders-antonsen',name:'Anders Antonsen',   country:'Denmark 🇩🇰',
      style:'Tactical, accurate shots',           legacy:'European Champ 2018; World silver 2019',
      back:'Crafted in Gentofte’s elite system.' },
    { id:'jonatan-christie',name:'Jonatan Christie', country:'Indonesia 🇮🇩',
      style:'Aggressive drives, flair',            legacy:'Asian Champ 2019; Superseries titles',
      back:'PB Djarum alum with crowd charisma.' },
    { id:'anthony-ginting', name:'Anthony Ginting',   country:'Indonesia 🇮🇩',
      style:'Explosive attacks, fast rallies',     legacy:'World Tour Finals champ; Olympic bronze',
      back:'Medan club standout known for reflexes.' },
    { id:'akane-yamaguchi', name:'Akane Yamaguchi',   country:'Japan 🇯🇵',
      style:'Speedy defense, relentless pressure', legacy:'World Champ 2023; former No.1',
      back:'One of the quickest movers ever.' },
    { id:'loh-kean-yew',    name:'Loh Kean Yew',      country:'Singapore 🇸🇬',
      style:'Quick footwork, tactical smashes',    legacy:'World Champ 2021; Commonwealth gold',
      back:'First Singaporean world champion.' },
    { id:'srikanth-kidambi',name:'Srikanth Kidambi',  country:'India 🇮🇳',
      style:'Aggressive net play, deceptive attack',legacy:'World Champ 2019; Superseries titles',
      back:'Rose through relentless circuit play.' },
    { id:'he-bingjiao',     name:'He Bingjiao',       country:'China 🇨🇳',
      style:'Agile rallies, creative defense',     legacy:'World Tour champ; Olympic semifinalist',
      back:'Crafty Zhejiang academy graduate.' },
    { id:'kodai-naraoka',   name:'Kodai Naraoka',     country:'Japan 🇯🇵',
      style:'Balanced offense, steady defense',    legacy:'International Series titles; rising star',
      back:'All-Japan junior standout turned tactician.' },
    { id:'gregoria-tunjung',name:'Gregoria M. Tunjung',country:'Indonesia 🇮🇩',
      style:'Fast drives, sharp angles',           legacy:'SEA Games gold; World Tour semis',
      back:'Junior world champ at 17.' },
    { id:'chen-yufei',      name:'Chen Yufei',        country:'China 🇨🇳',
      style:'Calm rallies, deceptive defense',     legacy:'Olympic Gold 2020; World Champ 2019',
      back:'Ice-cool temperament from Hunan.' },
    { id:'saina-nehwal',    name:'Saina Nehwal',      country:'India 🇮🇳',
      style:'Versatile attack, gritty defense',    legacy:'Olympic bronze; former No.1',
      back:'India’s first World No.1.' },
    { id:'michelle-li',     name:'Michelle Li',       country:'Canada 🇨🇦',
      style:'Consistent drives, tactical net',     legacy:'2× Olympic bronze; Pan Am champ',
      back:'Broke Canada’s Olympic badminton drought.' },
    { id:'sayaka-takahashi',name:'Sayaka Takahashi',  country:'Japan 🇯🇵',
      style:'Precise footwork, clinical smashes',  legacy:'Former World No.6; Superseries finalist',
      back:'Veteran of Japan’s powerhouse squad.' },
    { id:'chou-tien-chen',  name:'Chou Tien-Chen',    country:'Chinese Taipei 🇹🇼',
      style:'Deceptive net shots, powerful clears',legacy:'Superseries titles; World silver 2019',
      back:'Crafty Taipei youth circuit graduate.' }
  ];
  const listEl  = document.getElementById('players-list');
  const cardsEl = document.getElementById('players-cards');
  players.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="#" class="player-link" data-id="${p.id}">${p.name}</a>`;
    listEl.appendChild(li);
    const card = document.createElement('div');
    card.id = p.id; card.className='player-card'; card.hidden=true;
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
    a.addEventListener('click', e=>{
      e.preventDefault();
      document.querySelectorAll('.player-card').forEach(c=>c.hidden=true);
      document.getElementById(a.dataset.id).hidden=false;
    });
  });

  //
  // 4) Workout Plans
  //
  const workouts = {
    beginner:{
      Monday:   ['10 min jog + leg swings','4×30s shuttles','3×15 lunges','5 min footwork drill'],
      Tuesday:  ['3×15 squats','3×10 push-ups','3×20s plank','5 min split-step'],
      Wednesday:['5×30s shuffles','3×12 deadlifts','5 min hopscotch'],
      Thursday: ['3×10 rows','3×12 press','3×20 twists'],
      Friday:   ['10 min run','4×30s high knees','30 nets & clears'],
      Saturday: ['4×5 min rallies','10 min stretch']
    },
    intermediate:{
      Monday:   ['15 min intervals','5×40m sprints','5 min clears'],
      Tuesday:  ['4×8 goblet squats','4×10 rows','3×20 twists'],
      Wednesday:['3×8 box jumps','5 min ladder','3×15 bounds'],
      Thursday: ['4×8 pull-ups','4×10 dips','3×30s plank'],
      Friday:   ['10 min tempo run','3×20 fly-runs','30 drives'],
      Saturday: ['30 min multi-shuttle','15 min tactical','10 min stretch']
    },
    advanced:{
      Monday:   ['20 min intervals','6×50m sprints','4×8 eight-corner footwork'],
      Tuesday:  ['5×5 back squats','4×6 deadlifts','4×8 weighted lunges','4×15 wipers'],
      Wednesday:['4×6 jumps','10 min ladder','4×8 bounds'],
      Thursday: ['5×5 push-press','4×8 pull-ups','4×10 dips','3×60s hold'],
      Friday:   ['10 min run','5×20 fly-runs','30 smash drills'],
      Saturday: ['Best-of-3 match play','15 min cooldown']
    }
  };
  const wSel  = document.getElementById('workout-level-select');
  const wPlan = document.getElementById('workout-plan');
  function renderWorkouts(lvl){
    wPlan.innerHTML = '';
    Object.entries(workouts[lvl]||{}).forEach(([day,exs])=>{
      const d = document.createElement('div');
      d.className='workout-day';
      d.innerHTML = `<h3>${day}</h3><ul>${exs.map(x=>`<li>${x}</li>`).join('')}</ul>`;
      wPlan.appendChild(d);
    });
  }
  wSel.addEventListener('change', ()=>renderWorkouts(wSel.value));
  renderWorkouts(wSel.value);

  //
  // 5) Film Analysis + Rule-Based Tips
  //
  const upload     = document.getElementById('video-upload');
  const gameVid    = document.getElementById('game-video');
  const canvas     = document.getElementById('frame-canvas');
  const analyzeBtn = document.getElementById('analyze-btn');
  const outDiv     = document.getElementById('analysis-result');

  // load MoveNet
  let detector;
  try {
    detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      { modelType:'SinglePose.Lightning' }
    );
    analyzeBtn.disabled = false;
  } catch (e) {
    console.error(e);
    outDiv.textContent = 'Failed to load film analyzer.';
  }

  // show video on upload
  upload.addEventListener('change', e => {
    const f = e.target.files[0];
    if (f) {
      gameVid.src = URL.createObjectURL(f);
      gameVid.hidden = false;
    }
  });

  // compute angle ABC
  function getAngle(A,B,C) {
    const AB={x:A.x-B.x,y:A.y-B.y}, CB={x:C.x-B.x,y:C.y-B.y};
    const dot=AB.x*CB.x + AB.y*CB.y;
    const mag=Math.hypot(AB.x,AB.y)*Math.hypot(CB.x,CB.y);
    if (!mag) return 0;
    return Math.acos(Math.max(-1,Math.min(1,dot/mag))) * (180/Math.PI);
  }

  // extract metrics
  function extractMetrics(pose) {
    const m={}, kp=pose.keypoints.reduce((o,k)=>{o[k.name]=k;return o;},{});
    m.kneeL = getAngle(kp.hipLeft, kp.kneeLeft, kp.ankleLeft);
    m.kneeR = getAngle(kp.hipRight,kp.kneeRight,kp.ankleRight);
    m.elbowL= getAngle(kp.shoulderLeft,kp.elbowLeft,kp.wristLeft);
    m.elbowR= getAngle(kp.shoulderRight,kp.elbowRight,kp.wristRight);
    m.hipL  = getAngle(kp.shoulderLeft,kp.hipLeft,kp.kneeLeft);
    m.hipR  = getAngle(kp.shoulderRight,kp.hipRight,kp.kneeRight);
    m.shoulderTilt = Math.abs(kp.shoulderLeft.y - kp.shoulderRight.y);
    m.footWidth    = Math.abs(kp.ankleLeft.x - kp.ankleRight.x);
    m.wristAvgY    = (kp.wristLeft.y + kp.wristRight.y)/2;
    return m;
  }

  // multi-frame analysis + rules
  async function analyzeWithRules(frames=5) {
    const ctx=canvas.getContext('2d'), dur=gameVid.duration;
    const list=[];
    for (let i=1;i<=frames;i++){
      gameVid.currentTime = (dur*i)/(frames+1);
      await new Promise(r=>gameVid.addEventListener('seeked',r,{once:true}));
      canvas.width=gameVid.videoWidth;
      canvas.height=gameVid.videoHeight;
      ctx.drawImage(gameVid,0,0);
      const poses = await detector.estimatePoses(gameVid).catch(()=>[]);
      if (poses[0]) list.push(extractMetrics(poses[0]));
    }
    const avg={};
    list.forEach(m=>{ for(let k in m) avg[k]=(avg[k]||0)+m[k]/list.length; });
    const tips=[];
    // 20+ rules
    if (avg.kneeL>160&&avg.kneeR>160)
      tips.push("Bend your knees more for stable, powerful lunges.");
    if (avg.kneeL<60&&avg.kneeR<60)
      tips.push("Avoid over-bending—aim for ~90° at knees.");
    if (avg.elbowL>160&&avg.elbowR>160)
      tips.push("Keep a slight elbow bend for quicker racquet prep.");
    if (avg.elbowL<30||avg.elbowR<30)
      tips.push("Widen your elbow angle for a fuller swing.");
    if (avg.hipL>150&&avg.hipR>150)
      tips.push("Add torso twists to generate more shot power.");
    if (avg.shoulderTilt>20)
      tips.push("Square your shoulders to improve consistency.");
    if (avg.footWidth<50)
      tips.push("Widen stance for better balance on drives.");
    if (avg.footWidth>200)
      tips.push("Bring feet closer for faster direction changes.");
    if (avg.wristAvgY>gameVid.videoHeight*0.7)
      tips.push("Raise your racquet hand to chest level for quicker net coverage.");
    tips.push("Focus on split-step timing to react faster.");
    tips.push("Practice weight shifts from back to front foot on smashes.");
    tips.push("Keep your head stable over center-of-gravity for balance.");
    tips.push("Lift knees higher in footwork drills to cover the court.");
    tips.push("Incorporate dynamic lunges to improve reach and recovery.");
    tips.push("Shadow swing in front of a mirror to refine your arc.");
    tips.push("Use wrist snap drills for sharper drop shots.");
    tips.push("Add pivot drills for quicker backhand transitions.");
    tips.push("Jump-smash practice boosts vertical leap and steepness.");
    tips.push("Stay on toes with knees bent for improved return stance.");
    tips.push("Balance-board work strengthens ankle stability.");
    tips.push("Do agility ladder crossovers for evasive movement.");
    tips.push("Add side-lunges with controlled knee flexion to protect joints.");
    tips.push("Use resistance bands on your racket arm for endurance.");
    tips.push("Check your center of gravity mid-rally to avoid overreaching.");
    tips.push("Cool-down with static stretches focusing on hips and shoulders.");
    if (!tips.length) tips.push("No major issues detected—nice form!");

    return tips;
  }

  // hook up Analyze
  analyzeBtn.addEventListener('click', async ()=>{
    outDiv.textContent = 'Analyzing…';
    const results = await analyzeWithRules(5);
    outDiv.innerHTML = '<ul>' + results.map(t=>`<li>${t}</li>`).join('') + '</ul>';
  });
});