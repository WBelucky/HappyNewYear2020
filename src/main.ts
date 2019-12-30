import * as PIXI from 'pixi.js'
import { SceneManager } from './scene_manager'
import { gameHeight, gameWidth } from './settings'

const main = () => {
    
    const app = new PIXI.Application({
        width: gameWidth,
        height: gameHeight,
        backgroundColor: 0xFFFFFF,
        resolution: window.devicePixelRatio,
    })
    
    console.log(app.renderer.resolution)

    app.renderer.view.id = "pixi-canvas"
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    const resize = () => {

        // const p = app.view.parentElement
        console.log(innerWidth)
        console.log(innerHeight)

        const ratio = Math.min(
            window.innerWidth / gameWidth,
            window.innerHeight/ gameHeight
        )

        const newWidth = Math.ceil(gameWidth * ratio)
        const newHeight = Math.ceil(gameHeight * ratio)

        app.view.style.width = `${newWidth}px`
        app.view.style.height = `${newHeight}px`

        app.renderer.resize(newWidth, newHeight)
        app.stage.scale.set(ratio)

        if (window.innerWidth / gameWidth < window.innerHeight / gameHeight) {
            app.view.style.top = `${(window.innerHeight - app.renderer.height) / 2}px`
            app.view.style.left = "0px"
        } else {
            app.view.style.left = `${(window.innerWidth - app.renderer.width) / 2}px`
            app.view.style.top = "0px"
        }
    }
    document.getElementById("game").appendChild(app.view)
    window.addEventListener("resize", resize, false)
        resize()

    app.loader.add("resources/animal_dance.png")
        .load((_, resources) => {
            const sceneManager = new SceneManager(app.stage, {
                resources,
            })
            let frameCount = 0
            app.ticker.add((deltaTimeMS: number) => {
                sceneManager.update({deltaTimeMS, frameCount})
                frameCount ++
            })
        })
}

main()