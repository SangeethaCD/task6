document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("login-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const error_msg = document.getElementById("error-message");
        localStorage.setItem('users',email);
        if (!email || !password) {
          throw new Error("Please provide all the required information");
        }
        if (password.length < 4) {
          throw new Error("The password must be greater than 4");
        }
        
        const response = await fetch('/login',{
            method:'POST',
            headers:{
                'content-Type':"application/json"
            },
            body:JSON.stringify({email,password})
        })

        const result = await response.text();

        if(!response.ok)
        {
            error_msg.style.display='block';
            throw new Error("There is an error in fetching the data");
        }
        console.log("The user is success at login."+result);
        window.location.href='../home/home.html';
      } catch (err) {
        console.log(err);
      }
    });
});
