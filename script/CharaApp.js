let currentCharId = null;
let currentCountSpan = null;
const userId = 1;
function openModal(id, span) {
    currentCharId = id;
    currentCountSpan = span;
    document.getElementById('modalInput').value = span.textContent;
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function saveCount() {
    const val = parseInt(document.getElementById('modalInput').value);
    if (isNaN(val)) return;

    fetch('./api/update_character.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: currentCharId, Nombre: val })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                currentCountSpan.textContent = val;
            } else {
                alert('Erreur : ' + data.error);
            }
            closeModal();
        });
}

// Charger personnages
fetch('./api/get_characters.php')
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            let container = ""
            let top = "d-flex"
            let top2 = "d-flex"
            data.characters.forEach(char => {
                const div = document.createElement('div');
                if (char.Nombre > 0) {
                    top = "d-flex"
                    top2 = "d-none"
                    container = document.getElementById('characterUnlockList');
                    if (char.Nombre > 6) {
                        div.className = "maxed "
                    }
                }
                else {
                    top = "d-none";
                    top2 = "d-flex"
                    container = document.getElementById('characterLockList');
                }
                div.className += 'character R' + char.rarity; // applique classe selon type
                div.innerHTML = `
                        <div class="top-bar ${top}">
                                <span class="count">S${char.Nombre - 1}</span>
                        </div>
                        <div class="top-bar2 ${top2}">
                                <span class="locked">Not obtained yet</span>
                        </div>
                        <img src="${char.LienImage.trim()}" alt="${char.Nom}">
                         <button class="btn">Modifier</button>
                        <div class="info-bar">
                            <span class="type-icon">
                                        <img class="character-image" src="https://wutheringlab.com/wp-content/uploads/Wuthering-Waves-${char.Type}.png"alt="${char.Type}">

                            </span>
                        <a class="character-name" href="${char.LienVersBuild}" target="_blank">${char.Nom}</a>
                        </div>
                        `;
                const countSpan = div.querySelector('.count');
                div.querySelector('.btn').onclick = () => openModal(char.id, countSpan);
                container.appendChild(div);
            });
        }
    });


    // Charger l'argent de l'utilisateur depuis le serveur
async function loadMoney() {
  try {
    const res = await fetch(`api/get_money.php?user_id=${userId}`);
    const data = await res.json();
    if (data.success) {
      money = parseInt(data.money) || 0;
      document.getElementById("money").textContent = money;
    } else {
      alert("Erreur chargement money: " + data.error);
    }
  } catch (e) {
    alert("Erreur réseau lors du chargement de money: " + e.message);
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
        document.getElementById("money").textContent = money;
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


loadMoney()