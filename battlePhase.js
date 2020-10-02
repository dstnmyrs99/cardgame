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
          battling = true;
          $(".cpu-card").addClass('highlite').on("click", (e) =>{
            battle(elem, e.target);
          })
        }
      })
    })
  }
function battle(attacker, defender, who){
  let attack = $(attacker).find('.power').text();
  let defend = $(defender).find(".hp").text();
  if(attack >= defend){
      $(defender).addClass("cpu-no-card").off();
      $(defender).find(".cost").text('');
      $(defender).find(".hp").text('');
      $(defender).find(".power").text('');
      $(attacker).off();
      if(who = 'player'){
        cpuHp += (defend - attack);
        $("#cpu-hp").text(cpuHp);
      }else{
        hp += (defend - attack);
        $("#hp").text(hp);
      }
  }else{
      $(defender).find(".hp").text(defend - attack);
      $(attacker).off();
  }
  $(".cpu-card").removeClass('highlite').off();
  battling = false;
}
