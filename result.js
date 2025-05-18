document.addEventListener("DOMContentLoaded", () => {
    const finalResultEl = document.getElementById("final-result-text");
    const okBtn = document.getElementById("ok-btn");

    // Retrieve final result correctly from localStorage
    let finalResult;
    const userScore = localStorage.getItem("userScore");
    const computerScore = localStorage.getItem("computerScore");
      // Determine winner
        if (userScore > computerScore) {
            finalResult = " Congratulation!! You have won the match.";
        } else if (computerScore > userScore) {
            finalResult = " Sorry, this match did not go in your favor. ";
        } else {
            finalResult = " Unfortunately, the match concluded in a draw.";
        }

    finalResultEl.textContent = finalResult ? `Game Over! ${finalResult}` : "Game Over!";

    // Reset scores when exiting (optional)
    localStorage.removeItem("userScore");
    localStorage.removeItem("computerScore");
    localStorage.removeItem("tieScore");

    // Redirect to home when "OK" is clicked
    okBtn.addEventListener("click", () => {
        localStorage.removeItem("finalResult"); // Clear stored result
        window.location.href = "structure.html"; // Redirect to main page
    });
});
