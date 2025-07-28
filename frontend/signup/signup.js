document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("signup-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const branch = document.getElementById("branch").value.trim();
        const response = await fetch("/signup", {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password, branch }),
        });

        if (!response.ok) {
          throw new Error("The user cnt be created");
        }
        const result = await response.json();
        console.log("The data is fetched prefectly" + result);
        console.log("Redirecting to login page...");
        window.location.href = "../login/login.html";
      } catch (err) {
        console.log("The error is" + err);
      }
    });
});
