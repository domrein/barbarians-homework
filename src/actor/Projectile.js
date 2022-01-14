/*
Paul Milham
10/29/17
*/

import Actor from "../pxl/actor/Actor.js";
import Body from "../pxl/actor/Body.js";
import Sprite from "../pxl/actor/Sprite.js";

export default class Projectile extends Actor {
  constructor(scene, type) {
    super(scene);

    this.body = new Body();

    this.body.beacon.observe(this, "collided", this.onCollided);
    this.body.type = "projectile";

    this.graphics.push(new Sprite(this));
    let anim = {
      snakespit: "arrow",
    }[type];
    this.graphics[0].play(anim);
    switch (type) {
      case "snakespit":
        this.body.velocity.m = 6;
        this.body.width = 10;
        this.body.height = 8;
        break;
    }
  }

  update() {
    super.update();

    if (this.body.x > this.scene.game.width + 200) {
      this.alive = false;
    }
  }

  onCollided() {
    this.alive = false;
  }
}
