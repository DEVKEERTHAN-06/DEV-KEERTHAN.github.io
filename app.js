'use strict';
const root = document.documentElement;
const mediaReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
let motionEnabled = !mediaReduced.matches;
const motionButton = document.getElementById('motion-toggle');
function updateMotion() {
 root.classList.toggle('motion-off', !motionEnabled);
 motionButton.setAttribute('aria-pressed', String(motionEnabled));
 motionButton.querySelector('span').textContent = motionEnabled ? 'on' : 'off';
}
updateMotion();
motionButton.addEventListener('click', () => {motionEnabled = !motionEnabled;updateMotion();});
mediaReduced.addEventListener('change', e => {motionEnabled = !e.matches;updateMotion();});
if ('IntersectionObserver' in window) {
 root.classList.add('js');
 const reveal = new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('is-visible');reveal.unobserve(entry.target);}}),{threshold:.08});
 document.querySelectorAll('.reveal').forEach(el=>reveal.observe(el));
 const active = new IntersectionObserver(entries => entries.forEach(entry=>{if(entry.isIntersecting)document.querySelectorAll('.desktop-nav a').forEach(link=>link.classList.toggle('active',link.hash==='#'+entry.target.id));}),{rootMargin:'-15% 0px -65% 0px'});
 document.querySelectorAll('main>section[id]').forEach(el=>active.observe(el));
}
let ticking = false;
function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('.scroll-progress').style.width=(max>0?scrollY/max*100:0)+'%';ticking=false;}
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateProgress);ticking=true;}},{passive:true});updateProgress();
const menuButton=document.querySelector('.menu-button');
const mobileNav=document.getElementById('mobile-nav');
function closeMenu(){mobileNav.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation');}
menuButton.addEventListener('click',()=>{const open=mobileNav.hidden;mobileNav.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!mobileNav.hidden){closeMenu();menuButton.focus();}});
window.matchMedia('(min-width: 601px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
const areas={
 ai:{label:'FREELANCE WORK & PROJECT DELIVERY',title:'AI as a development partner.',text:'My freelance work at ShikshaSetu Academy in Koppal included BCA software, antenna and IoT projects delivered with AI assistance. I bring prompt engineering and software skills to this practical project experience.',skills:['Prompt engineering','AI-assisted development','Software skills','Python','C'],foot:'ShikshaSetu Academy: 100+ BCA, 23+ antenna and 30+ IoT projects.',icon:'code'},
 digital:{label:'FOUNDATIONS & CAREER DIRECTION',title:'Thinking at the logic level.',text:'A foundation in digital electronics and Verilog, supported by C, Python and object-oriented programming. My goal is to build deeper practical experience in RTL design and functional verification.',skills:['Verilog','Digital electronics','C','Python','OOP'],foot:'Next focus: RTL projects with documented verification.',icon:'code'},
 embedded:{label:'PROTOTYPING & INTERFACING',title:'Connecting inputs to action.',text:'Practical work with microcontrollers, sensors and actuators. My project experience includes Arduino-based automation, embedded C programming, circuit integration and troubleshooting.',skills:['Arduino','ESP32','ESP8266','Embedded C','UART / I²C / SPI','EasyEDA'],foot:'Project application: sensor-based home monitoring and control.',icon:'circuit'},
 rf:{label:'SIMULATION & ANALYSIS',title:'Exploring the invisible.',text:'Academic antenna work using ANSYS HFSS to examine how geometry and materials affect electromagnetic behavior. Analysis includes S-parameters, impedance matching, bandwidth and radiation patterns.',skills:['ANSYS HFSS','S-parameters','VSWR','Impedance matching','Radiation patterns'],foot:'Scope: simulated antenna designs and comparative analysis.',icon:'radio'}
};
const tabs=[...document.querySelectorAll('[role="tab"]')];
function activateTab(tab){tabs.forEach(t=>{const yes=t===tab;t.setAttribute('aria-selected',String(yes));t.tabIndex=yes?0:-1;});const data=areas[tab.dataset.area];const panel=document.getElementById('expertise-panel');panel.setAttribute('aria-labelledby',tab.id);panel.innerHTML=`<span class="pill">${data.label}</span><h3>${data.title}</h3><p>${data.text}</p><div class="skill-chips">${data.skills.map(s=>`<span>${s}</span>`).join('')}</div><div class="panel-foot"><svg><use href="#i-${data.icon}"/></svg><span>${data.foot}</span></div>`;}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>activateTab(tab));tab.addEventListener('keydown',e=>{let next=i;if(['ArrowDown','ArrowRight'].includes(e.key))next=(i+1)%tabs.length;else if(['ArrowUp','ArrowLeft'].includes(e.key))next=(i-1+tabs.length)%tabs.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=tabs.length-1;else return;e.preventDefault();tabs[next].focus();activateTab(tabs[next]);});});
const projects={
 antenna:{type:'RF SIMULATION · AUG 2024 — JAN 2025',title:'Compact 5G antenna simulation for IoT applications',intro:'An academic study of compact antenna design for connected devices, developed through electromagnetic simulation in ANSYS HFSS.',tools:['ANSYS HFSS','S11 analysis','VSWR','Impedance matching'],steps:[['Design focus','Investigate a compact antenna geometry and examine how its parameters affect matching and radiation behavior.'],['Technical work','Model the antenna in HFSS and examine S11, VSWR, bandwidth and radiation efficiency. Compare design variations to understand the effect of geometry and impedance matching.'],['Documentation','Document the design methodology and simulation analysis. This project is associated with an IJRAR research publication referenced in my resume.'],['Engineering takeaways','Translate a communication requirement into an antenna study; interpret simulation outputs and explain the relationship between geometry and performance.']],scope:'This is presented as simulation work. Semiconductor fabrication, chip integration and measured RF validation are not claimed.'},
 home:{type:'EMBEDDED SYSTEMS & IoT · FEB 2023 — NOV 2023',title:'Smart home automation',intro:'A project connecting sensor acquisition, embedded control and relay-operated outputs for home monitoring and automation.',tools:['Arduino Mega','ESP8266','Embedded C','Sensors & relays','EasyEDA'],steps:[['System approach','Collect environmental or motion-related sensor inputs, process those inputs on a microcontroller, and control connected outputs through relay modules.'],['Technical work','Integrate the Arduino Mega and ESP8266 with sensors and relay modules. Develop embedded C firmware for sensor acquisition and actuator control.'],['Circuit work','Prepare circuit schematics and a PCB layout in EasyEDA. Work through connections and component integration during development.'],['Engineering takeaways','Consider the full path from a physical input to a controlled output, while keeping firmware behavior and circuit connections understandable and testable.']],scope:'Project scope is based on my documented academic work. No commercial deployment, certified safety rating or measured performance guarantee is claimed.'},
 patch:{type:'RF SIMULATION · JAN 2024 — JUL 2024',title:'Microstrip patch antenna optimization',intro:'A comparative simulation study of antenna designs at 2.4 GHz and 5.8 GHz, focused on understanding performance across design variations.',tools:['ANSYS HFSS','Microstrip antennas','S-parameters','Gain & bandwidth'],steps:[['Design focus','Explore microstrip patch antenna models at two operating-frequency targets and study how changes influence their characteristics.'],['Technical work','Run electromagnetic simulations in HFSS and inspect S11, gain, bandwidth and radiation patterns across candidate designs.'],['Comparison approach','Use the same performance measures to compare design variations, distinguishing impedance matching from radiation behavior.'],['Engineering takeaways','Develop familiarity with simulation-led analysis, interpreting RF results and communicating the tradeoffs behind a design decision.']],scope:'Results describe simulation exploration. No fabricated prototype or independently measured gain improvement is claimed.'}
};
const dialog=document.getElementById('project-dialog');
let lastProjectButton;
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{lastProjectButton=button;const p=projects[button.dataset.project];document.getElementById('dialog-content').innerHTML=`<span class="pill">${p.type}</span><h2 id="dialog-title">${p.title}</h2><p>${p.intro}</p><div class="skill-chips">${p.tools.map(t=>`<span>${t}</span>`).join('')}</div>${p.steps.map(([h,t])=>`<h3>${h}</h3><p>${t}</p>`).join('')}<p class="dialog-scope">${p.scope}</p><a class="button primary" href="mailto:devkeerthanofficial@gmail.com?subject=${encodeURIComponent('Let’s discuss: '+p.title)}">Discuss this project <svg><use href="#i-arrow"/></svg></a>`;dialog.showModal();document.body.classList.add('dialog-open');dialog.scrollTop=0;}));
document.getElementById('close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');lastProjectButton?.focus();});
let toastTimeout;
function showToast(message){const toast=document.getElementById('toast');toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>toast.classList.remove('show'),3200);}
document.getElementById('copy-email').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('devkeerthanofficial@gmail.com');showToast('Email address copied.');}catch{showToast('Copy this address: devkeerthanofficial@gmail.com');}});
