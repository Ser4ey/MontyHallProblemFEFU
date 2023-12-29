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
        document.querySelector(".info_text").textContent = "Выберите дверь!"
    }

    init_game(){
        this.game_step = GameStep.FIRST_CHOSE;
        this.win_door = randomIntFromInterval(1, 3)
        this.lose_doors = []
        for (let i=1; i<=3; i++){
            if (i !== this.win_door) this.lose_doors.push(i)
        }
        this.first_door_number = null
        console.log(this.win_door)
        console.log(this.lose_doors)
    }

    door_event(door){
        if (this.game_step === GameStep.FIRST_CHOSE) {
            this.first_door_number = door.getAttribute("data-door-number") - 0
            door.setAttribute("data-game_door", "choose")

            let open_door_number_index = randomIntFromInterval(0, 1)

            let open_door_number;
            if (this.lose_doors[open_door_number_index] === this.first_door_number) {
                open_door_number = this.lose_doors[1 - open_door_number_index] - 0
            } else {
                open_door_number = this.lose_doors[open_door_number_index] - 0
            }
            document.querySelectorAll(".door")[open_door_number-1].setAttribute("data-game_door", "open-lose")
            document.querySelector(".info_text").textContent = "Изменить выбор?"


            this.game_step = GameStep.SECOND_CHOSE
        }
        // door.addEventListener()
    }
}

let game = new Game()

for (const element of document.querySelectorAll(".door")) {
    element.addEventListener('click', function () {
        game.door_event(this)
        let door_status = element.getAttribute("data-game_door")
        console.log(door_status, element)

    })
}