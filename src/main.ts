import { Game } from "./Game"


class Main {
    canvas: HTMLCanvasElement
    game: Game

    constructor() {
        this.canvas = <HTMLCanvasElement>document.querySelector("#game-canvas")
        this.game = new Game()

        const ctx = this.canvas.getContext("2d")
        this.resize_canvas()
        this.render_title(ctx)

        window.addEventListener('resize', (ev) => this.on_window_resize())
        window.addEventListener("click", (ev) => this.on_window_click());

        window.addEventListener("keypress", (ev) => {
            if (ev.key == " ") console.log("space")
        })

        window.addEventListener("keypress", (ev) => {
            if (ev.key == "c") return this.on_c_press();
        })

        window.addEventListener("keypress", (ev) => {
            if (ev.key == "b") return this.on_b_press();
        })

        setTimeout(() => this.game_loop(), 1000)
    }

    on_c_press(){
        console.log("color_changed");
        this.change_color();
    }

    on_b_press(){
        console.log("bubble created");
        this.add_bubble();
    }

    change_color(){
        for (const bubble of this.game.bubbles) {
            let r, b , g, a;

            r = Math.floor(Math.random()*255);//random number between 0 /255
            g = Math.floor(Math.random()*255);//random number between 0 /255
            b = Math.floor(Math.random()*255);//random number between 0 /255
            a = 0.5 + (Math.random()*0.5);//random number between 0 /1
            bubble.color = "rgba("+ r + "," + g + "," + b + "," + a + ")";
            console.log(bubble.color);
        }
    }

    add_bubble(){
        this.game.create_bubble( window.innerWidth, window.innerHeight);
    }

    on_window_resize() {
        console.log('on_window_resize', window.innerWidth, window.innerHeight)
        this.resize_canvas()
    }

    on_window_click() {
        this.requestFullScreen()
    }

    resize_canvas() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
    }

    requestFullScreen() {
        console.log("requestFullScreen")
        const el: any = document.documentElement
        const rfs = el.requestFullscreen
            || el.webkitRequestFullScreen
            || el.mozRequestFullScreen
            || el.msRequestFullscreen
        rfs.call(el)
    }

    game_loop() {
        this.game.update()
        this.render_game(this.game)
        window.requestAnimationFrame(() => this.game_loop())
    }

    render_game(game: Game) {
        const ctx = this.canvas.getContext("2d")
        const render_functions = [
            this.render_clear_canvas,
            this.render_bubbles
        ]
        for (const render_function of render_functions) {
            ctx.save()
            render_function.call(this, ctx)
            ctx.restore()
        }
    }

    render_clear_canvas(ctx: CanvasRenderingContext2D) {
        //ctx.fillStyle = "#303030"
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    render_bubbles(ctx: CanvasRenderingContext2D) {
        for (const bubble of this.game.bubbles) {
            ctx.fillStyle = bubble.color
            ctx.beginPath()
            ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2)
            ctx.closePath()
            ctx.fill()
        }
    }

    render_title(ctx: CanvasRenderingContext2D) {
        const title = document.querySelector('title').textContent
        ctx.fillStyle = "black"
        ctx.fillText(title, this.canvas.width / 2, this.canvas.height / 2)
    }
}



const main = new Main()