let rocket;
let asteroids = [];
let rocketDirection = 0;
let rocketStopped = false;

function setupRocketAsteroid() {
  rocket = new PIXI.Sprite(PIXI.Loader.shared.resources.rocket.texture);
  rocket.x = app.view.width / 2 - rocket.width / 2;
  rocket.y = app.view.height - rocket.height - 10;
  app.stage.addChild(rocket);
  for (let i = 0; i < 3; i++) {
    let asteroid = new PIXI.Sprite(
      PIXI.Loader.shared.resources.asteroid.texture
    );
    asteroid.x = Math.random() * (app.view.width - asteroid.width);
    asteroid.y = -asteroid.height - Math.random() * app.view.height;
    asteroids.push(asteroid);
    app.stage.addChild(asteroid);
  }
}

function gameLoopRocketAsteroid(delta) {
  if (!rocketStopped) {
    rocket.x += rocketDirection * 3;
    if (rocket.x < 0) {
      rocket.x = 0;
      rocketDirection = 0;
    }
    if (rocket.x > app.view.width - rocket.width) {
      rocket.x = app.view.width - rocket.width;
      rocketDirection = 0;
    }

    for (let asteroid of asteroids) {
      asteroid.y += 4;
      if (asteroid.y > app.view.height) {
        asteroid.y = -asteroid.height;
        asteroid.x = Math.random() * (app.view.width - asteroid.width);
      }
    }
  } else {
    rocketDirection = 0;
  }
}

document.addEventListener("keydown", function (event) {
  if (rocket) {
    if (!rocketStopped) {
      if (event.keyCode === 37 || event.keyCode === 65) {
        rocketDirection = -1;
      } else if (event.keyCode === 39 || event.keyCode === 68) {
        rocketDirection = 1;
      }
    }
  }
});
