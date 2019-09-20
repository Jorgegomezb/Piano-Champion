
var partitura = [  
   {  
      "nota":"g4",
      "tipo":"corchea"
   },
   {  
      "nota":"c4",
      "tipo":"corchea"
   },
   {  
      "nota":"g4",
      "tipo":"corchea"
   },
   {  
      "nota":"c4",
      "tipo":"corchea"
   },
   {  
      "nota":"g4",
      "tipo":"corchea"
   },
   {  
      "nota":"c4",
      "tipo":"corchea"
   },
   {  
      "nota":"b4",
      "tipo":"corchea"
   },
   {  
      "nota":"c4",
      "tipo":"corchea"
   },
   {  
      "nota":"a4",
      "tipo":"corchea"
   },
   {  
      "nota":"c4",
      "tipo":"corchea"
   },
   {  
      "nota":"a4",
      "tipo":"corchea"
   },
   {  
      "nota":"c4",
      "tipo":"corchea"
   },
   {  
      "nota":"a4",
      "tipo":"corchea"
   },
   {  
      "nota":"c4",
      "tipo":"corchea"
   },
   {  
      "nota":"a4",
      "tipo":"semicorchea"
   },
   {  
      "nota":"as",
      "tipo":"semicorchea"
   },
   {  
      "nota":"b4",
      "tipo":"corchea"
   }
]
var trackPartitura;
var init = 2.300;
var fin;
$(document).ready(function(){
	function getTimer(tipo){
		var retorno =0;
		switch(tipo){
			case 'corchea':
			retorno = 0.416;
			break;
			case 'semicorchea':
				retorno = 0.208;
			break;
			default:
			break;
		}
		return retorno;
	}
	function getTimer_interval(tipo){
		var retorno =0;
		switch(tipo){
			case 'corchea':
			retorno = 0.400;
			break;
			case 'semicorchea':
				retorno = 0.190;
			break;
			default:
			break;
		}
		return retorno;
	}



	vid.addEventListener("loadedmetadata", function() {
		trackPartitura = this.addTextTrack("metadata");
		//console.log("lenghgrt: "+ partitura.length);
		for(var j = 0; j<5; j++){
			for(var i = 0; i< partitura.length;i++){
				fin =  init+getTimer(partitura[i].tipo);
				fin = parseFloat(fin).toFixed(3);
				fin = parseFloat(fin);
				trackPartitura.addCue(new VTTCue(init, fin, JSON.stringify(partitura[i])));
				init = fin
				init = parseFloat(init).toFixed(3);
				init = parseFloat(init);
			}
		}
		
		var pulsada = false;
		function playNota(e, callback){
				window.dispatchEvent(e);
			callback();
		}
		trackPartitura.oncuechange = function (){
			var cue = this.activeCues[0];
			var obj = JSON.parse(cue.text);
			console.log(obj.nota);
			var e = new Event("keydown");
			e.keyCode = $("#"+obj.nota).data('key'); // # Some key code value
			var e2 = new Event("keyup");
			e2.keyCode = $("#"+obj.nota).data('key');
			if($("#demo").prop('checked')){
				playNota(e,function(){
				
				setTimeout(function(){
					window.dispatchEvent(e2);
				},getTimer_interval(obj.tipo) * 1000);
			})
			}else if($("#practica").prop('checked')){
				var canvas = document.getElementById("canvas");
					var ctx = canvas.getContext("2d");
					var x = Math.random() * (canvas.width);
					var y = Math.random() * (canvas.height);
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					ctx.font = "30px Arial";
					ctx.textAlign = "center";					
				if($("#"+obj.nota).hasClass('playing')){
					ctx.fillStyle = "white";
					var text = "GENIAL!";

				}else{
					ctx.fillStyle = "red";
					var text = "MAL!";
				}
				var width_canv = ctx.measureText(text).width;
					var height_canv = ctx.measureText(text).height;
					var x = Math.random() * (canvas.width);
					if(x < width_canv){
						x = width_canv;
					}else if(canvas.width - x < width_canv){
						x = canvas.width - width_canv;
					}
					var y = Math.random() * (canvas.height);
					if(y < height_canv){
						y = height_canv;
					}else if(canvas.height - y < height_canv){
						y = canvas.height - height_canv;
					}
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					console.log(text + " x: "+x+" y: "+y);
					ctx.shadowColor = "#000"
					ctx.shadowOffsetX = 1;
					ctx.shadowOffsetY = 0;
					ctx.shadowBlur = blur;
					ctx.fillText(text, x, y);
			}
			
			



			//setTimeout(window.dispatchEvent(e2),corchea);
			/*if(!pulsada){
				console.log(pulsada);
				

			}else{
				var e2 = new Event("keyup");
				e2.keyCode = $("#"+obj.nota).data('key');
				console.log(e2.keyCode);
				window.dispatchEvent(e2);
				pulsada = false;
			}*/
			
			
		}
});	

})
