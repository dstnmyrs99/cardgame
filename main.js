
let deck = [];
let cpuDeck = [];
playingFromHand = false;


class Card {
  constructor(multiplier) {
    this.cost = Math.floor((Math.random() * multiplier) + multiplier);
    this.hp = Math.floor((Math.random() * multiplier) + multiplier);
    this.power = Math.floor((Math.random() * multiplier) + multiplier);
  }
}

function createDeck(){
  for(i=0;i<25;i++){
    deck.push(new Card(Math.floor((i/8)+(Math.random()*3)+1)));
    cpuDeck.push(new Card(Math.floor((i/8)+(Math.random()*3)+1)));
  }
    deck.sort( () => Math.random() - 0.5);
    cpuDeck.sort( () => Math.random() - 0.5);
}
$(document).ready( ()=>{
createDeck();
initialDraw();
//playCards();
drawPhase();
})
