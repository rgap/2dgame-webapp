let planets = [];
const NUM_PLANETS = 1;
let planetTimer = null;

function setupPlanet() {
  let createPlanet = () => {
    // Only create a new planet if the number of planets is less than NUM_PLANETS
    if (planets.length < NUM_PLANETS) {
      let planet = new PIXI.Sprite(PIXI.Loader.shared.resources.planet.texture);
      planet.x = Math.random() * (app.view.width - planet.width);
      planet.y = -planet.height;
      planets.push(planet);
      app.stage.addChild(planet);
    }
  };

  // Create the initial planet
  createPlanet();

  // Create subsequent planets every 10 seconds
  setInterval(createPlanet, 10000);
}

function gameLoopPlanet(delta) {
  for (let planet of planets) {
    if (!rocketStopped) {
      planet.y += 2;

      // If a planet goes below the screen, start a timer to reposition it
      if (planet.y > app.view.height && !planetTimer) {
        planetTimer = setTimeout(() => {
          planet.y = -planet.height;
          planet.x = Math.random() * (app.view.width - planet.width);
          planet.collided = false;
          planetTimer = null; // Reset the timer
        }, 10000);
      }

      // Only check for collisions with planets that haven't already collided
      if (!planet.collided && hitTestRectangle(rocket, planet)) {
        planet.collided = true;
        rocketStopped = true;
        showPopup();
      }
    }
  }
}

function showPopup() {
  let popup = document.getElementById("popup-container");
  popup.style.display = "block";

  let continueButton = document.getElementById("continue-btn");
  continueButton.addEventListener("click", function () {
    popup.style.display = "none"; // Hide the popup
    rocketStopped = false; // Resume rocket movement
  });

  let secureButton = document.getElementById("secure-landing-btn");
  secureButton.addEventListener("click", function () {
    // Handle secure landing button logic, if needed
  });
}

app.ticker.add((delta) => {
  gameLoopPlanet(delta);
});

// Function to check for collision between two sprites
function hitTestRectangle(sprite1, sprite2) {
  let hit = false;

  // Define the variables needed to calculate the intersection
  let vx, vy;

  // Find the center points of each sprite
  let sprite1CenterX = sprite1.x + sprite1.width / 2;
  let sprite1CenterY = sprite1.y + sprite1.height / 2;
  let sprite2CenterX = sprite2.x + sprite2.width / 2;
  let sprite2CenterY = sprite2.y + sprite2.height / 2;

  // Calculate the half-widths and half-heights of each sprite
  let sprite1HalfWidth = sprite1.width / 2;
  let sprite1HalfHeight = sprite1.height / 2;
  let sprite2HalfWidth = sprite2.width / 2;
  let sprite2HalfHeight = sprite2.height / 2;

  // Calculate the vertical and horizontal distances between the sprite centers
  vx = sprite1CenterX - sprite2CenterX;
  vy = sprite1CenterY - sprite2CenterY;

  // Figure out the combined half-widths and half-heights
  let combinedHalfWidths = sprite1HalfWidth + sprite2HalfWidth;
  let combinedHalfHeights = sprite1HalfHeight + sprite2HalfHeight;

  // Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {
    // A collision might be occurring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {
      // There's definitely a collision happening
      hit = true;
    } else {
      // No collision on the y axis
      hit = false;
    }
  } else {
    // No collision on the x axis
    hit = false;
  }

  return hit;
}
