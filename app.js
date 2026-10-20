const PASSCODE = "1809";
const phone = document.getElementById("phone");
const message = document.getElementById("message");
const dots = [...document.querySelectorAll(".dot")];
let entered = "", panelOpen = false, overlayOpen = false, cameraOpen = false;
let touchStartY = null, flashOn = false, cameraFacing = false;

function updateClock(){
  const now = new Date();
  const time = now.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit",hour12:false});
  document.getElementById("clock").textContent = time;
  document.getElementById("statusTime").textContent = time;
  document.getElementById("date").textContent = now.toLocaleDateString([], {weekday:"long",month:"long",day:"numeric"});
}
updateClock(); setInterval(updateClock, 1000);

function renderDots(){ dots.forEach((d,i)=>d.classList.toggle("filled",i<entered.length)); }
function pressKey(n){
  if(phone.classList.contains("unlocked") || entered.length>=4) return;
  entered+=n; message.textContent=""; renderDots();
  if(entered.length===4) setTimeout(checkPasscode,180);
}
function deleteKey(){entered=entered.slice(0,-1);message.textContent="";renderDots();}
function checkPasscode(){
  if(entered===PASSCODE){
    phone.classList.add("unlocked");
    document.getElementById("lockSymbol").textContent="🔓";
    message.textContent="";
  }else{
    message.textContent="Incorrect passcode — try again";
    phone.animate([{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:180});
  }
  entered="";renderDots();
}
function unlock(){if(!phone.classList.contains("unlocked")){entered=PASSCODE;checkPasscode();}}
function lockPhone(){
  hideOverlays();closeCamera();closeApp();
  phone.classList.remove("unlocked");entered="";renderDots();
  document.getElementById("lockSymbol").textContent="🔒";
  message.textContent="";
}
function togglePeek(){phone.classList.toggle("peeking");}
function openApp(name,icon){
  if(!phone.classList.contains("unlocked"))return;
  closeCamera();hideOverlays();panelOpen=true;
  document.getElementById("panelIcon").textContent=icon;
  document.getElementById("panelTitle").textContent=name;
  const descriptions={
    Messages:"Your conversations appear here in this visual demo.",
    Calendar:"Your events and schedule preview.",
    Photos:"Your photo library preview.",
    Weather:"A sample weather app screen.",
    Notes:"<Use the notes area below to write something.>",
    Settings:"Personalize this demo phone.",
    Music:"Music player preview.",
    Phone:"Phone keypad preview.",
    Safari:"Browser preview — no website is opened.",
    Mail:"Inbox preview.",
    Maps:"Map app preview.",
    Clock:"Clock and timer preview."
  };
  document.getElementById("panelText").textContent=descriptions[name]||"This app is a visual preview.";
  const extra=document.getElementById("panelExtra");
  extra.innerHTML="";
  if(name==="Notes"){
    const area=document.createElement("textarea");
    area.placeholder="Write a note...";
    area.style="width:100%;height:140px;margin-top:16px;padding:12px;border:1px solid #ddd;border-radius:12px;font:inherit";
    extra.appendChild(area);
  }
  if(name==="Settings"){
    extra.innerHTML='<div class="settings-row">🔔 &nbsp; Notifications</div><div class="settings-row">🌙 &nbsp; Display & Brightness</div><div class="settings-row">🔒 &nbsp; Passcode demo: 1809</div>';
  }
  document.getElementById("appPanel").style.display="block";
}
function closeApp(){document.getElementById("appPanel").style.display="none";panelOpen=false;}
function showOverlay(which){
  if(which==="control")document.getElementById("controlOverlay").style.display="block";
  else document.getElementById("notificationsOverlay").style.display="block";
  overlayOpen=true;
}
function hideOverlays(){
  document.getElementById("controlOverlay").style.display="none";
  document.getElementById("notificationsOverlay").style.display="none";
  overlayOpen=false;
}
function toggleButton(btn){
  const active=btn.dataset.active!=="yes";
  btn.dataset.active=active?"yes":"no";
  btn.style.background=active?"#3784f6":"#ffffff24";
}
function openCamera(){
  hideOverlays();closeApp();
  document.getElementById("cameraView").style.display="block";
  cameraOpen=true;
}
function closeCamera(){document.getElementById("cameraView").style.display="none";cameraOpen=false;}
function takePhoto(){notify("Camera","Photo captured in demo mode.");}
function flipCamera(){cameraFacing=!cameraFacing;document.getElementById("cameraView").style.filter=cameraFacing?"hue-rotate(35deg)":"none";}
function flashlight(){
  flashOn=!flashOn;
  notify("Flashlight",flashOn?"Flashlight effect enabled (demo).":"Flashlight effect disabled.");
  document.querySelector(".wallpaper").style.filter=flashOn?"brightness(1.5)":"brightness(1)";
}
function notify(title,text){
  const toast=document.getElementById("toast");
  toast.innerHTML="<b>"+title+"</b>"+text;
  toast.style.display="block";
  clearTimeout(window.toastTimer);
  window.toastTimer=setTimeout(()=>toast.style.display="none",2200);
}
function homeAction(){
  if(cameraOpen){closeCamera();return;}
  if(overlayOpen){hideOverlays();return;}
  if(panelOpen){closeApp();return;}
  if(phone.classList.contains("unlocked")){return;}
  unlock();
}

/* Swipe up to unlock; swipe down from top for notifications/control center. */
phone.addEventListener("touchstart",e=>{touchStartY=e.touches[0].clientY;},{passive:true});
phone.addEventListener("touchend",e=>{
  if(touchStartY===null)return;
  const endY=e.changedTouches[0].clientY,delta=endY-touchStartY;
  if(delta < -45 && !phone.classList.contains("unlocked")) unlock();
  else if(delta < -45 && panelOpen) closeApp();
  else if(delta > 55 && touchStartY < 100) showOverlay("notifications");
  else if(delta > 55 && touchStartY > window.innerHeight-130) togglePeek();
  touchStartY=null;
},{passive:true});

/* Keyboard shortcuts for desktop testing */
document.addEventListener("keydown",e=>{
  if(e.key>="0"&&e.key<="9")pressKey(e.key);
  if(e.key==="Backspace")deleteKey();
  if(e.key==="Escape"){hideOverlays();closeApp();closeCamera();}
});
