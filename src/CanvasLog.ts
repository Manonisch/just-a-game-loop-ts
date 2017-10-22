export class CanvasLog {
    log = new Array<Array<any>>()
    _console_log = console.log
    _console_error = console.error

    constructor() {
        console.log = (...args: any[]) => this.on_console_log(...args)
        console.error = (...args: any[]) => this.on_console_error(...args)
        setInterval(() => this.select_next_log_msg(), 1000)
    }

    render_log_msg(ctx: CanvasRenderingContext2D) {
        if (this.log[0]) {
            ctx.fillStyle = "black"
            const msg = this.log[0].join(" ")
            ctx.fillText(msg, 1, 14)
        }
    }

    select_next_log_msg() {
        this.log.shift()
    }

    on_console_log(...args: any[]) {
        this._console_log(...args)
        this.log.push(["log"].concat(args))
    }

    on_console_error(...args: any[]) {
        this._console_error(...args)
        this.log.push(["error"].concat(args))
    }
}
