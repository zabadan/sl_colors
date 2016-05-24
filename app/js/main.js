$(document).ready(function(){
	var mode = 0,
		mode_txt,
		primary_color_hsl;
	
	$('#amount-range').on('propertychange input', f_chanhaRange);
	$(':input').on('propertychange input', f_setStyleMode);
	$('#mode_color').on('change', f_setStyleMode);

	$('#copy_text').on('click', f_copyTextToClopboard)

	// var button = document.getElementById('copy_text');
	// button.addEventListener('click', function (e) {
	// 	e.preventDefault();
	// 	document.execCommand('copy', false, document.getElementById('textarea').select());
	// });

});

function f_copyTextToClopboard() {
 	document.execCommand('copy', false, document.getElementById('textarea').select());
}

function f_chanhaRange() {
	$('#amount_num').attr( 'value', $('#amount-range').val() );
	f_setStyleMode()
}


function update(picker){	
	document.getElementById('output_primary_color').style.backgroundColor = 'rgb(' + Math.floor(picker.rgb[0]) + ',' + Math.floor(picker.rgb[1]) + ',' + Math.floor(picker.rgb[2]) + ')';
	primary_color_hsl = rgbToHsl( Math.floor(picker.rgb[0]) , Math.floor(picker.rgb[1]), Math.floor(picker.rgb[2]) );
	f_setStyleMode()
}

function f_setStyleMode() {
	mode = document.querySelector('#mode_color').checked ? 1 : 0;
	mode_txt = mode ? 'Lighten' : 'Darken';
	f_setDeliveryColor();
}

function f_setDeliveryColor() {
	var primary_color = $('#primary_color').val(),
		name_primary_color = $('#name_primary_color').val(),
		name_delivery_color = $('#name_delivery_color').val(),
		amount_num = $('#amount_num').val(),
		derivate_color = $('#derivate_color').val(),
		
		primary_color_txt = '$'+ name_primary_color +': ' + primary_color + ';',
		delivery_color_txt = '$'+ name_delivery_color +': ' + mode_txt + '( $' + name_primary_color + ', ' + amount_num + ' );',

		derivate_color_h = primary_color_hsl[0];
		derivate_color_s = primary_color_hsl[1];
		derivate_color_l = mode ? +(amount_num) + +(primary_color_hsl[2])  : primary_color_hsl[2] - amount_num;

	document.getElementById('output_derivate_color').style.backgroundColor = 'hsl(' + derivate_color_h + ',' + derivate_color_s + '% ,' + derivate_color_l + '% )';
	$('#textarea').html(primary_color_txt + '\n'+ delivery_color_txt + '\nderivate_color_l = ' + derivate_color_l);

}


function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

	h = Math.floor(h*360)
	s = Math.floor(s*100);
	l = Math.floor(l*100);
    return [h, s, l];
}