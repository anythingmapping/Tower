export class Building {
    constructor(ctx, { position = { x: 0, y: 0 } }) {
        this.position = position;
        this.ctx = ctx;
    };

    draw() {
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(this.position.x, this.position.y, 64, 64)
    };

}