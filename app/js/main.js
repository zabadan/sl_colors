$(document).ready(function(){
	dateG = {
		mode: 0,
		mode_txt: 'Darken',
		delivery_color_hsl: [],
		primary_color_hsl: [0, 0, 100],
		globalMode: 0
	};
	
	$('#amount-range').on('propertychange input', f_chanhaRange);
	$(':input').on('propertychange input', f_setStyleMode);
	
	//$('#derivate_color').on('propertychange input', f_setStyleMode);
	$('#mode_color').on('change', f_setStyleMode);

	$('#copy_text').on('click', f_copyTextToClopboard);

});

function f_copyTextToClopboard() {
 	document.execCommand('copy', false, document.getElementById('textarea').select());
}

function f_chanhaRange() {
	$('#amount_num').attr( 'value', $('#amount-range').val() );
	f_setStyleMode()
}


function update(picker, numblock){	
	dateG.globalMode = numblock;
	//debugger;
	if (dateG.globalMode) {
		document.getElementById('output_derivate_color').style.backgroundColor = 'rgb(' + Math.floor(picker.rgb[0]) + ',' + Math.floor(picker.rgb[1]) + ',' + Math.floor(picker.rgb[2]) + ')';
		dateG.delivery_color_hsl = rgbToHsl( Math.floor(picker.rgb[0]) , Math.floor(picker.rgb[1]), Math.floor(picker.rgb[2]) );
		console.log('rgb(' + Math.floor(picker.rgb[0]) + ',' + Math.floor(picker.rgb[1]) + ',' + Math.floor(picker.rgb[2]) + ')')
	} else {
		document.getElementById('output_primary_color').style.backgroundColor = 'rgb(' + Math.floor(picker.rgb[0]) + ',' + Math.floor(picker.rgb[1]) + ',' + Math.floor(picker.rgb[2]) + ')';
		dateG.primary_color_hsl = rgbToHsl( Math.floor(picker.rgb[0]) , Math.floor(picker.rgb[1]), Math.floor(picker.rgb[2]) );
	};
	
	console.log('dateG.primary_color_hsl = ' + dateG.primary_color_hsl);
	console.log('dateG.delivery_color_hsl = ' + dateG.delivery_color_hsl);
	console.log('dateG.globalMode = ' + dateG.globalMode);
	f_setStyleMode()
}

function f_setStyleMode() {
	dateG.mode = document.querySelector('#mode_color').checked ? 1 : 0;
	dateG.mode_txt = dateG.mode ? 'Lighten' : 'Darken';
	f_setDeliveryColor();
}

function f_setDeliveryColor() {
	var primary_color = $('#primary_color').val(),
		name_primary_color = $('#name_primary_color').val(),
		name_delivery_color = $('#name_delivery_color').val(),
		amount_num = $('#amount_num').val(),
		derivate_color = $('#derivate_color').val(),
		primary_color_txt = '$'+ name_primary_color +': ' + primary_color + ';';
		
		if (dateG.globalMode) { /*--------find amount-------------*/
			if(dateG.primary_color_hsl[0] == dateG.delivery_color_hsl[0] && dateG.primary_color_hsl[1] == dateG.delivery_color_hsl[1]){
				console.log('related colors!');

				var differenceAmount = dateG.primary_color_hsl[2] - dateG.delivery_color_hsl[2]

				if(differenceAmount > 0 ) {
					dateG.mode_txt = 'Darken';
				} else if (differenceAmount < 0 ){
					dateG.mode_txt = 'Lihgten';
				};
				differenceAmount = Math.abs(differenceAmount);
				$('#outputMode').attr( 'value', dateG.mode_txt );
				$('#outputAmount').attr( 'value', differenceAmount );

				var delivery_color_txt = '$'+ name_delivery_color +': ' + dateG.mode_txt + '( $' + name_primary_color + ', ' + differenceAmount + ' );';
			} else{
				var delivery_color_txt = '$'+ name_delivery_color +': ' + derivate_color + ' ;';
			};
		} else { /*----------find color------------*/
			
			var delivery_color_txt = '$'+ name_delivery_color +': ' + dateG.mode_txt + '( $' + name_primary_color + ', ' + amount_num + ' );';

			derivate_color_h = dateG.primary_color_hsl[0];
			derivate_color_s = dateG.primary_color_hsl[1];
			derivate_color_l = dateG.mode ? +(amount_num) + +(dateG.primary_color_hsl[2])  : dateG.primary_color_hsl[2] - amount_num;
			document.getElementById('output_derivate_color').style.backgroundColor = 'hsl(' + derivate_color_h + ',' + derivate_color_s + '% ,' + derivate_color_l + '% )';

		}

		
	//document.getElementById('output_derivate_color').style.backgroundColor = 'hsl(' + derivate_color_h + ',' + derivate_color_s + '% ,' + derivate_color_l + '% )';
	$('#textarea').html(primary_color_txt + '\n'+ delivery_color_txt);

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