async function searchCard() {
    const cardName = document.getElementById('cardName').value;
    const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(cardName)}`);
    const data = await response.json();

    if (data.data) {
        const card = data.data[0];
        let cardDetailsHTML = `
            <div class="card">
                <img src="${card.card_images[0].image_url}" alt="${card.name}">
                <div class="card-info">
                    <h2>${card.name}</h2>
                    <p><strong>Type:</strong> ${card.type}</p>`;

        // Check if the card is a spell or trap card
        if (!card.type.includes('Spell') && !card.type.includes('Trap')) {
            cardDetailsHTML += `
                    <p><strong>Attack:</strong> ${card.atk}</p>
                    <p><strong>Defense:</strong> ${card.def}</p>`;
        }

        cardDetailsHTML += `
                    <p><strong>Description:</strong> ${card.desc}</p>
                </div>
            </div>
        `;

        document.getElementById('cardDetails').innerHTML = cardDetailsHTML;
    } else {
        document.getElementById('cardDetails').innerHTML = '<p>Card not found.</p>';
    }
}
