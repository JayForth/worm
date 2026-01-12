-- Worm - Vampire Survivors Clone

local player = {
    x = 0,
    y = 0,
    speed = 200,
    size = 20,
    bobAmount = 4,
    bobSpeed = 12,
    bobTimer = 0,
    isMoving = false
}

local camera = {
    x = 0,
    y = 0
}

local trees = {}
local worldSize = 2000

function love.load()
    love.graphics.setBackgroundColor(0.15, 0.2, 0.1)

    -- Generate random trees
    math.randomseed(os.time())
    for i = 1, 100 do
        table.insert(trees, {
            x = math.random(-worldSize, worldSize),
            y = math.random(-worldSize, worldSize),
            size = math.random(30, 60),
            shade = math.random() * 0.3 -- Variation in green
        })
    end

    -- Sort trees by y position for depth
    table.sort(trees, function(a, b) return a.y < b.y end)
end

function love.update(dt)
    local dx, dy = 0, 0

    -- WASD movement
    if love.keyboard.isDown("w") then dy = dy - 1 end
    if love.keyboard.isDown("s") then dy = dy + 1 end
    if love.keyboard.isDown("a") then dx = dx - 1 end
    if love.keyboard.isDown("d") then dx = dx + 1 end

    -- Check if moving
    player.isMoving = (dx ~= 0 or dy ~= 0)

    -- Normalize diagonal movement
    if dx ~= 0 and dy ~= 0 then
        dx = dx * 0.7071
        dy = dy * 0.7071
    end

    -- Apply movement
    player.x = player.x + dx * player.speed * dt
    player.y = player.y + dy * player.speed * dt

    -- Update bob timer when moving
    if player.isMoving then
        player.bobTimer = player.bobTimer + dt * player.bobSpeed
    else
        player.bobTimer = 0
    end

    -- Update camera to follow player (centered)
    camera.x = player.x - 400
    camera.y = player.y - 300
end

function love.draw()
    -- Apply camera transform
    love.graphics.push()
    love.graphics.translate(-camera.x, -camera.y)

    -- Draw ground texture (grid pattern for movement feedback)
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

    -- Draw trees behind player
    for _, tree in ipairs(trees) do
        if tree.y < player.y then
            drawTree(tree)
        end
    end

    -- Draw player
    drawPlayer()

    -- Draw trees in front of player
    for _, tree in ipairs(trees) do
        if tree.y >= player.y then
            drawTree(tree)
        end
    end

    love.graphics.pop()

    -- UI (fixed to screen)
    love.graphics.setColor(1, 1, 1)
    love.graphics.print("WASD to move | ESC to quit", 10, 10)
    love.graphics.print(string.format("Position: %.0f, %.0f", player.x, player.y), 10, 30)
end

function drawTree(tree)
    local x, y, size = tree.x, tree.y, tree.size

    -- Tree shadow
    love.graphics.setColor(0, 0, 0, 0.2)
    love.graphics.ellipse("fill", x, y + 5, size * 0.4, size * 0.15)

    -- Tree trunk
    love.graphics.setColor(0.4, 0.25, 0.15)
    love.graphics.rectangle("fill", x - size * 0.08, y - size * 0.3, size * 0.16, size * 0.35)

    -- Tree foliage (stacked triangles)
    local green = 0.3 + tree.shade

    -- Bottom layer
    love.graphics.setColor(0.1, green - 0.1, 0.1)
    love.graphics.polygon("fill",
        x, y - size,
        x - size * 0.5, y - size * 0.2,
        x + size * 0.5, y - size * 0.2
    )

    -- Middle layer
    love.graphics.setColor(0.15, green, 0.15)
    love.graphics.polygon("fill",
        x, y - size * 1.3,
        x - size * 0.4, y - size * 0.5,
        x + size * 0.4, y - size * 0.5
    )

    -- Top layer
    love.graphics.setColor(0.2, green + 0.1, 0.2)
    love.graphics.polygon("fill",
        x, y - size * 1.5,
        x - size * 0.3, y - size * 0.9,
        x + size * 0.3, y - size * 0.9
    )
end

function drawPlayer()
    -- Calculate bob offset
    local bobOffset = 0
    if player.isMoving then
        bobOffset = math.sin(player.bobTimer) * player.bobAmount
    end

    -- Draw player shadow
    love.graphics.setColor(0, 0, 0, 0.3)
    love.graphics.ellipse("fill", player.x, player.y + player.size + 2, player.size * 0.8, player.size * 0.3)

    -- Draw player body
    love.graphics.setColor(0.3, 0.7, 0.4)
    love.graphics.circle("fill", player.x, player.y + bobOffset, player.size)

    -- Draw player outline
    love.graphics.setColor(0.2, 0.5, 0.3)
    love.graphics.setLineWidth(2)
    love.graphics.circle("line", player.x, player.y + bobOffset, player.size)

    -- Draw eyes
    love.graphics.setColor(1, 1, 1)
    love.graphics.circle("fill", player.x - 6, player.y + bobOffset - 4, 5)
    love.graphics.circle("fill", player.x + 6, player.y + bobOffset - 4, 5)

    -- Draw pupils
    love.graphics.setColor(0.1, 0.1, 0.1)
    love.graphics.circle("fill", player.x - 5, player.y + bobOffset - 4, 2)
    love.graphics.circle("fill", player.x + 7, player.y + bobOffset - 4, 2)
end

function love.keypressed(key)
    if key == "escape" then
        love.event.quit()
    end
end
