// quiz.js - handles grading the Tokyo quiz

document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submitBtn");
  const resetBtn = document.getElementById("resetBtn");

  if (submitBtn) {
    submitBtn.addEventListener("click", gradeQuiz);
  }
  if (resetBtn) {
    resetBtn.addEventListener("click", clearFeedback);
  }

  function gradeQuiz() {
    let score = 0;
    const total = 5;

    // Correct answers
    const answers = {
      q1: "shibuya",
      q2: "Akihabara",
      q3: "Sushi",
      q4: "Tokyo Tower",
      q5: ["Tea Ceremony", "Anime Shopping", "Cherry Blossoms"]
    };

    // Question 1 (text input)
    const q1Input = document.getElementById("q1");
    const q1Value = q1Input ? q1Input.value.trim().toLowerCase() : "";

    if (q1Value === answers.q1) {
      score++;
      setFeedback("f1", "Correct!", true);
    } else {
      setFeedback("f1", "Incorrect — Answer: Shibuya", false);
    }

    // Question 2 (radio)
    const q2Value = getRadioValue("q2");
    if (q2Value === answers.q2) {
      score++;
      setFeedback("f2", "Correct!", true);
    } else {
      setFeedback("f2", "Incorrect — Answer: Akihabara", false);
    }

    // Question 3 (radio)
    const q3Value = getRadioValue("q3");
    if (q3Value === answers.q3) {
      score++;
      setFeedback("f3", "Correct!", true);
    } else {
      setFeedback("f3", "Incorrect — Answer: Sushi", false);
    }

    // Question 4 (radio)
    const q4Value = getRadioValue("q4");
    if (q4Value === answers.q4) {
      score++;
      setFeedback("f4", "Correct!", true);
    } else {
      setFeedback("f4", "Incorrect — Answer: Tokyo Tower", false);
    }

    // Question 5 (checkboxes)
    const q5Values = getCheckedValues("q5");
    const q5Correct = arraysEqual(q5Values, answers.q5);

    if (q5Correct) {
      score++;
      setFeedback("f5", "Correct!", true);
    } else {
      setFeedback(
        "f5",
        "Incorrect — Correct: Tea Ceremony, Anime Shopping, Cherry Blossoms",
        false
      );
    }

    // Show results
    const results = document.getElementById("results");
    if (results) {
      const pass = score >= 3 ? "PASS" : "FAIL";
      results.innerHTML = `
        <h3>Your Results</h3>
        <p><strong>Score:</strong> ${score}/${total}</p>
        <p><strong>Result:</strong> 
          <span class="${pass === "PASS" ? "pass" : "fail"}">${pass}</span>
        </p>
      `;
    }
  }

  function getRadioValue(name) {
    const selected = document.querySelector(`input[name="${name}"]:checked`);
    return selected ? selected.value : "";
  }

  function getCheckedValues(name) {
    const boxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    return Array.from(boxes).map(b => b.value);
  }

  function arraysEqual(a, b) {
    if (!a || !b || a.length !== b.length) return false;
    const aa = [...a].sort();
    const bb = [...b].sort();
    return aa.toString() === bb.toString();
  }

  function setFeedback(id, message, correct) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerText = message;
    el.style.color = correct ? "green" : "red";
  }

  function clearFeedback() {
    ["f1", "f2", "f3", "f4", "f5", "results"].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.innerText = "";
        el.innerHTML = "";
        el.style.color = "";
      }
    });
  }
});
