function ColorHelper(){

}
/*
ColorHelper.prototype.rgbToHex = function(R,G,B) {return this.toHex(R)+this.toHex(G)+this.toHex(B)}

ColorHelper.prototype.toHex = function(n) {
 n = parseInt(n,10);
 if (isNaN(n)) return "00";
 n = Math.max(0,Math.min(n,255));
 return "0123456789ABCDEF".charAt((n-n%16)/16)
      + "0123456789ABCDEF".charAt(n%16);
}

ColorHelper.prototype.toRGB = function(x, y, bri) {
	var r,g,b;

        if (bri === undefined) {
            bri = 1;
        }

        // Calculate XYZ values Convert using the following formulas:
        var Y = bri,
            X = (Y / y) * x,
            Z = (Y / y) * (1 - x - .y);

        // Convert to RGB using Wide RGB D65 conversion.
        var rgb =  [
             X * 1.612 - Y * 0.203 - Z * 0.302,
            -X * 0.509 + Y * 1.412 + Z * 0.066,
             X * 0.026 - Y * 0.072 + Z * 0.962
        ];

        // Apply reverse gamma correction.
        rgb = rgb.map(function (x) {
            return (x <= 0.0031308) ? (12.92 * x) : ((1.0 + 0.055) * Math.pow(x, (1.0 / 2.4)) - 0.055);
        });

        // Bring all negative components to zero.
        rgb = rgb.map(function (x) { return Math.max(0, x); });

        // If one component is greater than 1, weight components by that value.
        var max = Math.max(rgb[0], rgb[1], rgb[2]);
        if (max > 1) {
            rgb = rgb.map(function (x) { return x / max; });
        }

        rgb = rgb.map(function (x) { return Math.floor(x * 255); });

        return rgb;
}*/

ColorHelper.prototype.getColorName = function(x, y, bri,state) {

    if(state=="off")
       return 'black';

    if (x>0 && x<=.2 && y<.07) {   //blues
       return 'blue';
    }
    else if(x>.2 && x<= .3 && y>=.07 && y<=.2){ //violets
       return 'violet';
    }
    else if(x >=.3 && x<=.47 && y>=.4 && y<=.52)  //greens
    {
        return 'green';
    }
    else if(x>=.4 && x<=.52 && y>=.4 && y<=.52) //yellows
    {
       return 'yellow';
    }
    else if(x > .52 && x <= .62 && y >.3 && y<.4) //oranges
    {
        return 'orange';
    }
    else if(x >.62 && y>.3 && y<.4) //reds
    {
        return 'red';
    }

    return 'white';
}



module.exports = ColorHelper;
