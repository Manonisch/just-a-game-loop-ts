import { Bubble } from "./Bubble"

import { Vector } from "matter-js"


class Mouse{
    x:number;
    y:number;
}

export class Game {
    time = 0
    bubbles = new Array<Bubble>();
    mouse:Mouse = null;


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

            if(bubble.move_to !== null){
                let vec = this.move_bubble(bubble.move_to.x,bubble.move_to.y, bubble)
                bubble.x += vec.x * bubble.vx;
                bubble.y += vec.y * bubble.vy;
            }

        }
    }

    create_bubble(width:number, height:number){
        const bubble = new Bubble()
        bubble.x = Math.random() * width;
        bubble.y = Math.random() * height;
        this.bubbles.push(bubble)
    }

    move_to(vec:Vector){
        for (const bubble of this.bubbles) {
            bubble.move_to = vec;
        }
    }

    move_bubble(mouse_x:number, mouse_y:number, bubble:Bubble){
        let vec_x, vec_y;
        vec_x = mouse_x - bubble.x;
        vec_y = mouse_y - bubble.y;
        let vec = Vector.normalise({x:vec_x,y:vec_y});
        return vec;
    }
}

//vec
//vec normalize
//vec + x/y pro update