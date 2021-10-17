//grabbing items from HTML
const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 7;

//link text
playerLivesCount.textContent = playerLives;

// generate the data for the cards (img, names of the card)
const getData = () => [
  { imgSrc: "./images/beatles.jpeg", name: "beatles" },
  { imgSrc: "./images/blink182.jpeg", name: "blink 182" },
  { imgSrc: "./images/fkatwigs.jpeg", name: "fkatwigs" },
  { imgSrc: "./images/fleetwood.jpeg", name: "fleetwood" },
  { imgSrc: "./images/joy_division.jpeg", name: "joy" },
  { imgSrc: "./images/ledzep.jpeg", name: "ledzep" },
  { imgSrc: "./images/metallica.jpeg", name: "metallica" },
  { imgSrc: "./images/pinkfloyd.jpeg", name: "pinkfloyd" },
  { imgSrc: "./images/beatles.jpeg", name: "beatles" },
  { imgSrc: "./images/blink182.jpeg", name: "blink 182" },
  { imgSrc: "./images/fkatwigs.jpeg", name: "fkatwigs" },
  { imgSrc: "./images/fleetwood.jpeg", name: "fleetwood" },
  { imgSrc: "./images/joy_division.jpeg", name: "joy" },
  { imgSrc: "./images/ledzep.jpeg", name: "ledzep" },
  { imgSrc: "./images/metallica.jpeg", name: "metallica" },
  { imgSrc: "./images/pinkfloyd.jpeg", name: "pinkfloyd" },
];

//randomize
const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

// card generator
const cardGenerator = () => {
  const cardData = randomize();
  //generate html
  const cards = document.querySelectorAll(".card");
  cardData.forEach((item, index) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    //attaching the info to the cards
    face.src = item.imgSrc;
    card.setAttribute('name', item.name);
    
    //attaching the cards to the section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);
    card.addEventListener("click", (e) =>{
        card.classList.toggle("toggleCard");
        checkCards(e);
    })
  });
};
//check cards
const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll(".toggleCard")
    console.log(flippedCards);
    // if statement the card is correct or not
    if (flippedCards.length === 2) {
        if (flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")
        )  {
            console.log("match");
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
               card.style.pointerEvents = "none";
            })
        } else {
            console.log("wrong");
            flippedCards.forEach (card => {
                card.classList.remove("flipped");
              setTimeout (() => card.classList.remove("toggleCard"), 1000);
            });
            playerLives--;
            playerLivesCount.textContent=playerLives;
        if( playerLives === 0) {
            restart("Try Again!!");
        }
        }
    }
    // run a check to see if we won
    if(toggleCard.length === 16) {
        restart("You are a Winner!!!")
    }
};
//restart
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents = "none";
    cardData.forEach((item, index) =>{
        cards[index].classList.remove("toggleCard");
        //randomize
     setTimeout(() =>{
        cards[index].style.pointerEvents = "all";
        faces[index].src = item.imgSrc;
        cards[index].setAttribute("name", item.name);
        section.style.pointerEvents = "all";
     }, 1000);
    
    });
    playerLives = 7;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 100);
}
cardGenerator();
