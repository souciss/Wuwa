import {
  loadMoney,
  addMoney,
  openMoneyModal,
  closeMoneyModal,
} from "./Money.js";

const params = new URLSearchParams(window.location.search);
const portalId = params.get("id");
let charaportal = "";
if (!portalId) {
  document.body.innerHTML = "<h2>Portail non trouvé.</h2>";
}

// Afficher les infos du portail
fetch("./api/get_portal_by_id.php?id=" + portalId)
  .then((res) => res.json())
  .then((data) => {
    if (data.success) {
      const p = data.portal;

      let portal = document.getElementById("portal");

      portal.style.backgroundImage = `url('images/${p.image_url}')`;
      portal.innerHTML = `
      <h3 id="contentImg" data-img="${p.image_url}" class="${p.id}">
        ${p.name}
      </h3>
      <div class="pull-counter">Tirages effectués : <span id="portal${p.id}Pulls">0</span></div>
      <button class="btn results-btn" onclick="showPortalResults('${p.id}')">Résultats</button>

      <div class="btnGacha">
      <button id="pull1" class="gacha-style">
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

    <button id="pull10" class="gacha-style">
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
      document.querySelector("#pull1").addEventListener("click", () => {
        invoke(1);
      });
      document.querySelector("#pull10").addEventListener("click", () => {
        invoke(10);
      });
    } else {
      document.body.innerHTML = "<h2>Portail introuvable.</h2>";
    }
    
    const imgElement = document.getElementById("contentImg");
    if (imgElement.className % 2){
      charaportal = imgElement.innerHTML;
    }
    else{
      const dataImg = imgElement.getAttribute("data-img");
      charaportal = transformerChaine(dataImg);
    }
  });

// Invocation avec proba
function invoke(count = 1) {
  console.log(charaportal)
  fetch(`api/summon.php?portal=${portalId}&pull=${count}&chara=${encodeURIComponent(charaportal)}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        const container = document.getElementById("results");
        container.innerHTML = `<h3>Résultats :</h3><div id="cardsContainer"></div>`;
        const cardsContainer = document.getElementById("cardsContainer");

        data.results.forEach((char) => {
          // Classe selon la rareté
          let rarityClass = "";
          if (char.rarity == 3) rarityClass = "star-3";
          else if (char.rarity == 4) rarityClass = "star-4";
          else if (char.rarity == 5) rarityClass = "star-5";
          cardsContainer.innerHTML += `
            <div class="card star-${char.rarity}">
            <img class="card-bg" src="images/background_${char.rarity}.png" alt="Fond ${
                        char.rarity
                      } étoiles">
            <img class="underline-img" src="images/underline${
                        char.rarity
                      }.png" alt="Soulignement">
            <img class="char-img" src="${char.LienImage}" alt="${char.Nom}">
            <div class="card-info">
            <div class="name-container">
              <span class="name">${char.Nom}</span>
            </div>
            <div class="rarity-icons">
              ${'<img src="images/star-icon.png" alt="étoile" class="star-icon">'.repeat(
                char.rarity
              )}
            </div>
            </div>
</div>

`;
        });
      } else {
        alert("Erreur dans l'invocation");
      }
    });
}

function transformerChaine(chaine) {
  // Étape 1 : Couper au premier point
  let partieAvantPoint = chaine.split(".")[0].trim();

  // Étape 2 : Mettre la première lettre en majuscule
  if (partieAvantPoint.length === 0) return "";

  let resultat =
    partieAvantPoint.charAt(0).toUpperCase() +
    partieAvantPoint.slice(1).toLowerCase();

  return resultat;
}

loadMoney();
