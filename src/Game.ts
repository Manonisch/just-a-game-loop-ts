import { Bubble } from "./Bubble"

export class Game {
    time = 0
    bubbles = new Array<Bubble>()

    constructor() {
        const bubble = new Bubble()
        bubble.x = 100
        bubble.y = 100
        this.bubbles.push(bubble)
    }

    update() {
        this.time += 1 / 60

        for (const bubble of this.bubbles) {
            bubble.radius = Bubble.default_radius * (1 + 0.25 * Math.sin(this.time * 3))
        }
    }

    create_bubble(width:number, height:number){
        const bubble = new Bubble()
        bubble.x = Math.random() * width;
        bubble.y = Math.random() * height;
        this.bubbles.push(bubble)

    }
}
