import { waypoints } from "./waypoints";
import { placement_tiles_data } from "./placement_locations";
import { Enemy } from "./enemy";
import { Placement_tile } from "./placement_tile";

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
console.log(placement_tiles_data_2D)




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
console.log(placement_tiles)



// Sprint Creation
const enemies = []
for (let i = 1; i < 20; i++) {
    const x_offset = i * 150;
    enemies.push(new Enemy(ctx, waypoints, { position: { x: waypoints[0].x - x_offset, y: waypoints[0].y } }))
}
console.log('enemies');
console.log(enemies);


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
}

const mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})