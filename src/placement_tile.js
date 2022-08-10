export class Placement_tile {
    constructor(ctx, { position = { x: 0, y: 0 } }) {
        this.position = position;
        this.ctx = ctx;
        this.size = 64;
        this.color = 'rgba(255,255,255,0.5)';
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
    }

    update(mouse) {
        this.draw();

        if (mouse.x > this.position.x &&
            mouse.x < this.position.x + this.size &&
            mouse.y > this.position.y &&
            mouse.y < this.position.y + this.size) {
            console.log('a thing!!!!')
        }


    }
};