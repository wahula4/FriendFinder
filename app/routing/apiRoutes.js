// ===============================================================================
// LOAD DATA
// We are linking our routes to "data"
// ===============================================================================
var friendData = require("../data/friends");
// ===============================================================================
// ROUTING
// ===============================================================================
module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friendData);
    });

    app.post("/api/friends", function(req, res) {
        var difference = 1000;
        var matchName = "";
        var matchPhoto = "";

        var newFriend = req.body;

        for (var i = 0; i < friendData.length; i++) {
            var matchScores = [];
            var totalDifference = 0;

            for (var j = 0; j < 10; j++) {
                matchScores.push(
                    Math.abs(
                        parseInt(newFriend.scores[j]) -
                            parseInt(friendData[i].scores[j])
                    )
                );

                totalDifference = matchScores.reduce(function(total, amount) {
                    return total + amount;
                });
            }
            console.log(friendData[i].friendName + ": " + totalDifference);

            if (totalDifference < difference) {
                difference = totalDifference;
                matchName = friendData[i].friendName;
                matchPhoto = friendData[i].friendURL;
            }
        }
        //Once the cycle is complete, the friend with the least difference will remain, and that data will be sent as a json object back to the client
        res.json({ friendName: matchName, friendURL: matchPhoto });

        //Lastly, push new friend's data into the friends array
        friendData.push(newFriend);
    });
};
