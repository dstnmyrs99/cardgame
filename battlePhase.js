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
  if(attack >= defend){
      $(defender).addClass("cpu-no-card").off();
      $(defender).find(".cost").text('');
      $(defender).find(".hp").text('');
      $(defender).find(".power").text('');
      $(attacker).off();
      cpuHp += (defend - attack);
      $("#cpu-hp").text(cpuHp);
  }else{
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
