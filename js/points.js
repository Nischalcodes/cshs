const scriptURL = "https://script.google.com/macros/s/AKfycbxjd0Kfty3Iha-nAz2j5qdbLxDF6UbhCp-82RJY7ZUi6Ofv3kPtbrq90ooHgwixO7OP/exec";

let username = "";
let hashedPassword = "";
let refreshInterval = null;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const result = document.getElementById("result");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);

    result.innerHTML = "🔄 Connecting to server...";

    loginAndDisplayPoints();
  });

  function loginAndDisplayPoints() {
    const callbackName = "jsonpCallback_" + Math.floor(Math.random() * 1000000);
    const script = document.createElement("script");

    window[callbackName] = function (data) {
      if (data.success) {
        result.innerHTML = `
          ✅ Welcome <b>${data.name}</b>!<br>
          📝 Meeting Points: <b>${data.meetingPoints}</b><br>
          🛠️ Service Points: <b>${data.servicePoints}</b>
        `;

        if (!refreshInterval) {
          refreshInterval = setInterval(() => {
            refreshPoints();
          }, 5000); // 🔁 Refresh every 5 seconds
        }

      } else {
        result.innerHTML = "❌ Invalid username or password.";
        clearInterval(refreshInterval);
        refreshInterval = null;
      }

      cleanup();
    };

    script.onerror = function () {
      result.innerHTML = "❌ Server error. Try again later.";
      cleanup();
    };

    function cleanup() {
      document.body.removeChild(script);
      delete window[callbackName];
    }

    script.src = `${scriptURL}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(hashedPassword)}&callback=${callbackName}`;
    document.body.appendChild(script);
  }

  function refreshPoints() {
    const callbackName = "jsonpCallback_" + Math.floor(Math.random() * 1000000);
    const script = document.createElement("script");

    window[callbackName] = function (data) {
      if (data.success) {
        result.innerHTML = `
          ✅ Welcome <b>${data.name}</b>!<br>
          📝 Meeting Points: <b>${data.meetingPoints}</b><br>
          🛠️ Service Points: <b>${data.servicePoints}</b>
        `;
      }
      cleanup();
    };

    script.onerror = cleanup;

    function cleanup() {
      document.body.removeChild(script);
      delete window[callbackName];
    }

    script.src = `${scriptURL}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(hashedPassword)}&callback=${callbackName}`;
    document.body.appendChild(script);
  }
});
