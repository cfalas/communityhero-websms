var me = {};
me.avatar = "logo.png";

var you = {};
you.avatar = "anthoulla.png";

function formatAMPM(date) {
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
}            

//-- No use time. It is a javaScript effect.
function insertChat(who, text, time){
	if (time === undefined){
		time = 0;
	}
	var control = "";
	var date = formatAMPM(new Date());
	
	if (who == "me"){
		control = '<li style="width:100%">' +
						'<div class="msj macro">' +
						'<div class="avatar"><img class="img-circle" style="width:100%;" src="'+ me.avatar +'" /></div>' +
							'<div class="text text-l">' +
								'<p>'+ text +'</p>' +
								'<p><small>'+date+'</small></p>' +
							'</div>' +
						'</div>' +
					'</li>';                    
	}else{
		control = '<li style="width:100%;">' +
						'<div class="msj-rta macro">' +
							'<div class="text text-r">' +
								'<p>'+text+'</p>' +
								'<p><small>'+date+'</small></p>' +
							'</div>' +
						'<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="'+you.avatar+'" /></div>' +                                
				  '</li>';
	}
	setTimeout(
		function(){                        
			$("ul").append(control).scrollTop($("ul").prop('scrollHeight'));
		}, time);
	
}

function resetChat(){
	$("ul").empty();
}

function send(){
	var user_name = $('#phone').val()
	console.log(user_name);
	if (user_name==""){
		alert("Please enter a unique phone number.");
		return;
	}
	var text = $('.mytext').val();
	if (text !== ""){
		insertChat("you", text.replace(/\n/g, '<br>'));
		$('.mytext').val('');
		$.post('https://rhubarb-cake-22341.herokuapp.com/api/v1/chatbot', {
		  from : user_name,
		  content : text
		}, function(req){
			insertChat('me', req.content.replace(/\n/g, '<br>'))
		}, 'json')

	}

}

$('#submit').click(function(){
	send();
})

//-- Clear Chat
resetChat();


//-- NOTE: No use time on insertChat.