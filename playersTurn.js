let maxMana = parseInt($("#mana").text());
let mana = maxMana;
let hp = parseInt($("#hp").text());
let discarding = false;

function initialDraw(){
$(".no-card:lt(5)").each( (index, element)=> {
  $(element).removeClass("no-card");
  $(element).find(".cost").text(deck[0].cost)
  $(element).find(".hp").text(deck[0].hp)
  $(element).find(".power").text(deck[0].power);
  deck.shift();
})
  for(let i=0; i<5;i++){
    cpuHand[i] = cpuDeck[i]
    cpuDeck.splice(0,1);
  }
}

function drawPhase(){
  $("div").off().removeClass('just-played');
  $(".skip").text('Skip').on('click', playCardsPhase);
  $(".phase").text("Draw");
  maxMana ++;
  mana =maxMana;
  $(".empty").removeClass('highlite').removeClass('not-enough-mana');
  $("#mana").text(mana);
  $("#max-mana").text('/' + maxMana);
  $('.player-deck').on('click', draw);
  $('.card:not(.no-card)').each((ind, ele) =>{
      $(ele).on('click', (e) => {
  if(!discarding){
      discarding =true;
      $(e.target).addClass('not-enough-mana');
      $(".skip").off().text('Discard').on('click', () =>{discard($(e.target))});
      return
}else{
  discarding = false;
      $('.card').removeClass('not-enough-mana');
      $(".skip").off().text('Skip').on('click', playCardsPhase);
}

})
})
}
function playCardsPhase(){
  $("div").off();
  $(".no-card").removeClass("not-enough-mana");
    $(".phase").text("Play Cards");
  $(".skip").text('Battle Phase').on('click', battlePhase);
  $('.card:not(.no-card)').removeClass('not-enough-mana').each((index, element) =>{
  $(element).click({param1: element}, playCard);
  })
}

function discard(card){
  $(card).addClass("no-card");
  $(card).find(".cost").text('')
  $(card).find(".hp").text('')
  $(card).find(".power").text('');
  $(".skip").off().text('Skip').on('click', cpuTurn);
  $('.no-card').removeClass('not-enough-mana').off();
  discarding = false;
}

function draw(){
  if($(".no-card")[0]){
    let newCard = $(".no-card")[0]
    $(newCard).find(".cost").text(deck[0].cost)
    $(newCard).find(".hp").text(deck[0].hp)
    $(newCard).find(".power").text(deck[0].power);
    $(newCard).removeClass("no-card");
    deck.shift();
    playCardsPhase();
  }
}

function playCard(param){
    element = param.data.param1;
    if(playingFromHand){
      $(".empty").removeClass('highlite').removeClass('not-enough-mana').off();
      playingFromHand = false;
      //return
    }else{
      playingFromHand = true;
      if(parseInt($(element).find('.cost').text()) <= mana){
        $(".empty").addClass('highlite').click((e) =>{
          mana -= parseInt($(element).find('.cost').text());
          $("#mana").text(mana);
          $(".empty").removeClass('highlite').off();
          $(e.target).html($(element).html()).addClass('active-card just-played').removeClass("empty");
          $(element).addClass("no-card").off();
          $(element).find(".cost").text('');
          $(element).find(".hp").text('');
          $(element).find(".power").text('');
          playingFromHand = false;
        })
    }else{
      $(".empty").addClass('not-enough-mana');
    }
  }
}
