(() => {
  "use strict";
  const PASSCODE = "1809";
  const $ = (id) => document.getElementById(id);
  const lockView = $("lockView");
  const passcodeView = $("passcodeView");
  const homeView = $("homeView");
  const appView = $("appView");
  const dots = [...$("passcodeDots").children];
  const error = $("passcodeError");
  const lockWallpaper = $("lockWallpaper");
  const homeWallpaper = $("homeWallpaper");
  let entered = "";
  let unlocked = false;
  let startY = null;
  let toastTimer = null;

  const appInfo = {
    instagram: { name: "Instagram", icon: "◎", cls: "instagram", bg: "linear-gradient(145deg,#21122f,#080810)" },
    whatsapp: { name: "WhatsApp", icon: "☎", cls: "whatsapp", bg: "linear-gradient(145deg,#063d31,#061a17)" },
    music: { name: "", label: "Music", cls: "music", bg: "linear-gradient(145deg,#29242a,#07070a)" },
    facetime: { name: "FaceTime", icon: "▰", cls: "facetime" },
    calendar: { name: "Kalender", icon: "21", cls: "calendar" },
    photos: { name: "Foto", icon: "✿", cls: "photos" },
    camera: { name: "Kamera", icon: "◎", cls: "camera" },
    mail: { name: "Mail", icon: "✉", cls: "mail" },
    notes: { name: "Catatan", icon: "☰", cls: "notes" },
    reminders: { name: "Pengingat", icon: "☷", cls: "reminders" },
    clock: { name: "Jam", icon: "◷", cls: "clock" },
    appstore: { name: "App Store", icon: "A", cls: "appstore" },
    maps: { name: "Peta", icon: "➤", cls: "maps" },
    health: { name: "Kesehatan", icon: "♥", cls: "health" },
    wallet: { name: "Dompet", icon: "▤", cls: "wallet" },
    phone: { name: "Telepon", icon: "☎", cls: "phone-icon" },
    safari: { name: "Safari", icon: "◉", cls: "safari" },
    messages: { name: "Pesan", icon: "●", cls: "messages" }
  };

  function showToast(message) {
    const toast = $("toast");
    toast.textContent = message;
    toast.classList.remove("hidden");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.add("hidden"), 1900);
  }

  function setView(view) {
    [lockView, passcodeView, homeView, appView].forEach(el => el.classList.add("hidden"));
    view.classList.remove("hidden");
  }

  function beginUnlock() {
    if (unlocked) return;
    entered = "";
    updateDots();
    error.textContent = "";
    setView(passcodeView);
  }

  function updateDots() {
    dots.forEach((dot, index) => dot.classList.toggle("filled", index < entered.length));
  }

  function enterDigit(digit) {
    if (entered.length >= 4) return;
    entered += digit;
    updateDots();
    error.textContent = "";
    if (entered.length === 4) {
      if (entered === PASSCODE) {
        unlocked = true;
        window.setTimeout(() => {
          setView(homeView);
          showToast("iPhone terbuka");
        }, 180);
      } else {
        error.textContent = "Kode sandi salah. Coba lagi.";
        window.setTimeout(() => {
          entered = "";
          updateDots();
        }, 550);
      }
    }
  }

  function goHome() {
    if (!unlocked) {
      setView(lockView);
      return;
    }
    setView(homeView);
  }

  function openApp(app) {
    if (!unlocked) return;
    const info = appInfo[app] || { name: app, icon: "◦", cls: "" };
    const splash = $("appSplash");
    splash.innerHTML = "";
    const icon = document.createElement("span");
    icon.className = "app-icon " + (info.cls || "");
    icon.textContent = info.icon || "◦";
    const label = document.createElement("strong");
    label.textContent = info.label || info.name;
    splash.append(icon, label);
    $("appView").style.setProperty("--splash-bg", info.bg || "linear-gradient(145deg,#1b2030,#050609)");
    setView(appView);
  }

  $("swipePrompt").addEventListener("click", beginUnlock);
  $("swipeArea").addEventListener("click", beginUnlock);
  $("screen").addEventListener("touchstart", event => {
    startY = event.touches[0].clientY;
  }, { passive: true });
  $("screen").addEventListener("touchend", event => {
    if (startY === null) return;
    const endY = event.changedTouches[0].clientY;
    if (!unlocked && startY - endY > 35 && !passcodeView.classList.contains("hidden")) return;
    if (!unlocked && startY - endY > 35 && !lockView.classList.contains("hidden")) beginUnlock();
    startY = null;
  }, { passive: true });

  $("keypad").addEventListener("click", event => {
    const key = event.target.closest("[data-digit]");
    if (key) enterDigit(key.dataset.digit);
  });
  $("deleteDigit").addEventListener("click", () => {
    entered = entered.slice(0, -1);
    error.textContent = "";
    updateDots();
  });
  $("backToLock").addEventListener("click", () => setView(lockView));
  $("notification").addEventListener("click", () => {
    if (!unlocked) {
      showToast("Masukkan kode sandi untuk membuka notifikasi");
      beginUnlock();
    } else openApp("whatsapp");
  });
  $("homeIndicator").addEventListener("click", goHome);
  $("appBack").addEventListener("click", goHome);
  $("flashlight").addEventListener("click", () => showToast("Senter simulasi"));
  $("cameraShortcut").addEventListener("click", () => {
    if (unlocked) openApp("camera");
    else showToast("Masukkan kode sandi untuk membuka kamera");
  });
  document.querySelectorAll("[data-app]").forEach(button => {
    button.addEventListener("click", () => openApp(button.dataset.app));
  });

  // Keyboard support for desktop preview.
  document.addEventListener("keydown", event => {
    if (!passcodeView.classList.contains("hidden") && /^[0-9]$/.test(event.key)) enterDigit(event.key);
    if (!passcodeView.classList.contains("hidden") && event.key === "Backspace") {
      entered = entered.slice(0, -1); updateDots();
    }
    if (event.key === "Escape" && unlocked) goHome();
  });

  function updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false });
    $("statusTime").textContent = time;
    $("lockClock").textContent = time;
  }
  updateTime();
  setInterval(updateTime, 30000);

  // The home wallpaper only appears after the correct passcode.
  const observer = new MutationObserver(() => {
    const isHome = !homeView.classList.contains("hidden") || !appView.classList.contains("hidden");
    lockWallpaper.style.opacity = isHome ? "0" : "1";
    homeWallpaper.style.opacity = isHome ? "1" : "0";
  });
  observer.observe($("screen"), { subtree: true, attributes: true, attributeFilter: ["class"] });
})();