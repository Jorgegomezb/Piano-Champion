$("#pause").hide();
$('#play-video').on('click', function(){
		playVid();
	})
	$('#video').click(function (){
		if(vid.paused){
			playVid();
		}else{
			pauseVid();
		}
	});

	document.body.onkeyup = function(e){
	    if(e.keyCode == 32){
	        if(vid.paused){
			playVid();
			}else{
				pauseVid();
			}
	    }
	};

	function playVid() {
	 vid.play();
	 $("#play").hide();
	 $("#pause").show();
	 $('#play-video').hide();
	}
	function pauseVid() {
	 vid.pause();
	 $("#play").show();
	 $('#play-video').show();
	 $("#pause").hide();
	}
	function updateProgress(){
		var progressBar = $(".progress-bar");
   		var percentage = (100 / vid.duration) * vid.currentTime; //Calculo porcentaje de barra a rellenar
   		progressBar.css('width',percentage+"%"); //relleno la barra.	
   		var minutes = parseInt(vid.currentTime / 60, 10); //Calculo minutos
		var seconds = parseInt(vid.currentTime % 60); //Calculo segundos
		var milseconds = parseInt(vid.currentTime/60 - vid.currentTime % 60);
   		$("#min_sec").html((minutes < 10 ? '0' : '')+minutes+":"+(seconds < 10 ? '0' : '')+seconds);
	}

	$(".progress").click(function(e){
		var offset = this.getClientRects()[0];
		var nuevo_tiempo = e.clientX - offset.left;
		vid.currentTime = (vid.duration*nuevo_tiempo)/$(".progress").width();
	});
	
	function goFullscreen() {
		if (vid.requestFullscreen) {
			vid.requestFullscreen();
		}else if (vid.mozRequestFullScreen) {
			vid.mozRequestFullScreen();
		} else if (vid.webkitRequestFullScreen) {
			vid.webkitRequestFullScreen();
		}  
	}
	$("#volume").click(function(){
		if(vid.volume == 0){
			vid.volume = 1;
			$("#volume_range").val(1);
		}else{
			vid.volume = 0;
			$("#volume_range").val(0);
		}
	});
	$("#volume").hover(function(){
		hover_volume();
	},function(){
		hover_volume_out();
	});
	$("#volume_range").mouseenter(function(){
		hover_volume();
	});
	$("#volume_range").mouseleave(function(){
		hover_volume_out();
	});
	
	function hover_volume(){
		$("#volume_range").show();
		$("#control_volumen").css("background-color","grey");
	}
	function hover_volume_out(){
		$("#control_volumen").css("background-color","");
		$("#volume_range").hide();
	}

	function cambiar_volumen(volumen){
		vid.volume=volumen;
	}


	$("#timer").hover(function(){
		hover_velocity();
	},function(){
		hover_velocity_out();
	});
	$("#velocity_range").mouseenter(function(){
		hover_velocity();
	});
	$("#velocity_range").mouseleave(function(){
		hover_velocity_out();
	});
	function hover_velocity(){
		$("#velocity_range").show();
		$("#control_velocidad").css("background-color","grey");
	}
	function hover_velocity_out(){
		$("#control_velocidad").css("background-color","");
		$("#velocity_range").hide();
	}
	function cambiar_velocidad(velocidad){
		vid.playbackRate=velocidad;
	}