// var userTimes = [[[6, 8], [9.5, 10], [12, 14], [16.5, 18]],
// [[6, 9], [12, 12.25], [13, 14.5], [16, 17], [18, 21]],
// [[6, 10], [10.5, 12.5], [13, 20]]];

const cases = [{
    input: [
        [[1,4]],
        [[1,3]],
        [[2,4]],
    ],
    output: [[2,3]],
}, 
{
    input: [
        [[1, 3]],
        [[3, 5]]
    ],
    output: [],
},
{
    input: [
        [[1.5, 2]],
        [[1.75, 2]]
    ],
    output: [],
},
{
    input: [
        [[2, 3]],
        [[1, 10]],
    ],
    output: [[2,3]],
},
{
    input: [
        [[1,2.5]],
        [[1.5,2]],
        [[0, 14]],
        [[1,5]],
    ],
    output: [[1.5,2]],
},
{
    input: [
        [[8, 12], [13,15], [16,17]],
        [[9, 11.5], [12,14], [16,18]],
        [[7.5, 13], [15.5, 19]]
    ],
    output:[[9,11.5],[16,17]],
}
]

for (let i = 0; i < cases.length; i++) {
    if (JSON.stringify(thing(cases[i].input)) != JSON.stringify(cases[i].output)) {
        console.log("not bingo at " + i);
    } else {
        console.log("nice at " + i);
    }
}


var user1 = [[6, 8], [9.5, 10], [12, 14], [16.5, 18]];
var user2 = [[6, 9], [12, 12.25], [13, 14.5], [16, 17], [18, 21]];

function thing (userTimes) {
    var timeNeeded = 0.5;
    var aTimes = [];

    var aTimes = userTimes[0];







    for (let k = 1; k < userTimes.length; k++) { //loop through the aTimes array starting with the 2nd index. 
        // The first index is now aTimes and will be compared and changed based on the following algorithm
        var newATimes = []; 
        for (let i = 0; i < aTimes.length; i++) { //loop through user1 array 
            let minNum;
            let maxNum;
            for (let j = 0; j < userTimes[k].length; j++) { // loop through the userTimes array at index k
                if ((userTimes[k][j][0] < aTimes[i][1]) && (userTimes[k][j][1] > aTimes[i][0])) { // if the first time from userTimes is less than the 
                    // second time form aTimes and the second time form userTimes is greater than the first time from aTimes, then there is shared available times 
                    // between the two time frames.
                    maxNum = Math.max(userTimes[k][j][0], aTimes[i][0]);
                    minNum = Math.min(userTimes[k][j][1], aTimes[i][1]);
                    if (minNum - maxNum >= timeNeeded) {
                        let temp = [];
                        temp.push(maxNum);
                        temp.push(minNum);
                        newATimes.push(temp);
                    }
                }
            }
        }
        aTimes = newATimes;
    }

    console.log(aTimes);
    return aTimes
}


