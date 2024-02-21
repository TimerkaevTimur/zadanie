let playerNameInput = document.getElementById('playerName');
let playerNameDisplay = document.getElementById('playerNameDisplay');
let mapSelect = document.getElementById('mapSelect');
let currentTimeDisplay = document.getElementById('currentTime');
let gameTimeDisplay = document.getElementById('gameTime');
let livesDisplay = document.getElementById('lives');
let resultTimeDisplay = document.getElementById('resultTime');
let monsterCollisionsDisplay = document.getElementById('monsterCollisions');
let trapHitsDisplay = document.getElementById('trapHits');
let remainingLivesDisplay = document.getElementById('remainingLives');
let loginScreen = document.getElementById('loginScreen');
let gameScreen = document.getElementById('gameScreen');
let resultScreen = document.getElementById('resultScreen');
let startButton = document.getElementById('startButton');
let restartButton = document.getElementById('restartButton');
let map = document.getElementById('map');
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

// Запуск обновления информации о игре и таймеров
setInterval(updateGameInfo, 1000);

// Позиция игрока
let playerX = 0;
let playerY = 0;

// Дополнительные параметры для столкновений
let monsters = [];
let traps = [];

function startGame() {
    let playerName = playerNameInput.value;
    playerNameDisplay.textContent = playerName;
    loginScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    player = createPlayer(); // Добавьте эту строку
    createMonsters();
    createTraps();
    // Добавлено создание карты
    createMap();
}

// Функция создания карты
function createMap() {
    // Создание карты на игровом экране
    let map = document.getElementById('map');
    // В данном примере, мы просто создаем прямоугольный блок, который представляет собой карту
    map.innerHTML = '<div style="width: 100%; height: 100%; border: 1px solid black;"></div>';
}

// Функция создания монстров
function createMonsters() {
    // Очищаем массив монстров перед созданием новых
    monsters = [];
    // Генерация и отображение монстров на карте
    for (let i = 0; i < 10; i++) {
        let monster = document.createElement('div');
        monster.className = 'monster';
        monster.style.left = Math.floor(Math.random() * 380) + 'px';
        monster.style.top = Math.floor(Math.random() * 280) + 'px';
        map.appendChild(monster);
        // Добавляем монстра в массив
        monsters.push(monster);
    }
}

// Функция создания ловушек
function createTraps() {
    // Очищаем массив ловушек перед созданием новых
    traps = [];
    // Генерация и отображение ловушек на карте
    for (let i = 0; i < 2; i++) {
        let trap = document.createElement('div');
        trap.className = 'trap';
        trap.style.left = Math.floor(Math.random() * 380) + 'px';
        trap.style.top = Math.floor(Math.random() * 280) + 'px';
        map.appendChild(trap);
        // Добавляем ловушку в массив
        traps.push(trap);
    }
}

// Функция обновления информации о игре
function updateGameInfo() {
    // Обновление текущего времени
    let currentTime = new Date();
    currentTimeDisplay.textContent = currentTime.toLocaleTimeString();
    // Обновление времени игры
    let currentTimeStamp = Math.floor(currentTime.getTime() / 1000);
    let gameStartTimeStamp = Math.floor(startTime / 1000);
    let elapsedTime = currentTimeStamp - gameStartTimeStamp;
    gameTimeDisplay.textContent = elapsedTime;
}

// Функция для перемещения монстров
function moveMonsters() {
    // Обновляем позиции каждого монстра
    for (let i = 0; i < monsters.length; i++) {
        let monster = monsters[i];
        // Здесь можно добавить логику для перемещения монстра
        // Например, можно использовать случайное смещение
        monster.style.left = parseInt(monster.style.left) + Math.floor(Math.random() * 5 - 2) + 'px';
        monster.style.top = parseInt(monster.style.top) + Math.floor(Math.random() * 5 - 2) + 'px';
    }
}

// Функция обновления игры
function updateGame() {
    movePlayer();
    moveMonsters(); // Добавляем перемещение монстров
    checkCollisions();
}

// Функция приостановки игры
function pauseGame() {
    // Приостановка игры при нажатии кнопки ESC
    // ...
}

// Функция завершения игры
function endGame() {
    // Завершение игры и отображение результатов
    // ...
    gameScreen.style.display = 'none';
    resultScreen.style.display = 'block';
}

// Функция перезапуска игры
function restartGame() {
    // Перезапуск игры при нажатии кнопки "Играть сначала"
    // ...
    resultScreen.style.display = 'none';
    loginScreen.style.display = 'block';
}

// Функция обработки столкновения с монстром
function handleMonsterCollision() {
    // Обработка столкновения с монстром
    // Уменьшение количества жизней и обновление параметров на экране
    let lives = document.getElementById('lives');
    lives.textContent = parseInt(lives.textContent) - 1;
}



let player = createPlayer();

function moveCharacter(character, dx, dy, map) {
    const currentPosition = {
        x: parseFloat(character.style.left) || 0,
        y: parseFloat(character.style.top) || 0
    };
    const newPosition = {
        x: Math.max(0, Math.min(currentPosition.x + dx, map.offsetWidth - character.offsetWidth)),
        y: Math.max(0, Math.min(currentPosition.y + dy, map.offsetHeight - character.offsetHeight))
    };
    character.style.left = newPosition.x + 'px';
    character.style.top = newPosition.y + 'px';
}

// В функции movePlayer
function startGame() {
    let playerName = playerNameInput.value;
    playerNameDisplay.textContent = playerName;
    loginScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    // Здесь передаем объект map в функцию moveCharacter
    moveCharacter(player, 0, 0, map); // Обнуляем dx и dy, а map передаем
    player = createPlayer(); 
    createMonsters();
    createTraps();
    createMap();
}

// В обработчике событий
document.addEventListener('keydown', (event) => {
    const key = event.key;
    const step = 10;

    switch (key) {
        case 'ArrowUp':
            moveCharacter(player, 0, -step, map); // Передаем map
            break;
        case 'ArrowDown':
            moveCharacter(player, 0, step, map); // Передаем map
            break;
        case 'ArrowLeft':
            moveCharacter(player, -step, 0, map); // Передаем map
            break;
        case 'ArrowRight':
            moveCharacter(player, step, 0, map); // Передаем map
            break;
        default:
            break;
    }
});



// Функция проверки столкновения игрока с объектом
function isColliding(x, y, element) {
    // Проверка столкновения игрока с элементом на карте
    let rect = element.getBoundingClientRect();
    return (
        x < rect.right &&
        x + 20 > rect.left &&
        y < rect.bottom &&
        y + 20 > rect.top
    );
}
