let score = 0;
let currentLevel = 1;
let startTime;
let endTime;

const levels = {
    1: { shapes: ['circle', 'square', 'triangle'], slots: ['circle', 'square', 'triangle'] },
    2: { shapes: ['rectangle', 'star'], slots: ['rectangle', 'star'] },
    3: { shapes: ['pentagon', 'hexagon'], slots: ['pentagon', 'hexagon'] },
    4: { shapes: ['octagon', 'heart'], slots: ['octagon', 'heart'] },
    5: { shapes: ['diamond', 'parallelogram'], slots: ['diamond', 'parallelogram'] }
};

function setupGame() {
    const shapesContainer = document.querySelector('.shapes');
    const slotsContainer = document.querySelector('.slots');
    shapesContainer.innerHTML = '';
    slotsContainer.innerHTML = '';

    const currentShapes = levels[currentLevel].shapes;
    const currentSlots = levels[currentLevel].slots;

    currentShapes.forEach(shape => {
        const shapeDiv = document.createElement('div');
        shapeDiv.id = shape;
        shapeDiv.className = `shape ${shape}`;
        shapeDiv.draggable = true;
        shapeDiv.addEventListener('dragstart', dragStart);
        shapesContainer.appendChild(shapeDiv);
    });

    currentSlots.forEach(slot => {
        const slotDiv = document.createElement('div');
        slotDiv.id = `${slot}-slot`;
        slotDiv.className = `slot ${slot}`;
        slotDiv.addEventListener('dragover', dragOver);
        slotDiv.addEventListener('dragenter', dragEnter);
        slotDiv.addEventListener('dragleave', dragLeave);
        slotDiv.addEventListener('drop', drop);
        slotsContainer.appendChild(slotDiv);
    });
}

function dragStart(e) {
    e.dataTransfer.setData('text', e.target.id);
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    const dropZone = e.target;

    const isCorrectMatch = id === dropZone.id.replace('-slot', '');
    if (isCorrectMatch) {
        dropZone.innerHTML = '';
        dropZone.appendChild(document.getElementById(id));
        score += 2;
        checkLevelComplete();
    }
}

function checkLevelComplete() {
    const allSlots = document.querySelectorAll('.slots .slot');
    const allFilled = Array.from(allSlots).every(slot => slot.children.length > 0);

    if (allFilled) {
        currentLevel++;
        if (currentLevel > Object.keys(levels).length) {
            endTime = new Date();
            showCongrats();
        } else {
            setupGame();
        }
    }
}

function newGame() {
    document.getElementById('congratsModal').style.display = 'none';
    score = 0;
    currentLevel = 1;
    startTime = new Date();
    setupGame();
}

function showCongrats() {
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    document.getElementById('finalScore').innerText = `Score: ${score}`;
    document.getElementById('finalTime').innerText = `Time Taken: ${timeTaken} seconds`;
    document.getElementById('congratsModal').style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', () => {
    startTime = new Date();
    setupGame();
});

function closeInstructionModal() {
    document.getElementById('instructionModal').style.display = 'none';
}
