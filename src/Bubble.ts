import { Vector } from "matter-js"

export class Bubble {
    static default_radius = 15

    color = "black"
    radius = Bubble.default_radius
    x = 0
    y = 0
    vx = 2 //needed?
    vy = 2

    move_to:Vector = null;

}


