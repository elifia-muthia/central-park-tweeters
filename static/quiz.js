function setDifficulty(difficulty) {
    // Remove selected-difficulty class from all buttons
    document.getElementById('easy-btn').classList.remove('selected-difficulty');
    document.getElementById('hard-btn').classList.remove('selected-difficulty');

    // Add selected-difficulty class to the selected button
    if (difficulty === 'easy') {
        document.getElementById('easy-btn').classList.add('selected-difficulty');
    } else if (difficulty === 'hard') {
        document.getElementById('hard-btn').classList.add('selected-difficulty');
    }

    // Example: redirect or update content based on selection
    // window.location.href = `/quiz/${difficulty}`;
}