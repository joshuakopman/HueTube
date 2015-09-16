function Light(id,Name,State,Hue,Saturation,Brightness,Color,ColorName){
	this.lightid = id;
	this.Name = Name;
	this.State = State;
	this.Hue = Hue;
	this.Saturation = Saturation;
	this.Brightness = Brightness;
	//this.Color = Color;
	this.ColorName = ColorName
};

module.exports = Light;
