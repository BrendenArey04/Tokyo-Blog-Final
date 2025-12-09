// External quiz logic (quiz.js)
// This file handles grading the quiz and showing per-question feedback.
// Defensively coded to work on mobile and desktop.

document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.getElementById('submitBtn');
  const resetBtn = document.getElementById('resetBtn');

  submitBtn.addEventListener('click', gradeQuiz);
  resetBtn.addEventListener('click', clearFeedback);

  function gradeQuiz() {
    let score = 0;
    const total = 5;

    // correct answers
    const answers = {
      q1: 'shibuya',
      q2: 'Akihabara',
      q3: 'Sushi',
      q4: 'Tokyo Tower',
      q5: ['Tea Ceremony', 'Anime Shopping', 'Cherry Blossoms']
    };

    // Q1
    const q1 = (document.getElementById('q1').value || '').trim().toLowerCase();
    if (q1 === answers.q1) {
      score++; setFeedback('f1', 'Correct!', true);
    } else {
      setFeedback('f1', 'Incorrect — Answer: Shibuya', false);
    }

    // Q2
    const q2 = (document.querySelector("input[name='q2']:checked') || {}).value;
    const q2el = document.querySelector("input[name='q2']:checked");
    const q2val = q2el ? q2el.value : '';
    if (q2val === answers.q2) {
      score++; setFeedback('f2', 'Correct!', true);
    } else {
      setFeedback('f2', 'Incorrect — Answer: Akihabara', false);
    }

    // Q3
    const q3el = document.querySelector("input[name='q3']:checked");
    const q3val = q3el ? q3el.value : '';
    if (q3val === answers.q3) {
      score++; setFeedback('f3', 'Correct!', true);
    } else {
      setFeedback('f3', 'Incorrect — Answer: Sushi', false);
    }

    // Q4
    const q4el = document.querySelector("input[name='q4']:checked");
    const q4val = q4el ? q4el.value : '';
    if (q4val === answers.q4) {
      score++; setFeedback('f4', 'Correct!', true);
    } else {
      setFeedback('f4', 'Incorrect — Answer: Tokyo Tower', false);
    }

    // Q5
    const q5vals = Array.from(document.querySelectorAll("input[name='q5']:checked")).map(i => i.value);
    const q5Correct = arraysEqual(q5vals, answers.q5);
    if (q5Correct) {
      score++; setFeedback('f5', 'Correct!', true);
    } else {
      setFeedback('f5', 'Incorrect — Correct: Tea Ceremony, Anime Shopping, Cherry Blossoms', false);
    }

    const results = document.getElementById('results');
    const pass = score >= 3 ? 'PASS' : 'FAIL';
    results.innerHTML = `<h3>Your Results</h3>
      <p><strong>Score:</strong> ${score}/${total}</p>
      <p><strong>Result:</strong> <span class="${pass==='PASS' ? 'pass' : 'fail'}">${pass}</span></p>`;
  }

  function setFeedback(id, message, correct) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = message;
    el.style.color = correct ? 'green' : 'red';
  }

  function clearFeedback() {
    ['f1','f2','f3','f4','f5','results'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.textContent = '';
        el.style.color = '';
      }
    });
  }

  function arraysEqual(a,b) {
    if (!a || !b) return false;
    if (a.length !== b.length) return false;
    const aa = [...a].sort();
    const bb = [...b].sort();
    return aa.toString() === bb.toString();
  }
});
