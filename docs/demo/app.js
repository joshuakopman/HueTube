(function () {
  var lights = [
    { lightid: 1, Name: 'Living room back', State: 'on', ColorName: 'orange', Hue: 9000, Brightness: 220, Saturation: 255 },
    { lightid: 2, Name: 'Living room front', State: 'on', ColorName: 'yellow', Hue: 17750, Brightness: 240, Saturation: 255 },
    { lightid: 3, Name: 'Bedroom Right', State: 'on', ColorName: 'white', Hue: 0, Brightness: 255, Saturation: 0 },
    { lightid: 4, Name: 'TV Strip', State: 'on', ColorName: 'white', Hue: 0, Brightness: 255, Saturation: 0 },
    { lightid: 5, Name: 'Bedroom Left', State: 'on', ColorName: 'white', Hue: 0, Brightness: 255, Saturation: 0 },
    { lightid: 6, Name: 'Office', State: 'on', ColorName: 'white', Hue: 0, Brightness: 255, Saturation: 0 },
    { lightid: 7, Name: 'Balcony', State: 'off', ColorName: 'blue', Hue: 46920, Brightness: 180, Saturation: 255 }
  ];

  var colorMap = {
    red: { hue: 0, sat: 255 },
    orange: { hue: 9000, sat: 255 },
    yellow: { hue: 17750, sat: 255 },
    green: { hue: 25718, sat: 255 },
    blue: { hue: 46920, sat: 255 },
    violet: { hue: 50000, sat: 255 },
    white: { hue: 0, sat: 0 }
  };

  var container = document.getElementById('lightInfoContainer');
  var toast = document.getElementById('demo-toast');
  var dismissToast = document.getElementById('dismiss-toast');
  var isCollapsed = true;

  function computeGroupState() {
    return lights.every(function (l) { return l.State === 'on'; }) ? 'on' : 'off';
  }

  function bulbSource(light) {
    return 'images/' + (light.State === 'on' ? light.ColorName : 'black') + '.gif';
  }

  function applyColor(light, colorName, brightness) {
    var mapped = colorMap[colorName];
    light.ColorName = colorName;
    light.Hue = mapped.hue;
    light.Saturation = mapped.sat;
    if (typeof brightness === 'number') {
      light.Brightness = brightness;
    }
    light.State = 'on';
  }

  function setLightState(light, nextState) {
    light.State = nextState;
  }

  function buildLightCard(light) {
    var card = document.createElement('div');
    card.className = isCollapsed ? 'lightInfoDivCollapsed' : 'lightInfoDiv';

    var name = document.createElement('div');
    name.className = 'itemName';
    name.textContent = light.Name;

    var bulb = document.createElement('img');
    bulb.className = 'bulb';
    bulb.src = bulbSource(light);
    bulb.alt = light.Name + ' bulb';

    var switchWrap = document.createElement('div');
    switchWrap.className = 'toggle-bg toggle-alternate ' + light.State + ' lightSwitch';

    var switchLabel = document.createElement('label');
    switchLabel.className = light.State;
    switchLabel.textContent = light.State;

    var offInput = document.createElement('input');
    offInput.type = 'radio';
    offInput.name = 'toggle_' + light.lightid;
    offInput.value = 'off';
    offInput.checked = light.State === 'off';
    offInput.addEventListener('click', function () {
      setLightState(light, 'off');
      render();
    });

    var onInput = document.createElement('input');
    onInput.type = 'radio';
    onInput.name = 'toggle_' + light.lightid;
    onInput.value = 'on';
    onInput.checked = light.State === 'on';
    onInput.addEventListener('click', function () {
      setLightState(light, 'on');
      render();
    });

    var switchKnob = document.createElement('span');
    switchKnob.className = 'switch ' + light.State;

    switchWrap.appendChild(switchLabel);
    switchWrap.appendChild(offInput);
    switchWrap.appendChild(onInput);
    switchWrap.appendChild(switchKnob);

    var state = document.createElement('div');
    state.className = isCollapsed ? 'lightStateCollapsed' : 'lightState';

    var colorPanel = document.createElement('div');
    colorPanel.className = 'colorPanel';

    ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'white'].forEach(function (swatch) {
      var key = swatch === 'purple' ? 'violet' : swatch;
      var sw = document.createElement('div');
      sw.className = 'swatch ' + swatch;
      sw.addEventListener('click', function () {
        applyColor(light, key);
        render();
      });
      colorPanel.appendChild(sw);
    });

    var brightnessWrap = document.createElement('div');
    var low = document.createElement('img');
    low.className = 'dimnessIcon';
    low.src = 'images/brightness-down.png';
    low.alt = 'Dim';

    var slider = document.createElement('input');
    slider.id = 'brightSlider';
    slider.type = 'range';
    slider.min = '0';
    slider.max = '255';
    slider.step = '5';
    slider.value = String(light.Brightness);
    slider.addEventListener('change', function () {
      light.Brightness = parseInt(slider.value, 10);
      light.State = 'on';
      render();
    });

    var high = document.createElement('img');
    high.className = 'brightnessIcon';
    high.src = 'images/brightness-up.png';
    high.alt = 'Bright';

    brightnessWrap.appendChild(low);
    brightnessWrap.appendChild(slider);
    brightnessWrap.appendChild(high);

    state.appendChild(colorPanel);
    state.appendChild(brightnessWrap);

    card.appendChild(name);
    card.appendChild(bulb);
    card.appendChild(switchWrap);
    card.appendChild(state);

    return card;
  }

  function buildGroupControls(groupState) {
    var group = document.createElement('div');
    group.className = 'toggle-bg toggle-alternate ' + groupState + ' groupSwitch';
    group.id = 'groupToggle';

    var label = document.createElement('label');
    label.className = groupState + ' group';
    label.textContent = 'ALL ' + groupState.toUpperCase();

    var offInput = document.createElement('input');
    offInput.type = 'radio';
    offInput.name = 'toggleAll';
    offInput.value = 'off';
    offInput.checked = groupState === 'off';
    offInput.addEventListener('click', function () {
      lights.forEach(function (l) { l.State = 'off'; });
      render();
    });

    var onInput = document.createElement('input');
    onInput.type = 'radio';
    onInput.name = 'toggleAll';
    onInput.value = 'on';
    onInput.checked = groupState === 'on';
    onInput.addEventListener('click', function () {
      lights.forEach(function (l) { l.State = 'on'; });
      render();
    });

    var knob = document.createElement('span');
    knob.id = 'groupSliderCircle';
    knob.className = 'switch-group ' + groupState;

    group.appendChild(label);
    group.appendChild(offInput);
    group.appendChild(onInput);
    group.appendChild(knob);

    var colorToggle = document.createElement('div');
    colorToggle.className = 'btn colorIcon';
    colorToggle.addEventListener('click', function () {
      isCollapsed = !isCollapsed;
      render();
    });

    var colorImg = document.createElement('img');
    colorImg.className = 'colorIconImg';
    colorImg.src = 'images/colorpicker.png';
    colorImg.alt = 'Toggle color controls';

    colorToggle.appendChild(colorImg);

    container.appendChild(group);
    container.appendChild(colorToggle);
  }

  function render() {
    var groupState = computeGroupState();
    container.innerHTML = '';

    lights.forEach(function (light) {
      container.appendChild(buildLightCard(light));
    });

    buildGroupControls(groupState);
  }

  if (toast && dismissToast) {
    dismissToast.addEventListener('click', function () {
      toast.classList.add('hidden');
    });
  }

  render();
})();
