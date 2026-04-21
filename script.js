const quizData = {
    score: 0,
    currentQ: 0,
    questions: [
        // 25 Multiple Choice
        { type: 'mc', q: 'What is the capital of France?', options: ['London', 'Paris', 'Berlin', 'Madrid'], answer: 1 },
        { type: 'mc', q: '2 + 2 = ?', options: ['3', '4', '5', '6'], answer: 1 },
        { type: 'mc', q: 'What color is the sky?', options: ['Red', 'Green', 'Blue', 'Yellow'], answer: 2 },
        // ADD MORE MC HERE (total 25)
        { type: 'mc', q: 'Sample Question 4?', options: ['A', 'B', 'C', 'D'], answer: 0 },
        { type: 'mc', q: 'Sample Question 5?', options: ['A', 'B', 'C', 'D'], answer: 1 },
        // ... add 20 more MC

        // 20 Fill in the Blank
        { type: 'fill', q: 'The sun rises in the ______.', answer: 'east' },
        { type: 'fill', q: 'A dog says ______.', answer: 'woof' },
        // ADD MORE FILL HERE (total 20)

        // 5 Essay
        { type: 'essay', q: 'Tell me about your favorite animal. Why do you like it?' },
        { type: 'essay', q: 'What did you do last weekend?' },
        // ADD MORE ESSAY HERE (total 5)
    ]
};

function renderQuestion() {
    const q = quizData.questions[quizData.currentQ];
    const container = document.getElementById('quiz-container');
    document.getElementById('q-num').textContent = quizData.currentQ + 1;

    let html = `<div class="card visible"><div class="question">${q.q}</div>`;

    if (q.type === 'mc') {
        html += `<div class="options">`;
        q.options.forEach((opt, i) => {
            html += `<div class="option" onclick="selectMC(this, ${i})">${opt}</div>`;
        });
        html += `</div><button class="next-btn" id="nextBtn" onclick="nextQ()" disabled>Next ➡️</button></div>`;
    } else if (q.type === 'fill') {
        html += `<div class="fill-blank"><input type="text" id="fillInput" placeholder="Type your answer..." onkeypress="if(event.key==='Enter')checkFill()"></div>`;
        html += `<button class="next-btn" onclick="checkFill()">Check ✅</button>`;
    } else if (q.type === 'essay') {
        html += `<div class="essay"><textarea id="essayInput" placeholder="Write your answer here..."></textarea></div>`;
        html += `<button class="next-btn" onclick="nextQ()">Next ➡️</button>`;
    }

    html += `</div>`;
    container.innerHTML = html;
}

function selectMC(el, idx) {
    const q = quizData.questions[quizData.currentQ];
    document.querySelectorAll('.option').forEach(o => o.style.pointerEvents = 'none');
    if (idx === q.answer) {
        el.classList.add('correct');
        quizData.score += 2; // 2 points per MC
        document.getElementById('score').textContent = quizData.score;
    } else {
        el.classList.add('wrong');
        document.querySelectorAll('.option')[q.answer].classList.add('correct');
    }
    document.getElementById('nextBtn').disabled = false;
}

function checkFill() {
    const input = document.getElementById('fillInput');
    const q = quizData.questions[quizData.currentQ];
    const userAns = input.value.trim().toLowerCase();
    const correct = q.answer.toLowerCase();
    if (userAns === correct) {
        quizData.score += 2; // 2 points per fill
        document.getElementById('score').textContent = quizData.score;
        input.style.borderColor = '#4caf50';
    } else {
        input.style.borderColor = '#f44336';
    }
    setTimeout(nextQ, 1000);
}

function nextQ() {
    quizData.currentQ++;
    if (quizData.currentQ < quizData.questions.length) {
        renderQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quiz-container').innerHTML = '';
    const results = document.getElementById('results');
    results.classList.remove('hidden');
    results.classList.add('visible');
    document.getElementById('final-score').textContent = quizData.score;
    const grade = quizData.score >= 80 ? '🌟 Excellent!' : quizData.score >= 60 ? '👍 Good Job!' : '💪 Keep Practicing!';
    document.getElementById('grade').innerHTML = `<p style="font-size:1.5em">${grade}</p>`;
}

function restartQuiz() {
    quizData.score = 0;
    quizData.currentQ = 0;
    document.getElementById('score').textContent = 0;
    document.getElementById('results').classList.add('hidden');
    document.getElementById('results').classList.remove('visible');
    renderQuestion();
}

// Init
renderQuestion();
