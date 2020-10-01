let cpuMana = 0;
let cpuMaxMana = 0;
let cpuHp = 20;
let cpuHand = [];


function cpuTurn(){
  cpuUpdateMana();
  cpuDrawCards();
  cpuPlayCards();
  drawPhase();
}


function cpuUpdateMana(){
  cpuMaxMana ++;
  cpuMana = cpuMaxMana;
  $("#cpu-max-mana").text('/' + cpuMaxMana);
  $("#cpu-mana").text(cpuMana);
}

function cpuDrawCards(){
  if(cpuHand.length < 7){
    cpuHand.push(cpuDeck[0]);
    cpuDeck.splice(0,1);
  }
}

function cpuPlayCards(){
  console.log($(".cpu-no-card")[0]);
  if($(".cpu-no-card")[0]){
  cpuHand.forEach((card) => {
    console.log(card);
    if(card.cost <= cpuMana){
      let cpuCard = $(".cpu-no-card")[0];
      $(cpuCard).find(".cost").text(card.cost);
      $(cpuCard).find(".hp").text(card.hp);
      $(cpuCard).find(".power").text(card.power);
      $(cpuCard).removeClass("cpu-no-card");
      cpuHand.splice(cpuHand.indexOf(card), 1);
      cpuMana -= card.cost;
      $("#cpu-mana").text(cpuMana)

    }
  })
  }
}
