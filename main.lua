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
    y = 0,
    shakeAmount = 0,
    shakeDuration = 0
}

local trees = {}
local enemies = {}
local projectiles = {}
local particles = {}
local bloodStains = {}
local worldSize = 2000

-- Enemy settings
local enemySpawnRate = 1.5
local enemySpawnTimer = 0
local enemySpeed = 80
local enemySize = 18

-- Projectile settings
local projectileSpeed = 400
local projectileSize = 6

function love.load()
    love.graphics.setBackgroundColor(0.15, 0.2, 0.1)
    math.randomseed(os.time())

    for i = 1, 100 do
        table.insert(trees, {
            x = math.random(-worldSize, worldSize),
            y = math.random(-worldSize, worldSize),
            size = math.random(30, 60),
            shade = math.random() * 0.3
        })
    end

    table.sort(trees, function(a, b) return a.y < b.y end)
end

function love.update(dt)
    updatePlayer(dt)
    updateCamera(dt)
    updateEnemies(dt)
    updateProjectiles(dt)
    updateParticles(dt)
    spawnEnemies(dt)
    autoAttack(dt)
end

function updatePlayer(dt)
    local dx, dy = 0, 0

    if love.keyboard.isDown("w") then dy = dy - 1 end
    if love.keyboard.isDown("s") then dy = dy + 1 end
    if love.keyboard.isDown("a") then dx = dx - 1 end
    if love.keyboard.isDown("d") then dx = dx + 1 end

    player.isMoving = (dx ~= 0 or dy ~= 0)

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

    if player.attackTimer > 0 then
        player.attackTimer = player.attackTimer - dt
    end
end

function updateCamera(dt)
    camera.x = player.x - 400
    camera.y = player.y - 300

    -- Update screen shake
    if camera.shakeDuration > 0 then
        camera.shakeDuration = camera.shakeDuration - dt
        camera.shakeAmount = camera.shakeAmount * 0.9
    else
        camera.shakeAmount = 0
    end
end

function screenShake(amount, duration)
    camera.shakeAmount = amount
    camera.shakeDuration = duration
end

function spawnEnemies(dt)
    enemySpawnTimer = enemySpawnTimer + dt
    if enemySpawnTimer >= enemySpawnRate then
        enemySpawnTimer = 0

        local angle = math.random() * math.pi * 2
        local distance = 500 + math.random() * 200
        local ex = player.x + math.cos(angle) * distance
        local ey = player.y + math.sin(angle) * distance

        table.insert(enemies, {
            x = ex,
            y = ey,
            size = enemySize,
            health = 1,
            flashTimer = 0
        })
    end
end

function updateEnemies(dt)
    for i = #enemies, 1, -1 do
        local enemy = enemies[i]

        -- Update flash timer
        if enemy.flashTimer > 0 then
            enemy.flashTimer = enemy.flashTimer - dt
        end

        local dx = player.x - enemy.x
        local dy = player.y - enemy.y
        local dist = math.sqrt(dx * dx + dy * dy)

        if dist > 0 then
            enemy.x = enemy.x + (dx / dist) * enemySpeed * dt
            enemy.y = enemy.y + (dy / dist) * enemySpeed * dt
        end

        if dist < player.size + enemy.size then
            enemy.x = enemy.x - (dx / dist) * 5
            enemy.y = enemy.y - (dy / dist) * 5
        end

        -- Remove dead enemies and spawn effects
        if enemy.health <= 0 then
            spawnBloodExplosion(enemy.x, enemy.y)
            spawnBloodStain(enemy.x, enemy.y)
            table.remove(enemies, i)
        end
    end
end

function spawnBloodExplosion(x, y)
    for i = 1, 20 do
        local angle = math.random() * math.pi * 2
        local speed = 50 + math.random() * 150
        table.insert(particles, {
            x = x,
            y = y,
            vx = math.cos(angle) * speed,
            vy = math.sin(angle) * speed,
            size = 3 + math.random() * 5,
            life = 0.5 + math.random() * 0.5,
            maxLife = 0.5 + math.random() * 0.5,
            r = 0.6 + math.random() * 0.4,
            g = 0,
            b = 0
        })
    end
end

function spawnBloodStain(x, y)
    table.insert(bloodStains, {
        x = x,
        y = y,
        size = 20 + math.random() * 15,
        rotation = math.random() * math.pi * 2,
        alpha = 0.6
    })

    -- Limit blood stains to prevent too many
    if #bloodStains > 100 then
        table.remove(bloodStains, 1)
    end
end

