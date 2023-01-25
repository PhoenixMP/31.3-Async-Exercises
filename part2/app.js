
let baseURL = 'https://deckofcardsapi.com/api/deck'
let shuffleBaseURL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'


const deck = {
    async init() {
        let res = await axios.get(shuffleBaseURL)
        this.deckId = res.data.deck_id;
    },
    async drawCard() {
        let resp = await axios.get(`${baseURL}/${this.deckId}/draw/?count=1`);
        let card = resp.data['cards'][0];
        return card
    }
};

//1)
async function getCard() {
    await deck.init();
    let card1 = await deck.drawCard();
    console.log(`${card1['value'].toLowerCase()} of ${card1['suit'].toLowerCase()}`);
}
getCard()

//2)

async function getTwoCards() {
    await deck.init();
    let card1 = await deck.drawCard();
    let card2 = await deck.drawCard();
    console.log(`${card1['value'].toLowerCase()} of ${card1['suit'].toLowerCase()}`);
    console.log(`${card2['value'].toLowerCase()} of ${card2['suit'].toLowerCase()}`);
}

getTwoCards()


//3)
let container = document.getElementById('container');
let button = document.getElementById('card-button');
let cardCount = 0
getDeck()

button.addEventListener("click", get1Card);

async function getDeck() {
    await deck.init()
    console.log(deck)
}

async function get1Card() {
    let card = await deck.drawCard();
    addCard(card.image);
    cardCount += 1
    if (cardCount === 52) {
        button.remove()
    }
}

function addCard(image) {
    const card = document.createElement('div')
    card.style.display = "inline-block";
    card.style.width = '200px'
    card.style.height = '300px'
    card.style.backgroundImage = `url(${image})`
    card.style.backgroundSize = 'contain'
    card.style.backgroundRepeat = 'no-repeat'
    container.appendChild(card)
}


