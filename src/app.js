import { waypoints } from "./waypoints";
import { placement_tiles_data } from "./placement_locations";
import { Enemy } from "./enemy";
import { Placement_tile } from "./placement_tile";
import { Building } from "./building";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'white';
ctx.fillRect(0, 2, canvas.width, canvas.height);

const image = new Image();
image.onload = () => {
    animate()
};

image.src = 'map.png';




/* ----------------------------- Placement tiles ---------------------------- */
const placement_tiles_data_2D = []

for (let i = 0; i < placement_tiles_data.length; i += 20) {
    placement_tiles_data_2D.push(placement_tiles_data.slice(i, i + 20))
}
// console.log(placement_tiles_data_2D)




/* ------------------------ Tile placement for player ----------------------- */
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



/* ---------------------------  Sprint Creation --------------------------- */
const enemies = []
let enemy_count = 3;

function spawn_enemies(spawn_count) {
    for (let i = 1; i < spawn_count + 1; i++) {
        const x_offset = i * 150;
        enemies.push(new Enemy(ctx, waypoints, { position: { x: waypoints[0].x - x_offset, y: waypoints[0].y } }))
    }
}

spawn_enemies(3)
    // console.log('enemies');
    // console.log(enemies);

const buildings = [];
let active_tile = undefined;



/* -------------------------------------------------------------------------- */
/*                               Animation loop                               */
/* -------------------------------------------------------------------------- */
function animate() {
    requestAnimationFrame(animate);
    ctx.drawImage(image, 0, 0);

    /* ------------------------------ enemy sprites ----------------------------- */
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i]
        enemy.update()
    }

    /* ----------------------------- placement_tiles ---------------------------- */
    placement_tiles.forEach(tile => {
        tile.update(mouse);
    });

    /* ------------------------ buildings and projectiles ----------------------- */
    buildings.forEach(building => {
        building.update()
        building.target = null;
        const validEnemies = enemies.filter((enemy) => {
            const xDifference = enemy.center.x - building.center.x
            const yDifference = enemy.center.y - building.center.y
            const distance = Math.hypot(xDifference, yDifference)
            return distance < enemy.radius + building.radius
        })
        building.target = validEnemies[0]

        for (let i = building.projectiles.length - 1; i >= 0; i--) {
            const projectile = building.projectiles[i]

            projectile.update()

            const xDifference = projectile.enemy.center.x - projectile.position.x
            const yDifference = projectile.enemy.center.y - projectile.position.y
            const distance = Math.hypot(xDifference, yDifference)

            /* ---------------------- projectile hitting the enemy ---------------------- */
            if (distance < projectile.enemy.radius + projectile.radius) {
                projectile.enemy.health -= 20;
                if (projectile.enemy.health <= 0) {
                    const enemyIndex = enemies.findIndex((enemy) => {
                        return projectile.enemy === enemy
                    });
                    if (enemyIndex > -1) enemies.splice(enemyIndex, 1)
                }


                /* -------------------- tracking total number of enemies -------------------- */
                if (enemies.length === 0) {
                    spawn_enemies(enemy_count);
                    enemy_count += 2;
                };
                console.log(projectile.enemy.health)
                building.projectiles.splice(i, 1)
            }
        }

    })
}

const mouse = {
    x: undefined,
    y: undefined
};

/* -------------------------------------------------------------------------- */
/*                               event listener                               */
/* -------------------------------------------------------------------------- */

canvas.addEventListener('click', (event) => {
    if (active_tile) {
        buildings.push(new Building(ctx, {
            position: {
                x: active_tile.position.x,
                y: active_tile.position.y
            }
        }))
    }

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