document.addEventListener("DOMContentLoaded", () => {
  const email = localStorage.getItem("users");

  
  function formatRupees(amount) {
    return amount.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).replace("₹", "Rs.");
  }

 
  function fetchAccounts() {
    if (!email) {
      console.error("No email found in localStorage");
      return;
    }

    fetch(`/user/${email}`, { method: "GET" })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (!data.balances || !Array.isArray(data.balances)) {
          console.error("Invalid account data from server", data);
          return;
        }

        data.balances.forEach(acc => {
          const card = document.querySelector(`.account-card.${acc.type}`);
          if (!card) return;
          const amountEl = card.querySelector(".amount");
          amountEl.textContent = formatRupees(acc.balance);

          card.querySelector(".details-column.left p:nth-child(1)").textContent = `Account No: ${acc.account_no}`;

          card.querySelector(".details-column.left p:nth-child(2)").textContent = `Branch: ${acc.branch}`;

          card.querySelector(".details-column.right p:nth-child(1)").textContent = `Name: ${acc.account_name}`;

          card.querySelector(".details-column.right p:nth-child(2)").textContent = `IFSC code: ${acc.IFSC}`;
        });
      })
      .catch(err => {
        console.error("Error fetching account details:", err);
      });
  }

  function setWelcomeMessage() {
    const welcomeMessage = document.getElementById("welcome-message");
    const customerID = "User";
    welcomeMessage.textContent = `Greetings ${customerID}!`;
  }


  function setupTabs() {
    const tabs = document.querySelectorAll(".sidebar .tab");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-tab");

        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));

        tab.classList.add("active");
        document.getElementById(target).classList.add("active");
      });
    });
  }

  function setupCards() {
    const headers = document.querySelectorAll(".toggle-header");

    headers.forEach(header => {
      header.addEventListener("click", () => {
        const card = header.closest(".account-card");
        document.querySelectorAll(".account-card").forEach(c => {
          if (c !== card) c.classList.remove("active");
        });
        card.classList.toggle("active");
      });
    });
  }


  function handleTransfer() {
    const transferForm = document.getElementById("transfer-form");
    if (!transferForm) return;

    const balances = {};


    function updateBalancesFromUI() {
      document.querySelectorAll(".account-card").forEach(card => {
        const type = card.classList.contains("savings")
          ? "savings"
          : card.classList.contains("current")
          ? "current"
          : card.classList.contains("credits")
          ? "credits"
          : null;
        if (type) {
          const amountText = type.balance|| "Rs.0.00";
          const amount = parseFloat(amountText.replace(/[Rs.,\s]/g, "")) || 0;
          balances[type] = amount;
        }
      });
    }


    updateBalancesFromUI();

    transferForm.addEventListener("submit", e => {
      e.preventDefault();

      const fromAccount = document.getElementById("from-account").value;
      const amountInput = document.getElementById("amount").value;
      const amount = parseFloat(amountInput);

      if (!fromAccount || isNaN(amount) || amount <= 0) {
        alert("Please fill in all fields with valid values.");
        return;
      }

      if (!(fromAccount in balances)) {
        alert("Selected account is invalid.");
        return;
      }

      if (balances[fromAccount] < amount) {
        alert("Insufficient balance!");
        return;
      }

    
      balances[fromAccount] -= amount;
 
      const card = document.querySelector(`.account-card.${fromAccount}`);
      if (card) {
        card.querySelector(".amount").textContent = formatRupees(balances[fromAccount]);
      }

      const transferMsg = document.getElementById("transfer-message");
      transferMsg.textContent = `Transfer of ${formatRupees(amount)} from your ${fromAccount} account is successful!`;

      document.querySelector('.sidebar .tab[data-tab="account-summary"]').click();

      transferForm.reset();

      setTimeout(() => {
        transferMsg.textContent = "";
      }, 5000);
    });
  }


  function setupStatementModal() {
    const viewButtons = document.querySelectorAll(".view-btn");
    const modal = document.getElementById("statement-modal");
    const closeBtn = document.querySelector(".close-btn");

    viewButtons.forEach(btn => {
      btn.addEventListener("click", () => {
       
        modal.style.display = "block";
      });
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", e => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }


  function setupLogout() {
    const logoutBtn = document.getElementById("logout-button");
    if (!logoutBtn) return;

    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("users");
      window.location.href = "../login/login.html";
    });
  }


  function initApp() {
    setWelcomeMessage();
    fetchAccounts();
    setupTabs();
    setupCards();
    handleTransfer();
    setupStatementModal();
    setupLogout();
  }

  initApp();

 
 
});
