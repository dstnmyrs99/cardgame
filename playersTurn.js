let mana = parseInt($("#mana").text());
let hp = parseInt($("#hp").text());

function initialDraw(){
$(".player-side .no-card").each( (index, element)=> {
  $(element).removeClass("no-card");
  $(element).find(".cost").text(deck[0].cost)
  $(element).find(".hp").text(deck[0].hp)
  $(element).find(".power").text(deck[0].power);
  deck.shift();
})
}

function draw(){
  console.log($(".no-card")[0]);
  $(".phase").text("Draw");
  mana ++;
  $("#mana").text(mana);
  $('.card:not(.no-card)').off().on('click', (e) => {
    console.log($(e.target));
    $(".skip").off().text('Discard').on('click', () =>{discard($(e.target))});
  });
  $(".skip").off().text('Skip').on('click', playCards);
  $('.player-deck').on('click', ()=>{
  if($(".no-card")[0]){
    $(".no-card").first().find(".cost").text(deck[0].cost)
    $(".no-card").first().find(".hp").text(deck[0].hp)
    $(".no-card").first().find(".power").text(deck[0].power);
    $(".no-card").first().removeClass("no-card");
    deck.shift();
    playCards();
  }
})
}
function playCards(){
    $(".phase").text("Play Cards");
  $(".skip").off().text('End Phase').on('click', draw);
  $(".player-deck").off();
  $('.card:not(.no-card)').off().each((index, element) =>{
  $(element).on('click', () => {
    if(playingFromHand){
      $(".empty").removeClass('highlite').removeClass('not-enough-mana').off();
      playingFromHand = false;
      return
    }else{
      playingFromHand = true;
      console.log($(element).find('.cost').text());
      if(parseInt($(element).find('.cost').text()) <= mana){
        $(".empty").addClass('highlite');
        $(".empty").click((e) =>{
          mana -= parseInt($(element).find('.cost').text());
          $("#mana").text(mana);
          $(e.target).html($(element).html()).addClass('card');
          $(".empty").removeClass('highlite').off();
          $(element).addClass("no-card").off();
          $(element).find(".cost").text('')
          $(element).find(".hp").text('')
          $(element).find(".power").text('');
          playingFromHand = false;
        })
    }else{
      $(".empty").addClass('not-enough-mana');
      console.log('not good');
    }
  }
    })
  })
}

function discard(card){
  $(card).addClass("no-card");
  $(card).find(".cost").text('')
  $(card).find(".hp").text('')
  $(card).find(".power").text('');
  $(".skip").off().text('Skip').on('click', playCards);
}
