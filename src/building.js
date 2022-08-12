import { Projectile } from "./projectile";
export class Building {
    constructor(ctx, { position = { x: 0, y: 0 } }) {
        this.position = position;
        this.ctx = ctx;
        this.position = position;
        this.width = 64 * 2;
        this.height = 64;
        this.center = {
            x: this.position.x + (this.width / 4),
            y: this.position.y + this.height / 2
        };
        this.projectiles = [];
        this.radius = 250;
        this.target;
        this.frames = 0;
    };

    draw() {
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(this.position.x, this.position.y, 64, 64);

        this.ctx.beginPath()
        this.ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(0,0,255,0.21)';
        this.ctx.fill()
    };

    update() {
        this.draw()
        if (this.frames % 100 === 0 && this.target) {
            this.projectiles.push(
                new Projectile(this.ctx, {
                    position: {
                        x: this.center.x,
                        y: this.center.y
                    },
                    enemy: this.target
                })
            );
        }
        this.frames++;

    };

}