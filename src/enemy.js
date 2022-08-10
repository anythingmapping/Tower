export class Enemy {
    constructor(ctx, waypoints, { position = { x: 0, y: 0 } }) {
        this.position = position;
        this.width = 100;
        this.ctx = ctx;
        this.waypoints = waypoints;
        this.height = 100;
        this.waypoint_index = 0;
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        };
    }
    draw() {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        this.draw();


        const waypoint = this.waypoints[this.waypoint_index]
        const y_distance = waypoint.y - this.center.y;
        const x_distance = waypoint.x - this.center.x;
        const angle = Math.atan2(y_distance, x_distance);
        this.position.x += Math.cos(angle);
        this.position.y += Math.sin(angle);
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }

        if (
            Math.round(this.center.x) === Math.round(waypoint.x) &&
            Math.round(this.center.y) === Math.round(waypoint.y) &&
            this.waypoint_index < this.waypoints.length - 1) {
            this.waypoint_index++;
        }
    }
}