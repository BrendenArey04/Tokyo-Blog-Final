lementById("q3").value.toLowerCase() === "sushi") score++;
function checkAnswers() {
let score = 0;


if (document.getElementById("q1").value.toLowerCase() === "shibuya crossing") score++;
if (document.getElementById("q2").value.toLowerCase() === "japan") score++;
if (document.getE
document.getElementById("results").textContent = "You scored: " + score + "/3";
}
