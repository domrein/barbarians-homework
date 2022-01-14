import Game from "./pxl/core/Game.js";
import Canvas2dRenderer from "./pxl/core/Canvas2dRenderer.js";

import TitleScene from "./scene/TitleScene.js";
import PlayScene from "./scene/PlayScene.js";
import sprites from "./sprites.js";

export default class _Game extends Game {
  constructor() {
    super(540, 360, TitleScene, Canvas2dRenderer, "canvas");

    this.score = 0;

    this.inputRelay.preventDefaults = [
      // controls
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "z",
      "x",
      // block scrolling
      " ",
    ];

    // preload assets
    this.preloader.addImage(`${window.location.href}assets/sprites.png`, "sprites");

    this.preloader.addAudio(`${window.location.href}assets/audio/Crater.wav`, "crater");
    this.preloader.addAudio(`${window.location.href}assets/audio/PetDie.wav`, "petDie");
    this.preloader.addAudio(`${window.location.href}assets/audio/PhantomDie.wav`, "phantomDie");
    this.preloader.addAudio(`${window.location.href}assets/audio/SnakeSpit.wav`, "snakeSpit");
    this.preloader.addAudio(`${window.location.href}assets/audio/HeartPickup.wav`, "heartPickup");
    this.preloader.addAudio(`${window.location.href}assets/audio/PhantomHit.wav`, "phantomHit");
    this.preloader.addAudio(`${window.location.href}assets/audio/PetPlace.wav`, "petPlace");

    // this.preloader.addAudio("../assets/audio/BGMusic.mp3", "bgMusic");

    this.spriteStore.frameData = {sprites};
    this.spriteStore.animData = {
      archer: {frames: ["archer1", "archer2", "archer3", "archer4", "archer5"], frameRate: 24, looping: true},
      arrow: {frames: ["arrow1", "arrow2", "arrow3"], frameRate: 10, looping: true},
      buffCelt: {frames: ["buff_celt1", "buff_celt2", "buff_celt3", "buff_celt4", "buff_celt5"], frameRate: 10, looping: true},
      celt: {frames: ["celt1", "celt2", "celt3", "celt4", "celt5"], frameRate: 10, looping: true},
      guardsman: {frames: ["gaurdsmen1", "gaurdsmen2", "gaurdsmen3", "gaurdsmen4", "gaurdsmen5", "gaurdsmen6", "gaurdsmen7", "gaurdsmen8"], frameRate: 10, looping: true},
      introSequence: {frames: ["intro_sequence1", "intro_sequence2", "intro_sequence3", "intro_sequence4", "intro_sequence5", "intro_sequence6"], frameRate: 10, looping: true},
      minera: {frames: ["minera1", "minera2", "minera3", "minera4", "minera5", "minera6"], frameRate: 10, looping: true},
      minerb: {frames: ["minerb1", "minerb2", "minerb3", "minerb4", "minerb5", "minerb6"], frameRate: 10, looping: true},
      saltItem: {frames: ["salt_item1", "salt_item2", "salt_item3"], frameRate: 10, looping: true},
      spike: {frames: ["spike1"], frameRate: 10, looping: true},

      heart: {frames: ["heart1"], frameRate: 10, looping: true},
      kitty: {frames: ["kitty1", "kitty2", "kitty3", "kitty4"], frameRate: 10, looping: true},
      puppy: {frames: ["puppy1", "puppy2", "puppy3", "puppy4"], frameRate: 6, looping: true},
      snake: {frames: ["littlesnake1"], frameRate: 6, looping: true},
      snakespit: {frames: ["snakespit1", "snakespit2", "snakespit3"], frameRate: 6, looping: true},
      phantom: {frames: ["phantom1", "phantom1", "phantom2", "phantom3", "phantom4", "phantom4", "phantom3", "phantom2"], frameRate: 15, looping: true},
      playBackground: {frames: ["play_background1", "play_background2", "play_background3", "play_background4", "play_background5", "play_background6", "play_background7", "play_background8", "play_background9", "play_background10", "play_background11", "play_background12", "play_background13", ], frameRate: 50, looping: true},
      playForeground: {frames: ["play_foreground1"], frameRate: 1, looping: true},
      playPetSelector: {frames: ["play_pet_selector1"], frameRate: 1, looping: true},
      crater: {frames: ["crater1"], frameRate: 1, looping: true},
      titleScreen: {frames: ["titlescreen1"], frameRate: 1, looping: true},
    };
  }
}
