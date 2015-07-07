var LightService = require("../services/LightService.js");
var LightServiceTestData = require("./LightServiceTestData.js");

  describe("Light Service", function() {
      it('maps properties from the bridge API light model to node light model', function() { 
          new LightService().BuildStateForLight(lightStateProperties,lightModel);
          expect(lightModel.x).toBe(lightStateProperties["xy"][0]);
          expect(lightModel.State).toBe("off");
      });

      it('Build Lights Response', function() {
          var lightResponse = new LightService().BuildLightsResponse(lights);
          expect(lightResponse.length).toBe(3);
          expect(lightResponse[0].Name).toBe(lights["8"].name);
      });
  });