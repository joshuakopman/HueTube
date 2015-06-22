function ColorHelper(){

}

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
    /*
    var z = 1.0 - x - y;

        Y = bri; // Brightness of lamp
        X = (Y / y) * x;
        Z = (Y / y) * z;

        r = X * 1.612 - Y * 0.203 - Z * 0.302; //0.302
        g = -X * 0.509 + Y * 1.412 + Z * 0.066; //0.066
        b = X * 0.026 - Y * 0.072 + Z * 0.962; //0.962

        r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
        g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
        b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;
        
        maxValue = Math.max(r,g,b);
        r /= maxValue;
        g /= maxValue;
        b /= maxValue;

        r = r * 255;   if (r < 0) { r = 255 };
        g = g * 255;   if (g < 0) { g = 255 };
        b = b * 255;   if (b < 0) { b = 255 };
*/

    if (x>0 && x<=.2 && y<.07) {   //blues
        r=0;g=0;b=255;
    }
    else if(x>.2 && x<= .3 && y>=.07 && y<=.2){ //violets
        r=255;g=0;b=255;
    }
    else if(x >=.3 && x<=.47 && y>=.4 && y<=.52)  //greens
    {
        r=0;g=255;b=0;
    }
    else if(x>=.4 && x<=.52 && y>=.4 && y<=.52) //yellows
    {
        r=255;g=255;b=0;
    }
    else if(x > .52 && x <= .62 && y >.3 && y<.4) //oranges
    {
        r=255;g=165;b=0;
    }
    else if(x >.62 && y>.3 && y<.4) //reds
    {
        r =255; g=0;b=0;
    }

        return {
            r : r,
            g : g,
            b : b
        }
}

ColorHelper.prototype.getColorName = function(x, y, bri,state) {
    var r,g,b;

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
