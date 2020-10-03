let battling = false;

function battlePhase(){
  $('div').off();
  $(".phase").text("Battle Phase");
  $(".skip").text('CPU Turn').on('click', cpuTurn);
  $(".active-card:not(.empty)").each((ind, elem) =>{
    $(elem).on('click', (e) => {
      if(battling){
        battling = false;
        $(".cpu-card").removeClass('highlite').off();
      }else{
        if(!$(elem).hasClass("just-played")){
          battling = true;
          $(".cpu-card").addClass('highlite').on("click", (e) =>{
            battle(elem, e.target);
            })
          }
        }
      })
    })
  }
function battle(attacker, defender){
  let attack = $(attacker).find('.power').text();
  let defend = $(defender).find(".hp").text();
  let attackDef = $(attacker).find('.hp').text();
  let defendPow = $(defender).find(".power").text();

  if(defend === ''){
    console.log('direct hit');
    cpuHp += (defend - attack);
    $("#cpu-hp").text(cpuHp);
  }
  if(attack >= defend){
    if(defendPow >= attackDef){
      $(attacker).addClass("empty").off();
      $(attacker).find(".cost").text('');
      $(attacker).find(".hp").text('');
      $(attacker).find(".power").text('');
    }else{
      $(attacker).find(".hp").text(attackDef - defendPow);
    }
      $(defender).addClass("cpu-no-card").off();
      $(defender).find(".cost").text('');
      $(defender).find(".hp").text('');
      $(defender).find(".power").text('');
      $(attacker).off();
  }else{
    if(defendPow >= attackDef){
      $(attacker).addClass("empty").off();
      $(attacker).find(".cost").text('');
      $(attacker).find(".hp").text('');
      $(attacker).find(".power").text('');
    }else{
      $(attacker).find(".hp").text(attackDef - defendPow);
    }
      $(defender).find(".hp").text(defend - attack);
      $(attacker).off();
  }
  $(".cpu-card").removeClass('highlite').off();
  battling = false;
  if(cpuHp <= 0){
    alert('You Win');
    location.reload();
  }else if(hp <= 0){
    alert('You Lose');
    location.reload();
  }else{

  }
}
