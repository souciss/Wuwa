import { loadMoney, addMoney , openMoneyModal, closeMoneyModal } from "./Money.js";
window.addMoney = addMoney;
window.openMoneyModal = openMoneyModal;
window.closeMoneyModal = closeMoneyModal;
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
        location.reload();
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
document.querySelector("#save").addEventListener("click", saveCount)
document.querySelector("#close").addEventListener("click", closeModal)
loadMoney()