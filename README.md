<h1 align="center">
  <a href="https://github.com/yandeu/enable3d#readme"><img src="readme/enable3d-logo-square.png" alt="enable3d logo" width="300"></a>
  <br>
  3D extension for Phaser 3
  <br>
</h1>

<h4 align="center">
Written in TypeScript, uses three.js and ammo.js, brings the third dimension to your Phaser 3 game.</h4>

<p align="center">  
  <a href="https://www.npmjs.com/package/enable3d"><img src="https://img.shields.io/npm/v/enable3d?style=flat-square" alt="NPM version"></a>
  <a href="https://github.com/yandeu/enable3d/commits/master"><img src="https://img.shields.io/github/last-commit/yandeu/enable3d.svg?style=flat-square" alt="GitHub last commit"></a>
  <a href="https://github.com/prettier/prettier" alt="code style: prettier"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/built%20with-TypeScript-blue?style=flat-square"></a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#examples">Examples</a> •
  <a href="#get-started">Get Started</a> •
  <a href="#how-to-use-with-phaser">Use with Phaser</a> •
  <a href="#standalone-mode">Standalone Mode</a> •
  <a href="#starter-template">Starter Template</a> •
  <a href="#documentation">Documentation</a> •
  <a href="#new-features">New Features</a> •
  <a href="#license">License</a>
</p>

## Key Features

- Convert coordinates between Phaser 2D and three.js 3D elements
- Constraints
- Collision and Overlap detection
- and more...

## Examples

Find some nice examples on [enable3d.io](https://enable3d.io/examples.html)

## Get Started

### npm

Install phaser and enable3d via npm:

```console
npm i phaser enable3d
```

### umd

Or download the UMD bundle in [/bundles](https://github.com/yandeu/enable3d/tree/master/bundles)
The bundle exports "ENABLE3D".

```ts
const { enable3d, Scene3d } = ENABLE3D
// now use enable3d and Scene3d in your project
```

## How to use with Phaser

```ts
// STEP 1: Add the libraries with "npm install phaser enable3d"
import Phaser from 'phaser'
import enable3d, { Scene3D, Canvas } from 'enable3d'

const config = {
  // STEP 2: Set type to Phaser.WEBGL
  type: Phaser.WEBGL,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720
  },
  scene: [MainScene],
  // STEP 3: Add a custom canvas
  // The default Phaser canvas is not compatible with three.js
  ...Canvas()
}

window.addEventListener('load', () => {
  // STEP 4: Wrap enable3d around your Phaser game.
  // (First copy all ammo file from 'node_modules/enable3d/lib/ammo' to your public folder.)
  enable3d(() => new Phaser.Game(config)).withPhysics('/js/ammo')
})

// STEP 5: Extend your Scene with Scene3D instead of Phaser.Scene
class MainScene extends Scene3D {
  constructor() {
    super({ key: 'MainScene' })
  }

  init() {
    // STEP 6: Request a worm whole to the third dimension.
    this.requestThirdDimension()
  }

  create() {
    // STEP 7: Drive through the hole into the third dimension.
    this.accessThirdDimension()

    // STEP 8: Journey through the third dimension at warp speed.
    this.third.warpSpeed()

    // STEP 9: Add your first 3d object.
    this.third.add.box()

    // STEP 10: Add another box with physics enabled.
    this.third.physics.add.box()

    // STEP 11: Have fun using the third dimension in your awesome Phaser game.
    this.third.haveSomeFun()
  }
}
```

## Standalone Mode

At the moment enable3d can only be used together with Phaser.

## Starter Template

Looking for a powerful Starter Template?

Try [enable3d-project-template](https://github.com/yandeu/enable3d-project-template).

## Documentation

Why do you need a documentation if I've made such [great examples](https://enable3d.io/examples.html).

## New Features

At the time of writing, I have (more or less) implemented all core features I wanted to. Even if there is still a lot to implement, the library runs pretty stable. It is already possible to build all kinds of 3D games. But since it would take me a whole lot of time to implement all the little things a great 3d framework needs, I propose to add and improve only the feature you really need. For example, it does not make much sense to work 2 weeks on a perfect implementation of convex object breaking if no one needs it. So, if you need a feature or face some issues, open a new [issue on github](https://github.com/yandeu/enable3d/issues) or ask @yannick in the [Phaser forum](https://phaser.discourse.group/) for help.

It does not make much sense to publish a new version to npm every time a little feature has been added. Means, if your awesome feature has not been published to npm yet, I recommend to install enable3d directly from github.

```console
# install enable3d from github
npm install yandeu/enable3d

# cd into the directory
cd node_modules/enable3d/

# install and build
npm install && npm run build:enable3d
```

Happy coding!

## License

The GNU General Public License v3.0 (GNU GPLv3) 2019 - [Yannick Deubel](https://github.com/yandeu). Please have a look at the [LICENSE](LICENSE) for more details.