function updateParticles(dt)
    for i = #particles, 1, -1 do
        local p = particles[i]

        p.x = p.x + p.vx * dt
        p.y = p.y + p.vy * dt
        p.vx = p.vx * 0.95
        p.vy = p.vy * 0.95
        p.vy = p.vy + 200 * dt -- gravity
        p.life = p.life - dt
        p.size = p.size * 0.98

        if p.life <= 0 then
            table.remove(particles, i)
        end
    end
end

function autoAttack(dt)
    if player.attackTimer > 0 then return end

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

        proj.x = proj.x + proj.vx * dt
        proj.y = proj.y + proj.vy * dt

        local hit = false
        for j = #enemies, 1, -1 do
            local enemy = enemies[j]
            local dx = proj.x - enemy.x
            local dy = proj.y - enemy.y
            local dist = math.sqrt(dx * dx + dy * dy)

            if dist < proj.size + enemy.size then
                enemy.health = enemy.health - 1
                enemy.flashTimer = 0.1 -- Flash for 0.1 seconds
                screenShake(4, 0.1)
                hit = true
                break
            end
        end

        local distFromPlayer = math.sqrt((proj.x - player.x)^2 + (proj.y - player.y)^2)
        if hit or distFromPlayer > 800 then
            table.remove(projectiles, i)
        end
    end
end

function love.draw()
    love.graphics.push()

    -- Apply camera with screen shake
    local shakeX = 0
    local shakeY = 0
    if camera.shakeAmount > 0 then
        shakeX = (math.random() - 0.5) * camera.shakeAmount * 2
        shakeY = (math.random() - 0.5) * camera.shakeAmount * 2
    end
    love.graphics.translate(-camera.x + shakeX, -camera.y + shakeY)

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

    -- Draw blood stains
    drawBloodStains()

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

    -- Draw particles behind player
    drawParticles()

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

function drawBloodStains()
    for _, stain in ipairs(bloodStains) do
        love.graphics.setColor(0.4, 0, 0, stain.alpha)

        -- Draw irregular blood splat shape
        love.graphics.push()
        love.graphics.translate(stain.x, stain.y)
        love.graphics.rotate(stain.rotation)

        -- Main splat
        love.graphics.ellipse("fill", 0, 0, stain.size, stain.size * 0.7)

        -- Extra blobs for irregular shape
        love.graphics.ellipse("fill", stain.size * 0.5, stain.size * 0.3, stain.size * 0.4, stain.size * 0.3)
        love.graphics.ellipse("fill", -stain.size * 0.4, -stain.size * 0.2, stain.size * 0.35, stain.size * 0.25)
        love.graphics.ellipse("fill", stain.size * 0.2, -stain.size * 0.5, stain.size * 0.3, stain.size * 0.2)

        love.graphics.pop()
    end
end

function drawParticles()
    for _, p in ipairs(particles) do
        local alpha = p.life / p.maxLife
        love.graphics.setColor(p.r, p.g, p.b, alpha)
        love.graphics.circle("fill", p.x, p.y, p.size)
    end
end

function drawEnemy(enemy)
    -- Shadow
    love.graphics.setColor(0, 0, 0, 0.3)
    love.graphics.ellipse("fill", enemy.x, enemy.y + enemy.size, enemy.size * 0.7, enemy.size * 0.25)

    -- Flash white when hit, otherwise red
    if enemy.flashTimer > 0 then
        love.graphics.setColor(1, 1, 1)
    else
        love.graphics.setColor(0.8, 0.2, 0.2)
    end
    love.graphics.rectangle("fill", enemy.x - enemy.size, enemy.y - enemy.size, enemy.size * 2, enemy.size * 2)

    -- Outline
    if enemy.flashTimer > 0 then
        love.graphics.setColor(0.8, 0.8, 0.8)
    else
        love.graphics.setColor(0.5, 0.1, 0.1)
    end
    love.graphics.setLineWidth(2)
    love.graphics.rectangle("line", enemy.x - enemy.size, enemy.y - enemy.size, enemy.size * 2, enemy.size * 2)

    -- Angry eyes (skip if flashing)
    if enemy.flashTimer <= 0 then
        love.graphics.setColor(1, 1, 0)
        love.graphics.rectangle("fill", enemy.x - 8, enemy.y - 5, 5, 5)
        love.graphics.rectangle("fill", enemy.x + 3, enemy.y - 5, 5, 5)
    end
end

function drawProjectiles()
    love.graphics.setColor(1, 0.9, 0.3)
    for _, proj in ipairs(projectiles) do
        love.graphics.circle("fill", proj.x, proj.y, proj.size)
    end
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
