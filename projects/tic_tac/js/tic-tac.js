/*
NOTES 7/20/16
1.Fixed tied game bug
2. Create a instruciton tooltip / box
3. Improve code for computer Easy, Med, Hard level
*/

//Welcome Message
console.log("%cCreated by Andrew Serrano", "color: #13a7e0; font-size: 12px; font-family: sans-serif;")

var ticTacGame = {
    index: 0,
    el: Array.prototype.slice.call(document.querySelectorAll(".tic__block")),
    user: {
        isTurn: true,
        value: "x",
        onClick: false,
    },
    computer: {
        isTurn: false,
        value: "o"
    },
    gameStatus: {
        isLive: true,
        tied: false
    },
    coordinates: {
        hash1: {
            "0,2": 0,
            "0,1": 1,
            "0,0": 2
        },
        hash2: {
            "0,2": 0,
            "1,2": 1,
            "2,2": 2
        },
        hash3: {
            "2,2": 0,
            "2,1": 1,
            "2,0": 2
        },
        hash4: {
            "0,0": 0,
            "1,0": 1,
            "2,0": 2
        },
        hash5: {
            "2,2": 0,
            "1,1": 1,
            "0,0": 2
        },
        hash6: {
            "0,2": 0,
            "1,1": 1,
            "2,0": 2
        },
        hash7: {
            "0,1": 0,
            "1,1": 1,
            "2,1": 2
        },
        hash8: {
            "1,2": 0,
            "1,1": 1,
            "1,0": 2
        },
        hash1C: {
            "0,2": 0,
            "0,1": 1,
            "0,0": 2
        },
        hash2C: {
            "0,2": 0,
            "1,2": 1,
            "2,2": 2
        },
        hash3C: {
            "2,2": 0,
            "2,1": 1,
            "2,0": 2
        },
        hash4C: {
            "0,0": 0,
            "1,0": 1,
            "2,0": 2
        },
        hash5C: {
            "2,2": 0,
            "1,1": 1,
            "0,0": 2
        },
        hash6C: {
            "0,2": 0,
            "1,1": 1,
            "2,0": 2
        },
        hash7C: {
            "0,1": 0,
            "1,1": 1,
            "2,1": 2
        },
        hash8C: {
            "1,2": 0,
            "1,1": 1,
            "1,0": 2
        }
    },
    ticElement: function ticElement(x, y, el, index) {
        this.coord = [parseInt(x), parseInt(y)];
        this.el = el;
        this.index = index;
    },
    onClick: function(event) {
        // Object Keys Global Variables
        var a = document.getElementsByClassName('status__overlay')[0],
            el = event.target,
            newArr = [],
            elClass = el.attributes["class"].value;

        //Determine turn
        if (this.user.isTurn === true) {
            this.user.isTurn = false;
            this.computer.isTurn = true;
        }

        //Determine the elements that havent been selected for tied game status
        for (var i = 0, l = this.el.length; i < l; i++) {
            if (this.el[i].attributes["data-value"].value !== "o" && this.el[i].attributes["data-value"].value !== "x" && this.el[i].attributes["data-value"].value === "") {
                newArr.push(this.el[i]);
            }
        }

        //For user add Active class and X value
        if (elClass.match("tic__block-bounce") === null && (!el.attributes["data-value"].value === true)) {
            el.classList.add("tic__block-bounce");
            el.setAttribute('data-value', 'x');

            // Conditional to check if the game is Tied
            if (newArr.length <= 1) {
                
                //Computer turn function will fire but wont execute because false
                this.computer.isTurn = false;

                //Tied game is true
                this.gameStatus.tied = true;
            }

            //Set User Cords
            this.setCoords(false, el);

            //Generate Computer's Turn
            this.computerTurn();
        }
    },
    setCoords: function(elComp, el) {
        //Object Key General Variables
        var matchingCoord = [],
            x, y;

        //Determine if the computer/user needs to determine the blocks coordinates
        if (elComp) {
            var coord = el.attributes["data-coord"].value.split(',');
        } else {
            var coord = el.attributes["data-coord"].value.split(',');
        }

        //Set Coords
        x = coord[0];
        y = coord[1];

        //Create newTicElement and push it in the matchingCoord Array
        newTicElement = new this.ticElement(x, y, el, this.index++);
        matchingCoord.push(newTicElement);

        //Depending if computer/user execute the matchingCoord function
        if (elComp) {
            this.compareCoordsCOMP(matchingCoord);
        } else {
            this.compareCoords(matchingCoord);
        }
    },
    compareCoords: function(current) {
        var currentCoord = current[0].coord.toString();
        var newArr = [];

        //Compare if coords match 
        if (this.coordinates.hash1.hasOwnProperty(currentCoord) || this.coordinates.hash2.hasOwnProperty(currentCoord) || this.coordinates.hash3.hasOwnProperty(currentCoord) || this.coordinates.hash4.hasOwnProperty(currentCoord) ||
            this.coordinates.hash5.hasOwnProperty(currentCoord) || this.coordinates.hash6.hasOwnProperty(currentCoord) || this.coordinates.hash7.hasOwnProperty(currentCoord) || this.coordinates.hash8.hasOwnProperty(currentCoord)) {

            delete this.coordinates.hash1[currentCoord];
            delete this.coordinates.hash2[currentCoord];
            delete this.coordinates.hash3[currentCoord];
            delete this.coordinates.hash4[currentCoord];
            delete this.coordinates.hash5[currentCoord];
            delete this.coordinates.hash6[currentCoord];
            delete this.coordinates.hash7[currentCoord];
            delete this.coordinates.hash8[currentCoord];

            var a = determineObjLength(this.coordinates.hash1);
            var b = determineObjLength(this.coordinates.hash2);
            var c = determineObjLength(this.coordinates.hash3);
            var d = determineObjLength(this.coordinates.hash4);
            var e = determineObjLength(this.coordinates.hash5);
            var f = determineObjLength(this.coordinates.hash6);
            var g = determineObjLength(this.coordinates.hash7);
            var h = determineObjLength(this.coordinates.hash8);
            
            //Determine winner
            if ((a && b && c && d && e && f && g && h) === 0) {
                this.gameStatus = false;
                this.gameOver(null, 'You');
            } else if (this.gameStatus.tied) {
                //Tied
                this.gameOver(true);
            }

            //Determine obj length
            function determineObjLength(obj) {
                var index = 0;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        index++;
                    }
                }
                return index;
            }
        }
    },
    compareCoordsCOMP: function(current) {
        var currentCoord = current[0].coord.toString();
        //Compare if coords match 
        if (this.coordinates.hash1C.hasOwnProperty(currentCoord) || this.coordinates.hash2C.hasOwnProperty(currentCoord) || this.coordinates.hash3C.hasOwnProperty(currentCoord) || this.coordinates.hash4C.hasOwnProperty(currentCoord) ||
            this.coordinates.hash5C.hasOwnProperty(currentCoord) || this.coordinates.hash6C.hasOwnProperty(currentCoord) || this.coordinates.hash7C.hasOwnProperty(currentCoord) || this.coordinates.hash8C.hasOwnProperty(currentCoord)) {

            delete this.coordinates.hash1C[currentCoord];
            delete this.coordinates.hash2C[currentCoord];
            delete this.coordinates.hash3C[currentCoord];
            delete this.coordinates.hash4C[currentCoord];
            delete this.coordinates.hash5C[currentCoord];
            delete this.coordinates.hash6C[currentCoord];
            delete this.coordinates.hash7C[currentCoord];
            delete this.coordinates.hash8C[currentCoord];

            var a = determineObjLength(this.coordinates.hash1C);
            var b = determineObjLength(this.coordinates.hash2C);
            var c = determineObjLength(this.coordinates.hash3C);
            var d = determineObjLength(this.coordinates.hash4C);
            var e = determineObjLength(this.coordinates.hash5C);
            var f = determineObjLength(this.coordinates.hash6C);
            var g = determineObjLength(this.coordinates.hash7C);
            var h = determineObjLength(this.coordinates.hash8C);

            //Determine winner
            if ((a && b && c && d && e && f && g && h) === 0) {
                this.gameStatus = false;
                this.gameOver(null, 'Computer');
            } else if (this.gameStatus.tied) {
                //Tied
                this.gameOver(true);
            }
        }

        //Determine obj length
        function determineObjLength(obj) {
            var index = 0;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    index++;
                }
            }
            return index;
        }
    },
    computerTurn: function() {
        //Object Key Global Variables
        var computerTimer,
            turnDelay = 3000;

        //Conditional for users turn
        if (this.user.isTurn === false && this.computer.isTurn === true) {
            this.user.isTurn = true;
            this.computer.isTurn = false;

            //Show computer thinking screen
            function takeTurn(callback) {

                var a = document.getElementsByClassName('status__overlay')[0];
                a.classList.add("status__overlay--show");

                //Set Delay of turn
                computerTimer = window.setInterval(callback, turnDelay);
            }

            //Take Turn function executing the callback function this will run after 3 secs
            takeTurn(function() {
                //Function Local Variables
                var obj = this,
                    i = null,
                    success = false;

                //Set Random Index number to element
                setBlock(obj);

                //If passed add the value of "o"
                if (obj.el[i].attributes["data-value"].value !== "x" && obj.el[i].attributes["data-value"].value !== "o") {
                    obj.el[i].attributes["data-value"].value = "o";
                    obj.el[i].classList.add("tic__block-bounce");

                    var a = document.getElementsByClassName('status__overlay')[0];
                    //Remove Overlay
                    a.classList.remove("status__overlay--show");

                    //Set Coords
                    var a = obj.el[i];
                    this.setCoords(true, a);

                    //Extra arguement to let the computer know this was a success
                    success = true;

                } else {
                    while (i === i || success === false) {
                        setBlock(obj);
                        if (obj.el[i].attributes["data-value"].value !== "x" && obj.el[i].attributes["data-value"].value !== "o") {
                            obj.el[i].attributes["data-value"].value = "o";
                            obj.el[i].classList.add("tic__block-bounce");


                            var a = document.getElementsByClassName('status__overlay')[0];
                            //Remove Overlay
                            a.classList.remove("status__overlay--show");

                            //Set Coords
                            var a = obj.el[i];
                            this.setCoords(true, a);

                            //Break out of loop
                            break;
                        }
                    }
                }

                //Stop computers turn
                function stopTurn() {
                    clearInterval(computerTimer);
                }

                //Generate random index #
                function randomIndex() {
                    return Math.floor((Math.random() * 8) + 1);
                }
                //Set the random index # to el
                function setBlock(obj) {
                    i = randomIndex();
                }

                //Stop Turn
                stopTurn();
            }.bind(ticTacGame)); //End of Computer Timer
        }
    },
    gameOver: function(tied, player) {
        var a = document.getElementsByClassName('status__overlay')[0];
        b = document.getElementsByClassName('status__icon'),
            c = document.getElementById('computer'),
            d = document.getElementsByClassName('status__icon-container')[0],
            e = document.getElementsByClassName('status__description')[0],
            f = document.getElementsByClassName('status__timer')[0];

        //Display Tied Message    
        if (tied === true) {
            var turnDelay = 5000,
                counter = 5;
            alertWinner(function() {
                //Refresh page after 5 seconds
                window.location.reload();
            });

        }

        //Display Winning Message
        if (tied === null && !!player) {
            var turnDelay = 5000,
                counter = 5;

            //Execute Alert Winner Callback
            alertWinner(function() {
                //Refresh page after 5 seconds
                window.location.reload();
            });
        }

        //Main Winner Timer function
        function winnerTimer(callback) {
            //Show Message
            f.childNodes[0].nodeValue = "Restarting Match in " + counter + " seconds";

            //Execute callback
            window.setInterval(callback, 1000);
        }

        function alertWinner(callback) {

            //Show Overlay
            a.classList.add("status__overlay--show");

            if (player === "You") {
                d.classList.add("status__icon-container--winner");
                //User
                e.childNodes[0].nodeValue = player + " Win!";

            } else if (player === "Computer") {
                d.classList.add("status__icon-container--lose");

                //Computer
                e.childNodes[0].nodeValue = "Sorry! " + player + " Won!";
            } else {
                d.classList.add("status__icon-container--tied");

                //Tied
                e.childNodes[0].nodeValue = "Woops! Tied Game!"
            }

            //Hide Computer SVG
            c.style.display = "none";

            //Modification to show timer
            f.classList.add('status__timer--show');

            //Winner Timer Function Execute
            winnerTimer(function() {
                counter--;
                f.childNodes[0].nodeValue = "Restarting Match in " + counter + " seconds";
            });

            //Restart callback
            window.setInterval(callback, turnDelay);
        }

        //Reset
        this.user.isTurn = true;
        this.computer.isTurn = false;
    }
};

//Add event listener
for (var i = 0; i < ticTacGame.el.length; i++) {
    ticTacGame.el[i].addEventListener('click', ticTacGame.onClick.bind(ticTacGame), false);
}

