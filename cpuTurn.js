let cpuMana = 0;
let cpuMaxMana = 0;
let cpuHp = 20;
let cpuHand = [];
let time = 0;

function cpuTurn(){
  cpuUpdateMana();
  cpuDrawCards();
  cpuPlayCards();
  cpuBattlePhase();

}


function cpuUpdateMana(){
  $("div").off();
  cpuMaxMana ++;
  cpuMana = cpuMaxMana;
  $("#cpu-max-mana").text('/' + cpuMaxMana);
  $("#cpu-mana").text(cpuMana);
}

function cpuDrawCards(){
  $(".cpu-card:not(.cpu-no-card)").removeClass('just-played');
  if(cpuHand.length < 7){
    cpuHand.push(cpuDeck[0]);
    cpuDeck.splice(0,1);
  }
}

function cpuPlayCards(){
  if($(".cpu-no-card")[0]){
  cpuHand.forEach((card) => {
    if(card.cost <= cpuMana){
      let cpuCard = $(".cpu-no-card")[0];
      $(cpuCard).find(".cost").text(card.cost);
      $(cpuCard).find(".hp").text(card.hp);
      $(cpuCard).find(".power").text(card.power);
      $(cpuCard).addClass('just-played');
      $(cpuCard).removeClass("cpu-no-card");
      cpuHand.splice(cpuHand.indexOf(card), 1);
      cpuMana -= card.cost;
      $("#cpu-mana").text(cpuMana)

    }
  })
  }
}

function cpuBattlePhase(){
  $(".cpu-card:not(.cpu-no-card):not(.just-played)").each((i, e) =>{
    let rand = Math.floor((Math.random() * 5) + 1)
    time = (i+1) * 1500
    setTimeout(function(){
      cpuBattle(e, rand);
    console.log(time);
  }, time);
})
  setTimeout(drawPhase, time + 1000);
}

function cpuBattle(attacker, num){
    defender = $(`.ac${num}`);
    let def = $(defender).find('.hp').text()
    let att = $(attacker).find('.power').text()
    $(attacker).addClass('highlite');
    $(defender).addClass('damaged');
    setTimeout(function(){
      $(attacker).removeClass('highlite');
      $(defender).removeClass('damaged');
    }, 1000);

    if(att >= def){
        $(defender).addClass("empty").off();
        $(defender).find(".cost").text('');
        $(defender).find(".hp").text('');
        $(defender).find(".power").text('');
        hp += (def - att);
        $("#hp").text(hp);
    }else{
        $(defender).find(".hp").text(def - att);
    }
}
