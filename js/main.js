$(document).ready(init);
var turno ="x";
var turno2="o";
var bandera=0;
var ban=false;
var opciones=new Array(9);

function caremoco(){
    // random
    oli=localStorage.getItem("nombre_1",jugador1);
    chaujj=localStorage.getItem("nombre_2",jugador2);

    var moco=Math.floor((Math.random()*2));
    bandera = moco;
    if(moco==0){
        document.getElementById("div_turno").innerHTML="turno del jugador "+A;
    }else{
        document.getElementById("div_turno").innerHTML="turno del jugador "+ B;
    }

}

function marcar (id)
{   
    var celda =document.getElementById(id);
    console.log(opciones[id]);
    if (bandera == 0 && !opciones[id])
    {
           celda.value=turno;
           document.getElementById("div_turno").innerHTML="turno del jugador "+ B;
           opciones[id]=1;
            bandera = 1;
           
    }else if(bandera == 1 && !opciones[id]){
           
           celda.value=turno2;
           document.getElementById("div_turno").innerHTML="turno del jugador "+ A;
           opciones[id]=0;
        bandera = 0;
    }

    jugadorx(1);
    jugadorx(0);
}

function jugadorx(_option){
   if (opciones[1]==_option && opciones [2]==_option && opciones[3]==_option){
       //alert("felicidades jugador ganaste" +turno+"ganaste");
       swal({title: "Ganaste..!",text: "felicidades jugador " +turno+ " ganaste",imageUrl: "img/ganaste.png"});
   }else if (opciones[4]==_option && opciones [5]==_option && opciones[6]==_option){
        swal({title: "Ganaste..!",text: "felicidades jugador " +turno+ " ganaste",imageUrl: "img/ganaste.png"});
   }else if (opciones[7]==_option && opciones [8]==_option && opciones[9]==_option){
         swal({title: "Ganaste..!",text: "felicidades jugador " +turno+ " ganaste",imageUrl: "img/ganaste.png"});
   }else if (opciones[1]==_option && opciones [5]==_option &&opciones[9]==_option){
       swal({title: "Ganaste..!",text: "felicidades jugador " +turno+ " ganaste",imageUrl: "img/ganaste.png"});
   }else if (opciones[3]==_option && opciones [5]==_option &&opciones[7]==_option){
         swal({title: "Ganaste..!",text: "felicidades jugador " +turno+ " ganaste",imageUrl: "img/ganaste.png"});
   }else if (opciones[1]==_option && opciones [4]==_option &&opciones[7]==_option){
       swal({title: "Ganaste..!",text: "felicidades jugador " +turno+ " ganaste",imageUrl: "img/ganaste.png"});
   }else if (opciones[2]==_option && opciones [5]==_option &&opciones[8]==_option){
         swal({title: "Ganaste..!",text: "felicidades jugador " +turno+ " ganaste",imageUrl: "img/ganaste.png"});
   }else if (opciones[3]==_option && opciones [6]==_option &&opciones[9]==_option){
        swal({title: "Ganaste..!",text: "felicidades jugador " +turno+ " ganaste",imageUrl: "img/ganaste.png"});
   }
}

   
function reiniciar(){
    
   location.reload();
   
} 

var currentSection = null;
var currentGameID;

function init() {
	currentSection = $('#saludo');
	$('#btn-saludo').click(onClickBtnSaludo);
	$('#btn-nombres').click(onClickBtnNombre);
	$('#btn-historial').click(onClickBtnHistorial);
	$('#btn-comentar').click(onClickBtnComentar);

	$('#lista-juegos').on('click', 'button', onClickBtnItemJuego);


	TweenMax.from($('#saludo h1'), 1, {marginBottom: '0px', ease: Elastic.easeOut});
}

function onClickBtnItemJuego()
{
	var idGame = $(this).parent().data('idgame');
	console.log(idGame);
	gotoSection('historial-detalle');
	getComentarios(idGame);
	currentGameID = idGame;
}

function onClickBtnSaludo() {
	gotoSection('nombres');
}

function onClickBtnNombre() {
	gotoSection('juego');
}

function onClickBtnHistorial(evt) {
	evt.preventDefault();
	gotoSection('historial');
	getHistorial();
}
function onClickBtnComentar()
{
	enviarComentario(currentGameID, $('#name').val(), $('#content').val());
}

function enviarComentario(_idGame, _name, _content)
{
	$.ajax({
		url:'http://test-ta.herokuapp.com/games/'+_idGame+'/comments',
		type:'POST',
		data:{comment:{ name:_name, content:_content, game_id:_idGame }}
	}).success(function(_data){
		console.log(_data);
		getComentarios(_idGame);
	});
}

function gotoSection(_identificadorDeSeccion) {
	currentSection.removeClass('visible');
	var nextSection = $('#' + _identificadorDeSeccion);
	nextSection.addClass('visible');
	TweenMax.from(nextSection, 1.5, {scale: 0.2, opacity: 0, ease: Elastic.easeOut});
	currentSection = nextSection;
}

function getHistorial() {
	$.ajax({
		url: 'http://test-ta.herokuapp.com/games'
	}).success(function (_data) {
		dibujarHistorial(_data);
	});
}

function getSingleGame(_idGame)
{
	$.ajax({
		url: 'http://test-ta.herokuapp.com/games/' + _idGame,
		type:'GET'
	}).success(function(_data){
		console.log(_data);
	});
}

function getComentarios(_idGame)
{
	$.ajax({
		url: 'http://test-ta.herokuapp.com/games/'+_idGame+'/comments',
		type:'GET'
	}).success(function(_data){
		console.log(_data);
		dibujarComentarios(_data);
	});
}

function dibujarComentarios(_datos)
{
	var lista = $('#lista-comentarios');
	lista.empty();
	for(var i in _datos)
	{
		var html = '<li class="list-group-item">'+_datos[i].name+' dice: <p>'+ _datos[i].content +'</p></li>';
		lista.append(html);
	}
}

function dibujarHistorial(_datos) {
	//console.log(_datos);
	var lista = $('#lista-juegos');

	for (var i in _datos) {
		console.log(_datos[i].winner_player);
		var html = '<li data-idgame="'+ _datos[i].id +'" class="list-group-item">' + _datos[i].winner_player + ' le gano a '+ _datos[i].loser_player +' en ' + _datos[i].number_of_turns_to_win + ' movimientos <button class="btn">Comentar</button></li>';
		lista.append(html);
	}
}

