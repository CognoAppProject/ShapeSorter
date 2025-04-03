// script.js
let score = 0;
let currentLevel = 1;

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

    levels[currentLevel].shapes.forEach(shape => {
        const shapeDiv = document.createElement('div');
        shapeDiv.id = shape;
        shapeDiv.className = `shape ${shape}`;
        shapeDiv.draggable = true;
        shapeDiv.addEventListener('dragstart', dragStart);
        shapesContainer.appendChild(shapeDiv);
    });

    levels[currentLevel].slots.forEach(slot => {
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

document.addEventListener('DOMContentLoaded', () => {
    setupGame();
});

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
    const draggableElement = document.getElementById(id);
    const dropZone = e.target;
    const isCorrectMatch = id === dropZone.id.replace('-slot', '');

    if (isCorrectMatch && !dropZone.hasChildNodes()) {
        dropZone.appendChild(draggableElement);
        draggableElement.setAttribute('draggable', 'false');
        score += 10;
        updateScore();
        checkLevelCompletion();
    } else {
        alert('Oops! Try again.');
    }
}
// script.js

// Function to show a toast message
function showToast(message, isSuccess = true) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
    toast.style.backgroundColor = isSuccess ? '#4CAF50' : '#F44336'; // Green for success, Red for failure
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 2000); // Remove toast after 2 seconds
}

function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    const dropZone = e.target;
    const isCorrectMatch = id === dropZone.id.replace('-slot', '');

    if (isCorrectMatch && !dropZone.hasChildNodes()) {
        dropZone.appendChild(draggableElement);
        draggableElement.setAttribute('draggable', 'false');
        score += 10;
        updateScore();
        checkLevelCompletion();
    } else {
        showToast('Oops! Try again.', false); // Show failure toast message
    }
}

function updateScore() {
    document.getElementById('score').innerText = 'Score: ' + score;
}

function checkLevelCompletion() {
    const allPlaced = Array.from(document.querySelectorAll('.slot')).every(
        slot => slot.hasChildNodes()
    );
    if (allPlaced) {
        if (levels[currentLevel + 1]) {
            currentLevel++;
            showCompletionToast(`Level ${currentLevel} completed!`);
            setupGame();
        } else {
            showCompletionToast('Congratulations! You have completed all levels!');
        }
    }
}

function showCompletionToast(message) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 2000); // Remove toast after 2 seconds
}



function newGame() {
    currentLevel = 1;
    score = 0;
    updateScore();
    setupGame();
}
// Instruction Modal Functions
function openInstructions() {
    document.getElementById('instructionModal').style.display = 'flex';
}

function closeInstructions() {
    document.getElementById('instructionModal').style.display = 'none';
}