$(document).ready(function(){
	var mode = 0;
	
	$('#amount-range').on('propertychange input', f_chanhaRange);
	//$('#primary_color, #name_primary_color, #name_delivery_color, #mode_color, #amount_num').on('propertychange input', f_setStyleText);
	$(':input').on('propertychange input', f_setDeliveryColor);
	$('#mode_color').on('change', f_setStyleMode);


});

function f_chanhaRange() {
	$('#amount_num').attr( 'value', $('#amount-range').val() );
}

// function f_chanhaRange2() {
// 	$('#amount-range').attr( 'value', $('#amount_num').val() );
// 	console.log($('#amount_num').val());
// }

function update(picker){
	   // console.log('h = ' + picker.hsv[0] + '\ns = ' + picker.hsv[1] + "\nv = " + picker.hsv[2]);
	  //  console.log('r = ' + Math.floor(picker.rgb[0]) + '\ng = ' + Math.floor(picker.rgb[1]) + "\nb = " + Math.floor(picker.rgb[2]));
	  	f_setDeliveryColor();
	    document.getElementById('output_primary_color').style.backgroundColor = 'rgb(' + Math.floor(picker.rgb[0]) + ',' + Math.floor(picker.rgb[1]) + ',' + Math.floor(picker.rgb[2]) + ')';
	    //document.getElementById('output_derivate_color').style.backgroundColor = 'rgb(' + Math.floor(picker.rgb[0]) + ',' + Math.floor(picker.rgb[1]) + ',' + Math.floor(picker.rgb[2]) + ')';

	    // 'hsl(' + picker.hsv[0] + ',' + picker.hsv[1] + '% ,' + picker.hsv[2] + '% )'
}

function f_setStyleMode() {
	mode = document.querySelector('#mode_color').checked ? 1 : 0;
	f_setDeliveryColor();
}

function f_setDeliveryColor() {
	var primary_color = $('#primary_color').val(),
		name_primary_color = $('#name_primary_color').val(),
		name_delivery_color = $('#name_delivery_color').val(),
		amount_num = $('#amount_num').val(),
		derivate_color = $('#derivate_color').val();


	$('#textarea').html('$'+ name_primary_color +': ' + primary_color + '\n$'+ name_delivery_color +': ' + mode + '\namount_num = ' + amount_num);

}