/*
Paul Milham
10/29/17
*/

import Actor from "../pxl/actor/Actor.js";
import Body from "../pxl/actor/Body.js";
import Sprite from "../pxl/actor/Sprite.js";

import Projectile from "./Projectile.js";
import Heart from "./Heart.js";

export default class Pet extends Actor {
  constructor(scene, type) {
    super(scene);

    this.body = new Body();
    this.body.width = 48;
    this.body.height = 48;

    this.body.beacon.observe(this, "collided", this.onCollided);
    this.body.type = "pet";

    this.graphics.push(new Sprite(this));
    let anim = {
      snake: "archer",
      kitty: Math.random() > .5 ? "minera" : "minerb",
      puppy: "guardsman",
    }[type];

    this.graphics[0].play(anim);
    this.graphics[0].z = 0;

    this.health = 1;
    this.cooldown = 0;
    this.cooldownCount = 0;
    this.projectile = null;
    this.type = type;
    this.inDrag = false;

    switch (type) {
      case "kitty":
        this.health = 2;
        this.cooldown = 600;
        break;
      case "puppy":
        this.health = 30;
        break;
      case "snake":
        this.health = 1;
        this.projectile = "snakespit";
        this.cooldown = 120;
        break;
    }
  }

  update() {
    super.update();

    if (this.inDrag) {
      return;
    }

    this.cooldownCount++;
    if (this.cooldownCount >= this.cooldown && this.projectile) {
      this.cooldownCount = 0;
      const projectile = new Projectile(this.scene, this.projectile);
      projectile.body.x = this.body.x;
      projectile.body.y = this.body.y;
      if (this.projectile === "snakespit") {
        projectile.body.x += 30;
        projectile.body.y += 15;
        this.scene.game.audioMixer.play("snakeSpit");
      }
      this.scene.addActor(projectile);
    }

    if (this.type === "kitty" && this.cooldownCount >= this.cooldown) {
      this.cooldownCount = 0;
      const heart = new Heart(this.scene);
      heart.body.x = this.body.x;
      heart.body.y = this.body.y;
      heart.body.velocity.m = 5;
      heart.body.velocity.d = Math.random() * Math.PI * 2;
      this.scene.addActor(heart);
    }
  }

  onCollided() {
    if (this.inDrag) {
      return;
    }

    this.health--;
    if (!this.health) {
      this.alive = false;
      this.die();
    }
  }

  die() {
    let color = "#000";
    switch (this.type) {
      // TODO: charging phantom/super laser, blink alert, then everything in row is destroyed
      case "kitty": {
        color = "#8d53af";
        // kitty pops out hearts when it dies
        for (let i = 0; i < 4; i++) {
          const heart = new Heart(this.scene);
          heart.body.x = this.body.x;
          heart.body.y = this.body.y;
          heart.body.velocity.m = 5;
          heart.body.velocity.d = Math.random() * Math.PI * 2;
          this.scene.addActor(heart);
        }
        break;
      }
      case "puppy": color = "#7cd77c"; break;
      // TODO: one of the snakes leaves acid when it dies (can't place anything there anymore, but does damage to anything that passes through it)
      case "snake": color = "#6ac851"; break;
    }
    this.scene.burst(color, 20, this.body.x + 24, this.body.y + 24);
    this.scene.camera.shake(2, 15);
    this.scene.game.audioMixer.play("petDie");
  }
}
