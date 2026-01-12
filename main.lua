-- Worm - Vampire Survivors Clone

local player = {
    x = 0,
    y = 0,
    speed = 200,
    size = 20,
    bobAmount = 4,
    bobSpeed = 12,
    bobTimer = 0,
    isMoving = false,
    attackRange = 250,
    attackCooldown = 0.4,
    attackTimer = 0
}

local camera = {
    x = 0,
    y = 0
}

local trees = {}
local enemies = {}
local projectiles = {}
local worldSize = 2000

-- Enemy settings
local enemySpawnRate = 1.5 -- seconds between spawns
local enemySpawnTimer = 0
local enemySpeed = 80
local enemySize = 18

-- Projectile settings
local projectileSpeed = 400
local projectileSize = 6

function love.load()
    love.graphics.setBackgroundColor(0.15, 0.2, 0.1)
    math.randomseed(os.time())

    -- Generate random trees
    for i = 1, 100 do
        table.insert(trees, {
            x = math.random(-worldSize, worldSize),
            y = math.random(-worldSize, worldSize),
            size = math.random(30, 60),
            shade = math.random() * 0.3
        })
    end

    -- Sort trees by y position for depth
    table.sort(trees, function(a, b) return a.y < b.y end)
end

function love.update(dt)
    updatePlayer(dt)
    updateCamera()
    updateEnemies(dt)
    updateProjectiles(dt)
    spawnEnemies(dt)
    autoAttack(dt)
end

function updatePlayer(dt)
    local dx, dy = 0, 0

    -- WASD movement
    if love.keyboard.isDown("w") then dy = dy - 1 end
    if love.keyboard.isDown("s") then dy = dy + 1 end
    if love.keyboard.isDown("a") then dx = dx - 1 end
    if love.keyboard.isDown("d") then dx = dx + 1 end

    player.isMoving = (dx ~= 0 or dy ~= 0)

    -- Normalize diagonal movement
    if dx ~= 0 and dy ~= 0 then
        dx = dx * 0.7071
        dy = dy * 0.7071
    end

    player.x = player.x + dx * player.speed * dt
    player.y = player.y + dy * player.speed * dt

    if player.isMoving then
        player.bobTimer = player.bobTimer + dt * player.bobSpeed
    else
        player.bobTimer = 0
    end

    -- Update attack cooldown
    if player.attackTimer > 0 then
        player.attackTimer = player.attackTimer - dt
    end
end

function updateCamera()
    camera.x = player.x - 400
    camera.y = player.y - 300
end

function spawnEnemies(dt)
    enemySpawnTimer = enemySpawnTimer + dt
    if enemySpawnTimer >= enemySpawnRate then
        enemySpawnTimer = 0

        -- Spawn enemy at random position outside screen
        local angle = math.random() * math.pi * 2
        local distance = 500 + math.random() * 200
        local ex = player.x + math.cos(angle) * distance
        local ey = player.y + math.sin(angle) * distance

        table.insert(enemies, {
            x = ex,
            y = ey,
            size = enemySize,
            health = 1
        })
    end
end

function updateEnemies(dt)
    for i = #enemies, 1, -1 do
        local enemy = enemies[i]

        -- Move toward player
        local dx = player.x - enemy.x
        local dy = player.y - enemy.y
        local dist = math.sqrt(dx * dx + dy * dy)

        if dist > 0 then
            enemy.x = enemy.x + (dx / dist) * enemySpeed * dt
            enemy.y = enemy.y + (dy / dist) * enemySpeed * dt
        end

        -- Check if enemy reached player (damage would go here)
        if dist < player.size + enemy.size then
            -- For now, just push enemy back slightly
            enemy.x = enemy.x - (dx / dist) * 5
            enemy.y = enemy.y - (dy / dist) * 5
        end

        -- Remove dead enemies
        if enemy.health <= 0 then
            table.remove(enemies, i)
        end
    end
end

function autoAttack(dt)
    if player.attackTimer > 0 then return end

    -- Find nearest enemy in range
    local nearestEnemy = nil
    local nearestDist = player.attackRange

    for _, enemy in ipairs(enemies) do
        local dx = enemy.x - player.x
        local dy = enemy.y - player.y
        local dist = math.sqrt(dx * dx + dy * dy)

        if dist < nearestDist then
            nearestDist = dist
            nearestEnemy = enemy
        end
    end

    -- Fire at nearest enemy
    if nearestEnemy then
        player.attackTimer = player.attackCooldown

        local dx = nearestEnemy.x - player.x
        local dy = nearestEnemy.y - player.y
        local dist = math.sqrt(dx * dx + dy * dy)

        table.insert(projectiles, {
            x = player.x,
            y = player.y,
            vx = (dx / dist) * projectileSpeed,
            vy = (dy / dist) * projectileSpeed,
            size = projectileSize
        })
    end
end

function updateProjectiles(dt)
    for i = #projectiles, 1, -1 do
        local proj = projectiles[i]

        -- Move projectile
        proj.x = proj.x + proj.vx * dt
        proj.y = proj.y + proj.vy * dt

        -- Check collision with enemies
        local hit = false
        for j = #enemies, 1, -1 do
            local enemy = enemies[j]
            local dx = proj.x - enemy.x
            local dy = proj.y - enemy.y
            local dist = math.sqrt(dx * dx + dy * dy)

            if dist < proj.size + enemy.size then
                enemy.health = enemy.health - 1
                hit = true
                break
            end
        end

        -- Remove if hit or out of range
        local distFromPlayer = math.sqrt((proj.x - player.x)^2 + (proj.y - player.y)^2)
        if hit or distFromPlayer > 800 then
            table.remove(projectiles, i)
        end
    end
