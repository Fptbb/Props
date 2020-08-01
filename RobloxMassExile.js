/* Esse sistema remove de 100 em 100, não queremos bater nenhum limite de api não é mesmo? caso queira modifique ele pra outra coisa, eu não vou. */
; (grupo = '3444718'), (rolesetId = '23727250'), (clean = false) //Ative `clean` para remover tambem os posts de cada um dos selecionados

function executar(userid, groupid) {
  if(clean == true){
    $.ajax({
      type: 'DELETE',
      url: `https://groups.roblox.com/v1/groups/${groupid}/wall/users/${userid}/posts`,

      success: function(resultData) {
          console.log(`limpei os posts de ${userid}`);
      }
    });
  }
  $.ajax({
      type: 'DELETE',
      url: `https://groups.roblox.com/v1/groups/${groupid}/users/${userid}`,

      success: function(resultData) {
          console.log(`${userid} foi exilado`);
      }
  });
  //
};
$.get(
  `https://groups.roblox.com/v1/groups/${grupo}/roles/${rolesetId}/users?sortOrder=Asc&limit=100`,
  function (data) {
    function run(e, i, a) {
      //removePosts(e.userId, grupo)
      executar(e.userId, grupo)
    }
    data.data.forEach(run)
  }
)
