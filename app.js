(() => {
  const PASSCODE = "1809";
  let entered = "";
  const lockScreen = document.getElementById("lockScreen");
  const homeScreen = document.getElementById("homeScreen");
  const appView = document.getElementById("appView");
  const dots = [...document.querySelectorAll(".dots i")];
  const error = document.getElementById("pinError");
  const wallpaper = document.querySelector(".wallpaper");
  const appContent = document.getElementById("appContent");
  const appTitle = document.getElementById("appTitle");

  function updateDots() { dots.forEach((dot, i) => dot.classList.toggle("filled", i < entered.length)); }
  function showError(message) {
    error.textContent = message;
    document.querySelector(".keypad").animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:220});
  }
  function addDigit(digit) {
    if (entered.length >= 4) return;
    entered += digit; updateDots(); error.textContent = "";
    if (entered.length === 4) {
      if (entered === PASSCODE) {
        error.textContent = "";
        setTimeout(() => { lockScreen.classList.add("hidden"); homeScreen.classList.remove("hidden"); entered = ""; updateDots(); }, 180);
      } else {
        showError("Incorrect passcode. Try again.");
        setTimeout(() => { entered = ""; updateDots(); }, 450);
      }
    }
  }
  document.querySelectorAll("[data-digit]").forEach(btn => btn.addEventListener("click", () => addDigit(btn.dataset.digit)));
  document.getElementById("deleteDigit").addEventListener("click", () => { entered = entered.slice(0,-1); error.textContent = ""; updateDots(); });
  document.getElementById("cancelPin").addEventListener("click", () => { entered = ""; updateDots(); error.textContent = ""; });
  document.getElementById("emergencyButton").addEventListener("click", () => showError("Emergency calling is not available in this demo."));
  document.addEventListener("keydown", e => {
    if (lockScreen.classList.contains("hidden")) return;
    if (/^\d$/.test(e.key)) addDigit(e.key);
    if (e.key === "Backspace") { entered = entered.slice(0,-1); updateDots(); error.textContent = ""; }
  });
  function lockPhone() {
    appView.classList.add("hidden"); homeScreen.classList.add("hidden"); lockScreen.classList.remove("hidden");
    entered = ""; updateDots(); error.textContent = "";
  }
  document.getElementById("lockNow").addEventListener("click", lockPhone);
  document.getElementById("backHome").addEventListener("click", () => { appView.classList.add("hidden"); homeScreen.classList.remove("hidden"); });
  document.querySelectorAll("[data-app]").forEach(btn => btn.addEventListener("click", () => openApp(btn.dataset.app)));

  const appInfo = {
    photos:["Photos","🌈","Your memories, all in one place."],
    messages:["Messages","●","Your conversations will appear here."],
    camera:["Camera","◉","Camera preview is simulated in this demo."],
    settings:["Settings","⚙","Wallpaper · Display & Brightness · Passcode"],
    notes:["Notes","▤","A little space for your thoughts."],
    music:["Music","♫","Your music library is waiting."],
    calendar:["Calendar","21","Nothing planned for today."],
    phone:["Phone","☎","Favorites · Recents · Contacts · Keypad"],
    safari:["Safari","◉","A little window to the web — simulated offline."]
  };
  function openApp(name) {
    homeScreen.classList.add("hidden"); appView.classList.remove("hidden");
    if (name === "instagram") {
      appTitle.textContent = "Instagram";
      appContent.innerHTML = `
        <div class="ig-top">Instagram <span class="ig-actions">♡　✉</span></div>
        <div class="stories">
          <div class="story"><div class="story-ring"><img src="wallpaper.jpg" alt=""></div>Your story</div>
          <div class="story"><div class="story-ring"><img src="wallpaper.jpg" alt=""></div>alex</div>
          <div class="story"><div class="story-ring"><img src="wallpaper.jpg" alt=""></div>daily</div>
          <div class="story"><div class="story-ring"><img src="wallpaper.jpg" alt=""></div>friends</div>
        </div>
        <div class="post-head"><img src="wallpaper.jpg" alt=""><span>your.favorites<br><small style="font-weight:400">Suggested for you</small></span><span style="margin-left:auto">•••</span></div>
        <img class="post-image" src="wallpaper.jpg" alt="Photo used as phone wallpaper">
        <div class="post-buttons"><span>♡</span><span>♧</span><span>➤</span><span style="margin-left:auto">♧</span></div>
        <div class="caption"><b>your.favorites</b> a little moment worth keeping ✨<br><span style="color:#777">View all 18 comments</span></div>`;
    } else {
      const info = appInfo[name] || ["App","✦","This app is part of the interactive phone demo."];
      appTitle.textContent = info[0];
      appContent.innerHTML = `<div class="generic-app"><div class="big-symbol">${info[1]}</div><h2>${info[0]}</h2><p>${info[2]}</p><button id="genericBack">Back to Home</button></div>`;
      document.getElementById("genericBack").addEventListener("click", () => { appView.classList.add("hidden"); homeScreen.classList.remove("hidden"); });
    }
  }
  function setTime() {
    const now = new Date();
    const time = now.toLocaleTimeString([], {hour:"numeric",minute:"2-digit"});
    document.getElementById("statusTime").textContent = time;
    document.getElementById("lockClock").textContent = time;
    document.getElementById("homeClock").textContent = time;
    const date = now.toLocaleDateString([], {weekday:"long",month:"long",day:"numeric"});
    document.getElementById("lockDate").textContent = date;
    document.querySelector(".home-date span+span").textContent = date;
  }
  setTime(); setInterval(setTime, 30000);
})();