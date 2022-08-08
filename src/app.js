console.log('js loaded');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'white';
ctx.fillRect(0, 2, canvas.width, canvas.height);

const image = new Image();
image.onload = () => {
    animate()
};

image.src = './res/map.png';
const placement_tiles_data = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0,
    0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0,
    0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0,
    0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0,
    0, 0, 0, 14, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0,
    0, 0, 0, 14, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0
]


const placement_tiles_data_2D = []

for (let i = 0; i < placement_tiles_data.length; i += 20) {
    placement_tiles_data_2D.push(placement_tiles_data.slice(i, i + 20))
}

class PlacementTile {
    constructor({ position = { x: 0, y: 0 } }) {
        this.position = position
        this.size = 64
    }

    draw() {
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size)
    }
}

const placement_tiles = []

placement_tiles_data_2D.forEach(row, y => {
    row.forEach(symbol, x => {
        if (symbol === 14) {
            // add building placement tile
            placement_tiles.push(
                new PlacementTile({
                    position: {
                        x: x * 64,
                        y: y * 64
                    }
                })
            )
        }
    })
})

console.log(placement_tiles)

const waypoints = [{
        "x": -50,
        "y": 538
    },
    {
        "x": 354,
        "y": 536
    },
    {
        "x": 354,
        "y": 158
    },
    {
        "x": 734,
        "y": 162
    },
    {
        "x": 734,
        "y": 416
    },
    {
        "x": 604,
        "y": 416
    },
    {
        "x": 608,
        "y": 606
    },
    {
        "x": 1054,
        "y": 606
    },
    {
        "x": 1052,
        "y": 222
    },
    {
        "x": 1356,
        "y": 222
    }
]
class Enemy {
    constructor({ position = { x: 0, y: 0 } }) {
        this.position = position
        this.width = 100
        this.height = 100
        this.waypoint_index = 0
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        this.draw();


        const waypoint = waypoints[this.waypoint_index]
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
            this.waypoint_index < waypoints.length - 1) {
            this.waypoint_index++;
        }
    }
}


const enemies = []
for (let i = 1; i < 20; i++) {
    const x_offset = i * 150;
    enemies.push(new Enemy({ position: { x: waypoints[0].x - x_offset, y: waypoints[0].y } }))
}

function animate() {
    requestAnimationFrame(animate);
    ctx.drawImage(image, 0, 0);
    enemies.forEach((enemy) => {
        enemy.update()
    })
}