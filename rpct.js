const choices = document.querySelectorAll(".choice");
const userScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const tieScoreEl = document.getElementById("tie-score");
const userChoiceImgEl = document.getElementById("user-choice-img");
const computerChoiceImgEl = document.getElementById("computer-choice-img");
const resultEl = document.getElementById("result");
const exitButton = document.getElementById("exit-btn");

// Ask user for number of rounds
//let totalRounds = parseInt(localStorage.getItem("totalRounds"), 10) || 5;
if (!localStorage.getItem("totalRounds")) {
    localStorage.setItem("totalRounds", prompt("Enter the number of rounds you want to play: ") || 5);
}

let totalRounds = parseInt(localStorage.getItem("totalRounds"), 10);


// Validate input
if (isNaN(totalRounds) || totalRounds <= 0) {
    totalRounds = 5; // Default to 5 rounds if invalid input
}

choices.forEach(choice => {
    choice.addEventListener("click", function() {
        console.log(`Clicked: ${this.id}`);
        playGame(this);
    });
});

console.log("Choices selected:", choices);

// Initialize scores
let userScore = 0;
let computerScore = 0;
let tieScore = 0;
let currentRound = 0;

// Update rounds left display
document.getElementById("rounds-left").textContent = totalRounds;

// Function to get a random computer choice
function getComputerChoice() {
    const options = ["rock", "paper", "scissor"];
    return options[Math.floor(Math.random() * options.length)];
}

// Function to determine the winner and update scores
function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        tieScore++;
        return "It's a tie!";
    } else if (
        (userChoice === "rock" && computerChoice === "scissor") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissor" && computerChoice === "paper")
    ) {
        userScore++;
        return `You win! Your ${userChoice} beats ${computerChoice}`;
    } else {
        computerScore++;
        return `You lost! ${computerChoice} beats your ${userChoice}`;
    }
}

// Function to play the game for `n` rounds
function playGame(userChoiceElement) {
    if (currentRound >= totalRounds) return; // Stop if max rounds reached

    const userChoice = userChoiceElement.id;
    const computerChoice = getComputerChoice();

    // Update images based on choices
    userChoiceImgEl.src = `./pictures/${userChoice}.png`;
    computerChoiceImgEl.src = `./pictures/${computerChoice}.png`;

    // Apply shake effect
    userChoiceElement.classList.add("shake");

    setTimeout(() => {
        userChoiceElement.classList.remove("shake");

        // Determine winner & update scores
        const resultText = determineWinner(userChoice, computerChoice);
        resultEl.textContent = `Result: ${resultText}`;

        // Apply color based on outcome
        resultEl.style.color = resultText.includes("You win") ? "green" :
                              resultText.includes("You lost") ? "red" : "white";

        // Update scoreboard
        userScoreEl.textContent = userScore;
        computerScoreEl.textContent = computerScore;
        tieScoreEl.textContent = tieScore;
        document.getElementById("rounds-left").textContent = totalRounds - (currentRound + 1);

        currentRound++; // Increment round count

        // If all rounds completed, declare winner & redirect
        if (currentRound >= totalRounds) {
            setTimeout(() => {
                let finalResult;
                if (userScore > computerScore) {
                    finalResult = "🎉 You WIN the match!";
                } else if (computerScore > userScore) {
                    finalResult = "😔 You LOST the match!";
                } else {
                    finalResult = "🤝 It's a TIE!";
                }
                alert(`Game Over! ${finalResult}`);
            }, 1000);
        }

    }, 500);
}

// Attach event listeners to choices for fixed rounds gameplay
choices.forEach(choice => {
    choice.addEventListener("click", () => playGame(choice));
});

// Exit button functionality
exitButton.addEventListener("click", () => {
    window.location.href = "structure.html"; // Manual exit
});
