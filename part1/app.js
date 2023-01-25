let favNumber = 3;
let baseURL = 'http://numbersapi.com';

//1)
async function getNumFact() {
    let fact = await axios.get(`${baseURL}/${favNumber}?json`)
    console.log(`Fact about the number ${favNumber}: ${fact.data.text}`);
}

getNumFact()


// //2)
let container = document.getElementById('container');
let favNumbers = [1, 3, 5];

async function getFacts() {
    let resp = await axios.get(`${baseURL}/${favNumbers}?json`);
    for (num of favNumbers) {
        const p = document.createElement('p');
        p.textContent = `Fact about the number ${num}: ${resp.data[num]}`;
        container.appendChild(p);
    }
};

getFacts()


//3)
let fourNumberFactPromises = [];

for (let i = 1; i < 5; i++) {
    fourNumberFactPromises.push(
        axios.get(`${baseURL}/${favNumber}?json`)
    )
}
async function getFourFacts() {
    let facts = await Promise.all(fourNumberFactPromises)
    facts.forEach(resp => {
        const p = document.createElement('p');
        p.textContent = `Fact about the number ${favNumber}: ${resp.data.text}`;
        container.appendChild(p);
    });
}

getFourFacts()