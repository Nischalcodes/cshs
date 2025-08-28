const scriptURL = "https://script.google.com/macros/s/AKfycbzK_I6kCP1CW1CDwausjLXkVemaHYzy3lxhQxAzMS6lpE3UyyUnsQsfZZlTOIJxMSGK/exec"; // replace with your actual URL

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const result = document.getElementById("result");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);

    result.innerHTML = "🔄 Connecting to server...";

    const callbackName = "jsonpCallback_" + Math.floor(Math.random() * 1000000);
    const script = document.createElement("script");

    window[callbackName] = function (data) {
      if (data.success) {
        result.innerHTML = `
          ✅ Welcome <b>${data.name}</b>!<br>
          📝 Meeting Points: <b>${data.meetingPoints}</b><br>
          🛠️ Service Points: <b>${data.servicePoints}</b>
        `;
      } else {
        result.innerHTML = "❌ Invalid username or password.";
      }
      cleanup();
    };

    script.onerror = function () {
      result.innerHTML = "❌ Server error.";
      cleanup();
    };

    function cleanup() {
      document.body.removeChild(script);
      delete window[callbackName];
    }

    script.src = `${scriptURL}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(hashedPassword)}&callback=${callbackName}`;
    document.body.appendChild(script);
  });
});

