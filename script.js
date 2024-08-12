document.addEventListener("DOMContentLoaded", function () {
    const voteAButton = document.getElementById("voteA");
    const voteBButton = document.getElementById("voteB");

    const voteData = {
        A: 0,
        B: 0
    };

    function updateChart() {
        voteChart.data.datasets[0].data = [voteData.A, voteData.B];
        voteChart.update();
    }

    function checkVote() {
        return localStorage.getItem("hasVoted") === "true";
    }

    function registerVote(option) {
        if (checkVote()) {
            alert("You have already voted!");
            return;
        }
        voteData[option]++;
        localStorage.setItem("hasVoted", "true");
        updateChart();
    }

    voteAButton.addEventListener("click", () => registerVote("A"));
    voteBButton.addEventListener("click", () => registerVote("B"));

    const ctx = document.getElementById('voteChart').getContext('2d');
    const voteChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['A', 'B'],
            datasets: [{
                label: '# of Votes',
                data: [voteData.A, voteData.B],
                backgroundColor: ['#007bff', '#dc3545'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
