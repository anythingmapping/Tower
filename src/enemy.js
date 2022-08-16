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
        this.radius = 50;
        this.health = 100;
        this.velocity = {
            x: 0,
            y: 0
        }
        this.image = new Image();
        this.image.src = './orc.png';
        this.frames_max = {
            max: 7,
            current: 0,
            elapsed: 0,
            hold: 2
        };

    }
    draw() {
        // this.ctx.fillStyle = 'red';
        // this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        const crop_width = this.image.width / this.frames_max.max;
        const crop = {
            position: {
                x: crop_width * this.frames_max.current,
                y: 0
            },
            width: crop_width,
            height: this.image.height
        }

        this.ctx.drawImage(
            this.image,
            crop.position.x,
            crop.position.y,
            crop.width,
            crop.height,
            this.position.x,
            this.position.y,
            crop.width,
            crop.height
        );

        this.frames_max.elapsed++;
        if (this.frames_max.elapsed % this.frames_max.hold === 0) {
            this.frames_max.current++;
            if (this.frames_max.current > this.frames_max.max - 1) {
                this.frames_max.current = 0;
            }

        };


        // this.ctx.beginPath();
        // this.ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
        // this.ctx.fillStyle = 'purple';
        // this.ctx.fill();

        // health bar
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.position.x, this.position.y - 15, this.width, 10)

        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(
            this.position.x,
            this.position.y - 15,
            (this.width * this.health) / 100,
            10
        )
    };

    update() {
        this.draw();

        /* ---------------------------------- speed --------------------------------- */
        const waypoint = this.waypoints[this.waypoint_index]
        const y_distance = waypoint.y - this.center.y;
        const x_distance = waypoint.x - this.center.x;
        const angle = Math.atan2(y_distance, x_distance);
        const speed = 4;
        this.velocity.x = Math.cos(angle) * speed;
        this.velocity.y = Math.sin(angle) * speed;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        /* -------------------------------- waypoints ------------------------------- */
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }

        if (
            Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) < Math.abs(this.velocity.x) &&
            Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) < Math.abs(this.velocity.y) &&
            this.waypoint_index < this.waypoints.length - 1) {
            this.waypoint_index++;
        }
    }
}