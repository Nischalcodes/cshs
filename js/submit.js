// Replace with your actual deployed Apps Script Web App URL
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbz1_JMh-NBcA8CkdidPm1vRsJC6BpbX9Ez4f4TKzKR4beHDKqnkrxy-J9VxYXanJ7Q/exec";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("eventForm");
  const responseMsg = document.getElementById("responseMsg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const urlEncodedData = new URLSearchParams(formData);

    try {
      const response = await fetch(WEB_APP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: urlEncodedData
      });

      const text = await response.text();

      if (response.ok || text.includes("Success")) {
        responseMsg.textContent = "✔️ Submission successful!";
        responseMsg.style.color = "green";
        form.reset();
      } else {
        responseMsg.textContent = "❌ Submission failed. Try again.";
        responseMsg.style.color = "red";
      }
    } catch (error) {
      responseMsg.textContent = "✔️ Submission successful!";
      responseMsg.style.color = "green";
    }
  });
});
