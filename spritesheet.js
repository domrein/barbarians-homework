"use strict";

// Load in dependencies
const spritesmith = require("spritesmith");
const fs = require("fs");
const util = require("util");

spritesmith.run = util.promisify(spritesmith.run);
fs.writeFile = util.promisify(fs.writeFile);

// Generate our spritesheet
const sprites = [
  "assets/images/archer1.png",
  "assets/images/archer2.png",
  "assets/images/archer3.png",
  "assets/images/archer4.png",
  "assets/images/archer5.png",
  "assets/images/arrow1.png",
  "assets/images/arrow2.png",
  "assets/images/arrow3.png",
  "assets/images/buff_celt1.png",
  "assets/images/buff_celt2.png",
  "assets/images/buff_celt3.png",
  "assets/images/buff_celt4.png",
  "assets/images/buff_celt5.png",
  "assets/images/celt1.png",
  "assets/images/celt2.png",
  "assets/images/celt3.png",
  "assets/images/celt4.png",
  "assets/images/celt5.png",
  "assets/images/gaurdsmen1.png",
  "assets/images/gaurdsmen2.png",
  "assets/images/gaurdsmen3.png",
  "assets/images/gaurdsmen4.png",
  "assets/images/gaurdsmen5.png",
  "assets/images/gaurdsmen6.png",
  "assets/images/gaurdsmen7.png",
  "assets/images/gaurdsmen8.png",
  "assets/images/intro_sequence1.png",
  "assets/images/intro_sequence2.png",
  "assets/images/intro_sequence3.png",
  "assets/images/intro_sequence4.png",
  "assets/images/intro_sequence5.png",
  "assets/images/intro_sequence6.png",
  "assets/images/minera1.png",
  "assets/images/minera2.png",
  "assets/images/minera3.png",
  "assets/images/minera4.png",
  "assets/images/minera5.png",
  "assets/images/minera6.png",
  "assets/images/minerb1.png",
  "assets/images/minerb2.png",
  "assets/images/minerb3.png",
  "assets/images/minerb4.png",
  "assets/images/minerb5.png",
  "assets/images/minerb6.png",
  "assets/images/play_background1.png",
  "assets/images/play_background2.png",
  "assets/images/play_background3.png",
  "assets/images/play_background4.png",
  "assets/images/play_background5.png",
  "assets/images/play_background6.png",
  "assets/images/play_background7.png",
  "assets/images/play_background8.png",
  "assets/images/play_background9.png",
  "assets/images/play_background10.png",
  "assets/images/play_background11.png",
  "assets/images/play_background12.png",
  "assets/images/play_background13.png",
  "assets/images/salt_item1.png",
  "assets/images/salt_item2.png",
  "assets/images/salt_item3.png",
  "assets/images/spike1.png",

  "assets/images/heart1.png",
  "assets/images/kitty1.png",
  "assets/images/kitty2.png",
  "assets/images/kitty3.png",
  "assets/images/kitty4.png",
  "assets/images/puppy1.png",
  "assets/images/puppy2.png",
  "assets/images/puppy3.png",
  "assets/images/puppy4.png",
  "assets/images/snake1.png",
  "assets/images/snakespit1.png",
  "assets/images/snakespit2.png",
  "assets/images/snakespit3.png",
  "assets/images/littlesnake1.png",
  "assets/images/phantom1.png",
  "assets/images/phantom2.png",
  "assets/images/phantom3.png",
  "assets/images/phantom4.png",
  "assets/images/play_foreground1.png",
  "assets/images/play_pet_selector1.png",
  "assets/images/crater1.png",
  "assets/images/titlescreen1.png",
];
(async () => {
  const result = await spritesmith.run({src: sprites});
  await fs.writeFile("assets/sprites.png", result.image);
  const coords = {};
  for (const [file, coord] of Object.entries(result.coordinates)) {
    coords[file.replace("assets/images/", "").replace(".png", "")] = coord;
  }
  await fs.writeFile("src/sprites.js", `export default ${JSON.stringify(coords)}`);
})();
