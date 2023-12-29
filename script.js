function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const GameStep = { FIRST_CHOSE: 1, SECOND_CHOSE: 2, GAME_RESULT: 3 };

class Game {
    constructor() {
        this.init_game()
        this.init_html()
    }

    init_doors_html(){
        for (const element of document.querySelectorAll(".door")) {
            element.setAttribute("data-game_door", "no-choose")
        }
        document.querySelector(".info").innerHTML = '<div class="info_text">Выберите дверь!</div>'
    }
    init_stats_html(){
        document.querySelector(".stats__total-games").textContent = localStorage.getItem("total_games") - 0
        document.querySelector(".stats__change_door-win").textContent = localStorage.getItem("change_win") - 0
        document.querySelector(".stats__change_door-lose").textContent = localStorage.getItem("change_lose") - 0
        document.querySelector(".stats__not_change_door-win").textContent = localStorage.getItem("not_change_win") - 0
        document.querySelector(".stats__not_change_door-lose").textContent = localStorage.getItem("not_change_lose") - 0
    }
    init_html(){
        this.init_stats_html()
        this.init_doors_html()
    }

    init_game(){
        this.game_step = GameStep.FIRST_CHOSE;
        this.win_door = randomIntFromInterval(1, 3)
        this.lose_doors = []
        for (let i=1; i<=3; i++){
            if (i !== this.win_door) this.lose_doors.push(i)
        }
        this.first_door_number = null
        console.log("Выиграшная дверь:", this.win_door)
        console.log("Проишрышные двери:", this.lose_doors.join(", "))
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
            document.querySelector(".info").innerHTML = '<div class="info_text">Изменить выбор?</div>'

            this.game_step = GameStep.SECOND_CHOSE
            return
        }

        if (this.game_step === GameStep.SECOND_CHOSE) {
            if (door.getAttribute("data-game_door") === "open-lose") return;

            for (const element of document.querySelectorAll(".door")) {
                if (element.getAttribute('data-door-number')-0 === this.win_door) {
                    element.setAttribute("data-game_door", "open-win")
                } else {
                    element.setAttribute("data-game_door", "open-lose")
                }
            }

            let final_door_number = door.getAttribute("data-door-number") - 0

            if (door.getAttribute("data-door-number")-0 === this.win_door) {
                if (this.first_door_number === final_door_number) {
                    document.querySelector(".info").innerHTML = '<div class="info_text info_text-win">Вы не поменяли дверь и ВЫИГРАЛИ🚗</div>'
                    localStorage.setItem("not_change_win", localStorage.getItem("not_change_win")-0+1)
                } else {
                    document.querySelector(".info").innerHTML = '<div class="info_text info_text-win">Вы поменяли дверь и ВЫИГРАЛИ🚗</div>'
                    localStorage.setItem("change_win", localStorage.getItem("change_win")-0+1)
                }
            } else {
                if (this.first_door_number === final_door_number) {
                    document.querySelector(".info").innerHTML = '<div class="info_text info_text-lose">Вы не поменяли дверь и ПРОИГРАЛИ!</div>'
                    localStorage.setItem("not_change_lose", localStorage.getItem("not_change_lose")-0+1)
                } else {
                    document.querySelector(".info").innerHTML = '<div class="info_text info_text-lose">Вы поменяли дверь и ПРОИГРАЛИ!</div>'
                    localStorage.setItem("change_lose", localStorage.getItem("change_lose")-0+1)
                }
            }

            localStorage.setItem("total_games", localStorage.getItem("total_games")-0+1)
            this.game_step = GameStep.GAME_RESULT
            this.init_stats_html()
            return;
        }

        if (this.game_step === GameStep.GAME_RESULT) {
            this.init_html()
            this.init_game()
            this.game_step = GameStep.FIRST_CHOSE
        }
    }
}

let game = new Game()

for (const element of document.querySelectorAll(".door")) {
    element.addEventListener('click', function () {
        game.door_event(this)
    })
}