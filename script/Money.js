const userId = 1;

let money = 0;

// Charger l'argent de l'utilisateur depuis le serveur
async function loadMoney() {
  try {
    const res = await fetch(`api/get_money.php?user_id=${userId}`);
    const data = await res.json();
    if (data.success) {
      money = parseInt(data.money) || 0;
      document.getElementById("astrite").textContent = money;
    } else {
      alert("Erreur chargement astrite: " + data.error);
    }
  } catch (e) {
    alert("Erreur réseau lors du chargement de astrite: " + e.message);
  }
}

// Ajouter de l'argent côté serveur
async function addMoney() {
  const amount = parseInt(document.getElementById("addMoneyAmount").value);
  if (!isNaN(amount) && amount > 0) {
    try {
      const res = await fetch("api/update_money.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, money_to_add: amount }),
      });
      const data = await res.json();
      if (data.success) {
        money += amount;
        document.getElementById("astrite").textContent = money;
        closeMoneyModal();
      } else {
        alert("Erreur API: " + data.error);
      }
    } catch (e) {
      alert("Erreur réseau: " + e.message);
    }
  } else {
    alert("Entrez un montant valide.");
  }
}
function openMoneyModal() {
    document.getElementById("moneyModal").style.display = "flex";
    document.getElementById("addMoneyAmount").value = "";
  }
  function closeMoneyModal() {
    document.getElementById("moneyModal").style.display = "none";
}
document.querySelector("#ajouterAstrite").addEventListener("click", openMoneyModal)
document.querySelector("#validerAjout").addEventListener("click",addMoney)
document.querySelector("#fermerAjout").addEventListener("click",closeMoneyModal)

export {loadMoney, addMoney, openMoneyModal, closeMoneyModal};