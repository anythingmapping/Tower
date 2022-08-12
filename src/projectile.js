export class Projectile {
    constructor(ctx, { position = { x: 0, y: 0 } }) {
        this.position = position;
        this.ctx = ctx;
        this.velocity = { x: 0, y: 0 };
    };

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, 200, 0, Math.PI * 2);
        this.ctx.fill();
    };
}