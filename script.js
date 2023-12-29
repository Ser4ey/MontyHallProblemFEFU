function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const GameStep = { FIRST_CHOSE: 1, SECOND_CHOSE: 2, GAME_RESULT: 3 };


class Game {
    constructor() {
        this.init_game()
    }

    init_html(){

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

let doors = document.querySelectorAll(".door")
for (const element of doors) {
    element.addEventListener('click', function () {
        let door_status = element.getAttribute("data-game_door")
        console.log(door_status, element)

    })
}