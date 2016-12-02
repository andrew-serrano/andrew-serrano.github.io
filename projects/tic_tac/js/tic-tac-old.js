var container = [],
    el = document.querySelectorAll(".tic__cord"),
    elArray = Array.prototype.slice.call(el),
    elActive = null,
    elActiveArray = null,
    ptrn1 = [[0, 2],[0, 1],[0, 0]],
		ptrn2 = [[0, 2],[1, 2],[2, 2]],
		ptrn3 = [[2, 2],[2, 1],[2, 0]],
		ptrn4 = [[0, 0],[1, 0],[2, 0]],
		ptrn5 = [[2, 2],[1, 1],[0, 0]],
		ptrn6 = [[0, 2],[1, 1],[2, 0]],
		ptrn7 = [[0, 1],[1, 1],[2, 1]],
		ptrn8 = [[1, 2],[1, 1],[1, 0]];


//Constructor Function
function ticElement(x, y, el) {
    this.coord = [parseInt(x), parseInt(y)];
    this.el = el;
}

//Add event listener
for (var i = 0; i < elArray.length; i++) {
    elArray[i].addEventListener('click', checkStatus, false);
}

//USER is X computer is O
function checkStatus(event) {
    var el = event.target;

    //Adding class of active and pushing el to a container array
    addClassActive(event, el);

}

//Add the class of active and trigger addEl function
function addClassActive(event, el) {
    //If el doesn't have class add active
    var elClass = el.attributes["class"].value;

    if (elClass.match("tic__coord-active") === null && (!el.attributes["data-value"].value === true)) {
        el.className += " tic__coord-active";
        el.setAttribute('data-value', 'x');
        addEl(event, el);
    }
}

//Add clicked el to an array
function addEl(event, el) {
    var elClass = el.attributes["class"].value,
        coord = el.attributes["data-coord"].value.split(','),
        x = coord[0],
        y = coord[1],
        newTicElement = new ticElement(x, y, el);

    //Push clicked elements to the container array
    container.push(newTicElement);
}


//Created by Thomas Zato
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function(array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // // compare lengths - can save a lot of time 
    // if (this.length != array.length)
    //     return false;

    for (var i = 0, l = this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        } else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};

// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", { enumerable: false });

//Reverse arrays index 
Array.prototype.reverseArrIndex = function() {
    //Do this by default
    var newArr = [];
    for (var i = 0, arrL = this.length - 1; i < this.length; i++) {
        newArr.splice(i, 0, this[arrL--]);
    }
    return newArr;
};

// Hide method from for-in loops
Object.defineProperty(Array.prototype, "reverseArrIndex", { enumerable: false });