end

function love.draw()
    love.graphics.push()
    love.graphics.translate(-camera.x, -camera.y)

    -- Draw ground grid
    love.graphics.setColor(0.12, 0.18, 0.08)
    local gridSize = 100
    local startX = math.floor((camera.x - 50) / gridSize) * gridSize
    local startY = math.floor((camera.y - 50) / gridSize) * gridSize
    for gx = startX, startX + 900, gridSize do
        for gy = startY, startY + 700, gridSize do
            if (gx / gridSize + gy / gridSize) % 2 == 0 then
                love.graphics.rectangle("fill", gx, gy, gridSize, gridSize)
            end
        end
    end

    -- Draw attack range indicator
    love.graphics.setColor(1, 1, 1, 0.05)
    love.graphics.circle("line", player.x, player.y, player.attackRange)

    -- Draw trees behind player
    for _, tree in ipairs(trees) do
        if tree.y < player.y then
            drawTree(tree)
        end
    end

    -- Draw enemies behind player
    for _, enemy in ipairs(enemies) do
        if enemy.y < player.y then
            drawEnemy(enemy)
        end
    end

    -- Draw projectiles
    drawProjectiles()

    -- Draw player
    drawPlayer()

    -- Draw enemies in front of player
    for _, enemy in ipairs(enemies) do
        if enemy.y >= player.y then
            drawEnemy(enemy)
        end
    end

    -- Draw trees in front of player
    for _, tree in ipairs(trees) do
        if tree.y >= player.y then
            drawTree(tree)
        end
    end

    love.graphics.pop()

    -- UI
    love.graphics.setColor(1, 1, 1)
    love.graphics.print("WASD to move | ESC to quit", 10, 10)
    love.graphics.print(string.format("Enemies: %d", #enemies), 10, 30)
end

function drawEnemy(enemy)
    -- Shadow
    love.graphics.setColor(0, 0, 0, 0.3)
    love.graphics.ellipse("fill", enemy.x, enemy.y + enemy.size, enemy.size * 0.7, enemy.size * 0.25)

    -- Body (red square)
    love.graphics.setColor(0.8, 0.2, 0.2)
    love.graphics.rectangle("fill", enemy.x - enemy.size, enemy.y - enemy.size, enemy.size * 2, enemy.size * 2)

    -- Outline
    love.graphics.setColor(0.5, 0.1, 0.1)
    love.graphics.setLineWidth(2)
    love.graphics.rectangle("line", enemy.x - enemy.size, enemy.y - enemy.size, enemy.size * 2, enemy.size * 2)

    -- Angry eyes
    love.graphics.setColor(1, 1, 0)
    love.graphics.rectangle("fill", enemy.x - 8, enemy.y - 5, 5, 5)
    love.graphics.rectangle("fill", enemy.x + 3, enemy.y - 5, 5, 5)
end

function drawProjectiles()
    love.graphics.setColor(1, 0.9, 0.3)
    for _, proj in ipairs(projectiles) do
        love.graphics.circle("fill", proj.x, proj.y, proj.size)
    end
    -- Glow effect
    love.graphics.setColor(1, 0.8, 0.2, 0.5)
    for _, proj in ipairs(projectiles) do
        love.graphics.circle("fill", proj.x, proj.y, proj.size * 1.5)
    end
end

function drawTree(tree)
    local x, y, size = tree.x, tree.y, tree.size

    love.graphics.setColor(0, 0, 0, 0.2)
    love.graphics.ellipse("fill", x, y + 5, size * 0.4, size * 0.15)

    love.graphics.setColor(0.4, 0.25, 0.15)
    love.graphics.rectangle("fill", x - size * 0.08, y - size * 0.3, size * 0.16, size * 0.35)

    local green = 0.3 + tree.shade

    love.graphics.setColor(0.1, green - 0.1, 0.1)
    love.graphics.polygon("fill", x, y - size, x - size * 0.5, y - size * 0.2, x + size * 0.5, y - size * 0.2)

    love.graphics.setColor(0.15, green, 0.15)
    love.graphics.polygon("fill", x, y - size * 1.3, x - size * 0.4, y - size * 0.5, x + size * 0.4, y - size * 0.5)

    love.graphics.setColor(0.2, green + 0.1, 0.2)
    love.graphics.polygon("fill", x, y - size * 1.5, x - size * 0.3, y - size * 0.9, x + size * 0.3, y - size * 0.9)
end

function drawPlayer()
    local bobOffset = 0
    if player.isMoving then
        bobOffset = math.sin(player.bobTimer) * player.bobAmount
    end

    love.graphics.setColor(0, 0, 0, 0.3)
    love.graphics.ellipse("fill", player.x, player.y + player.size + 2, player.size * 0.8, player.size * 0.3)

    love.graphics.setColor(0.3, 0.7, 0.4)
    love.graphics.circle("fill", player.x, player.y + bobOffset, player.size)

    love.graphics.setColor(0.2, 0.5, 0.3)
    love.graphics.setLineWidth(2)
    love.graphics.circle("line", player.x, player.y + bobOffset, player.size)

    love.graphics.setColor(1, 1, 1)
    love.graphics.circle("fill", player.x - 6, player.y + bobOffset - 4, 5)
    love.graphics.circle("fill", player.x + 6, player.y + bobOffset - 4, 5)

    love.graphics.setColor(0.1, 0.1, 0.1)
    love.graphics.circle("fill", player.x - 5, player.y + bobOffset - 4, 2)
    love.graphics.circle("fill", player.x + 7, player.y + bobOffset - 4, 2)
end

function love.keypressed(key)
    if key == "escape" then
        love.event.quit()
    end
end
