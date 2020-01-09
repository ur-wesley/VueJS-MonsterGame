new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true
            this.playerHealth = 100
            this.monsterHealth = 100
            this.turns = []
        },
        attack: function () {
            var dmg = this.calculateDmg(3, 10)
            this.monsterHealth -= dmg
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + dmg
            })
            if (this.checkIfWin()) {
                return
            }
            this.monsterDmg(3, 10)
        },
        specialAttack: function () {
            var dmg = this.calculateDmg(10, 20)
            this.monsterHealth -= dmg

            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster hard for ' + dmg
            })

            if (this.checkIfWin()) {
                return
            }
            this.monsterDmg(5, 15)
        },
        healUp: function () {
            if (this.playerHealth <= 93) {
                this.playerHealth += 7
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Player heals for 7'
                })
            } else {
                this.playerHealth = 100
            }
            this.monsterDmg(3, 10)
        },
        giveUp: function () {
            this.gameIsRunning = false
        },
        calculateDmg: (min, max) => {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkIfWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New game?')) {
                    this.startGame()
                } else {
                    this.monsterHealth = 0
                    this.gameIsRunning = false
                }
                return true
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New game?')) {
                    this.startGame()
                } else {
                    this.playerHealth = 0
                    this.gameIsRunning = false
                }
                return false
            }
            return false
        },
        monsterDmg: function (min, max) {
            var dmg = this.calculateDmg(min, max)
            this.playerHealth -= dmg
            this.checkIfWin()
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + dmg
            })
        },
        // animate: function() {
        //     console.log("Here");
        //     anime({
        //         targets: '.healthbar',
        //         duration: 1500,
        //         // easing: 'easeInSine',
        //         elasticity: 400,
        //         width: this.width
        //     })
    }
})