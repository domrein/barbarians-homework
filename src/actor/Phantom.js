/*
Paul Milham
10/29/17
*/

import Actor from "../pxl/actor/Actor.js";
import Body from "../pxl/actor/Body.js";
import Sprite from "../pxl/actor/Sprite.js";
import Point from "../pxl/core/Point.js";
import Vector from "../pxl/core/Vector.js";

export default class Phantom extends Actor {
  constructor(scene, type) {
    super(scene);

    this.body = new Body();
    this.body.width = 48;
    this.body.height = 48;
    this.body.velocity.d = Math.PI;
    this.body.friction = new Point(.9, 1);

    this.body.beacon.observe(this, "collided", this.onCollided);
    this.body.type = "phantom";

    const anim = {
      celt: "celt",
      buffCelt: "buffCelt",
    }[type];

    this.graphics.push(new Sprite(this));
    this.graphics[0].play(anim);
    this.graphics[0].z = 0;
    this.health = {
      celt: 5,
      buffCelt: 20,
    }[type];

    this.moveCount = 0;
    this.movePeriod = {
      celt: 20,
      buffCelt: 10,
    }[type];

    this.moveSpeed = {
      celt: .025,
      buffCelt: 0.015,
    }[type];
  }

  update() {
    super.update();

    this.moveCount++;

    // this.body.velocity.m = .3 - Math.sin(this.moveCount / 35) * .15;
    if (this.moveCount >= 0) {
      this.body.velocity.add(new Vector(this.moveSpeed + Math.sin(this.moveCount / this.movePeriod) * .02, Math.PI));
      // this.body.velocity.add(new Vector(.1025 + Math.sin(this.moveCount / this.movePeriod) * .02, Math.PI));
    }
  }

  onCollided(source, collidee) {
    // hit pet
    if (collidee.type === "pet") {
      this.body.velocity.add(new Vector(5, 0));
      this.moveCount = -this.movePeriod * 4;
    }
    // hit projectile
    else {
      this.health--;
      if (this.health <= 0) {
        this.alive = false;
        this.die();
      }
      else {
        this.scene.game.audioMixer.play("phantomHit");
      }
    }
  }

  die() {
    this.scene.burst("#594e82", 10, this.body.x + 24, this.body.y + 24);
    this.scene.camera.shake(1, 5);
    this.scene.game.audioMixer.play("phantomDie");
  }
}
