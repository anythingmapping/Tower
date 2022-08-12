import { Projectile } from "./projectile";

export class Building {
    constructor(ctx, { position = { x: 0, y: 0 } }) {
        this.position = position;
        this.ctx = ctx;
        this.width = 64 * 2
        this.height = 64
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
        this.projectiles = [];
        // console.log(this.center.y)
        // new Projectile({ position: { x: this.center.x, y: this.centre.y } });

        // new Projectile({
        //     position: {
        //         x: this.center.x,
        //         y: this.center.y
        //     }
        // })

    };

    draw() {
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(this.position.x, this.position.y, this.width, 64)
    };

}