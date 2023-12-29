function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const GameStep = { FIRST_CHOSE: 1, SECOND_CHOSE: 2, GAME_RESULT: 3 };


class Game {
    constructor() {
        this.init_game()
        this.init_html()
    }

    init_html(){
        for (const element of document.querySelectorAll(".door")) {
            element.setAttribute("data-game_door", "no-choose")
        }
        document.querySelector(".stats__total-games").textContent = localStorage.getItem("total_games") - 0
        document.querySelector(".stats__change_door-win").textContent = localStorage.getItem("change_win") - 0
        document.querySelector(".stats__change_door-lose").textContent = localStorage.getItem("change_lose") - 0
        document.querySelector(".stats__not_change_door-win").textContent = localStorage.getItem("not_change_win") - 0
        document.querySelector(".stats__not_change_door-lose").textContent = localStorage.getItem("not_change_lose") - 0
    }

    init_game(){
        this.game_step = GameStep.FIRST_CHOSE;
        this.win_door = randomIntFromInterval(1, 3)
        this.lose_doors = []
        for (let i=1; i<=3; i++){
            if (i !== this.win_door) this.lose_doors.push(i)
        }
        console.log(this.win_door)
        console.log(this.lose_doors)
    }
}

let game = new Game()

for (const element of document.querySelectorAll(".door")) {
    element.addEventListener('click', function () {
        let door_status = element.getAttribute("data-game_door")
        console.log(door_status, element)

    })
}