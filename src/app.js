import { waypoints } from "./waypoints";
import { placement_tiles_data } from "./placement_locations";
import { Enemy } from "./enemy";
import { Placement_tile } from "./placement_tile";
import { Building } from "./building";

console.log('js loaded');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'white';
ctx.fillRect(0, 2, canvas.width, canvas.height);

const image = new Image();
image.onload = () => {
    animate()
};

image.src = 'map.png';



// Placement tiles
const placement_tiles_data_2D = []

for (let i = 0; i < placement_tiles_data.length; i += 20) {
    placement_tiles_data_2D.push(placement_tiles_data.slice(i, i + 20))
}
// console.log(placement_tiles_data_2D)


// Tile placement for player
const placement_tiles = []
placement_tiles_data_2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 14) {
            // add building placement tile here
            placement_tiles.push(
                new Placement_tile(ctx, {
                    position: {
                        x: x * 64,
                        y: y * 64,
                    }
                })
            )
        }
    });
});
// console.log(placement_tiles)



// Sprite Creation
const enemies = []
for (let i = 1; i < 20; i++) {
    const x_offset = i * 150;
    enemies.push(new Enemy(ctx, waypoints, { position: { x: waypoints[0].x - x_offset, y: waypoints[0].y } }))
}
// console.log('enemies');
// console.log(enemies);

const buildings = [];
let active_tile = undefined;
// buildings.target = null;
// const valid_enemies = enemies.filter((enemy) => {
//     const x_difference = enemy.center.x - building.x;
//     const y_difference = enemy.center.y - building.y;
//     const distance = Math.hypot(x_difference, y_difference);
//     return distance < enemy.radius + building.radius;
// });
// buildings.target = valid_enemies[0];



// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    ctx.drawImage(image, 0, 0);
    enemies.forEach((enemy) => {
        enemy.update()
    })
    placement_tiles.forEach(tile => {
        tile.update(mouse);
    })
    buildings.forEach(building => { building.draw() })
}

const mouse = {
    x: undefined,
    y: undefined
};

canvas.addEventListener('click', (event) => {
    if (active_tile && !active_tile.isOccupied) {
        // console.log(active_tile.position.x)
        buildings.push(
            new Building(ctx, {
                position: {
                    x: active_tile.position.x,
                    y: active_tile.position.y
                }
            })
        )
        active_tile.isOccupied = true
    }
    // console.log(buildings)
})


window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    active_tile = null;
    for (let i = 0; i < placement_tiles.length; i++) {
        const tile = placement_tiles[i];
        if (
            mouse.x > tile.position.x &&
            mouse.x < tile.position.x + tile.size &&
            mouse.y > tile.position.y &&
            mouse.y < tile.position.y + tile.size
        ) {
            active_tile = tile;
            break;
        }
    }
    // console.log(active_tile)
})