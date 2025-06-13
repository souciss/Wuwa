import { loadMoney, addMoney , openMoneyModal, closeMoneyModal } from "./Money.js";
const userId = 1;
window.addMoney = addMoney;
window.openMoneyModal = openMoneyModal;
window.closeMoneyModal = closeMoneyModal;
let money = 0;
let pulls = {};
let results = {};

let currentPortalId = null;
let currentPullsCount = 0;

function openResultModal() {
  document.getElementById("banner5").value = 0;
  document.getElementById("nonBanner5").value = 0;
  document.getElementById("stars4").value = 0;
  document.getElementById("resultModal").style.display = "flex";
}
function closeResultModal() {
  document.getElementById("resultModal").style.display = "none";
}

async function saveResults() {
  const banner5 = parseInt(document.getElementById("banner5").value) || 0;
  const nonBanner5 = parseInt(document.getElementById("nonBanner5").value) || 0;
  const stars4 = parseInt(document.getElementById("stars4").value) || 0;

  if (currentPortalId === null) {
    alert("Erreur : aucun portail sélectionné.");
    closeResultModal();
    return;
  }

  try {
    const response = await fetch("api/pull.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        portal_id: currentPortalId,
        pull_count: currentPullsCount,
        banner5: banner5,
        nonbanner5: nonBanner5,
        stars4: stars4,
      }),
    });
    const result = await response.json();
    if (result.success) {
      if (!results[currentPortalId]) {
        results[currentPortalId] = { banner5: 0, nonBanner5: 0, stars4: 0 };
      }
      results[currentPortalId].banner5 += banner5;
      results[currentPortalId].nonBanner5 += nonBanner5;
      results[currentPortalId].stars4 += stars4;

      if (!pulls[currentPortalId]) {
        pulls[currentPortalId] = 0;
      }
      pulls[currentPortalId] += currentPullsCount;
      document.getElementById(`portal${currentPortalId}Pulls`).textContent =
        pulls[currentPortalId];
    } else {
      alert("Erreur API : " + result.error);
    }
  } catch (e) {
    alert("Erreur réseau : " + e.message);
  }
  closeResultModal();
}

function pull(times, portalId) {
  currentPortalId = portalId;
  currentPullsCount = times;
  pulls[portalId] = pulls[portalId] || 0;
  document.getElementById(`portal${portalId}Pulls`).textContent =
    pulls[portalId];
  openResultModal();
}

function showPortalResults(portalId) {
  if (!results[portalId]) {
    alert("Pas de résultats pour ce portail.");
    return;
  }
  document.getElementById("portalBanner5").textContent =
    results[portalId].banner5 || 0;
  document.getElementById("portalNonBanner5").textContent =
    results[portalId].nonBanner5 || 0;
  document.getElementById("portal4").textContent =
    results[portalId].stars4 || 0;
  document.getElementById("portalResultsModal").style.display = "flex";
}
function closePortalResultsModal() {
  document.getElementById("portalResultsModal").style.display = "none";
}

// Chargement des portails + données pulls/results
const portalsContainer = document.getElementById("portalsContainer");

async function loadPortalsAndData() {
  try {
    // Charger portails
    let res = await fetch("api/get_portals.php");
    let data = await res.json();
    if (!data.success) throw new Error(data.error);

    data.portals.forEach((portal) => {
      pulls[portal.id] = 0;
      results[portal.id] = { banner5: 0, nonBanner5: 0, stars4: 0 };

      const div = document.createElement("div");
      div.className = "portal";
      div.id = "portal" + portal.id;
      div.style.backgroundImage = `url('images/${portal.image_url}')`;
      div.innerHTML = `
          <h3>
            <!-- <img src="images/${portal.image_url}" alt="${portal.name}" class="portal-img" /> -->
            ${portal.name}
          </h3>
          <div class="pull-counter">Tirages effectués : <span id="portal${portal.id}Pulls">0</span></div>
          <button class="btn results-btn" onclick="showPortalResults('${portal.id}')">Résultats</button>

          <div class="btnGacha">
          <button id="pull1" class="gacha-style"onclick="pull(1, '${portal.id}')">
          <img src="./images/arrierplan.png" class="bg-img" />
          <div class="content">
            <img src="./images/currencyInco.png" class="currency" />
            <div class="amount">
              <span class="symbol">×</span>
              <span class="value">1</span>
            </div>
            <span class="label">Summon</span><span>x1</span>
          </div>
        </button>

                  <button class="gacha-style"onclick="pull(10, '${portal.id}')">
        <img src="./images/arrierplan.png" class="bg-img" />
        <div class="content">
          <img src="./images/currencyInco.png" class="currency" />
          <div class="amount">
            <span class="symbol">×</span>
            <span class="value">10</span>
          </div>
          <span class="label">Summon</span><span>x10</span>
        </div>
      </button>
</div>
        `;
      portalsContainer.appendChild(div);

    });

    // Charger pulls totals et résultats
    res = await fetch("api/get_pulls.php");
    data = await res.json();
    if (!data.success) throw new Error(data.error);

    data.totals.forEach((total) => {
      pulls[total.portal_id] = parseInt(total.total_pulls) || 0;
      results[total.portal_id] = {
        banner5: parseInt(total.total_banner5) || 0,
        nonBanner5: parseInt(total.total_nonbanner5) || 0,
        stars4: parseInt(total.total_stars4) || 0,
      };
      const pullsSpan = document.getElementById(
        "portal" + total.portal_id + "Pulls"
      );
      if (pullsSpan) pullsSpan.textContent = pulls[total.portal_id];
    });
  } catch (err) {
    alert("Erreur chargement portails/pulls : " + err.message);
  }
}

// Initialisation
loadMoney();
loadPortalsAndData();
