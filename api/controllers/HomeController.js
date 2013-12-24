/**
 * HomeController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var HomeController = {

    index: function (req,res)
    {

        console.log(req.user);
        if (req.user) {
            res.view({
                user: req.user
            });
        }
        else {
            res.view({
                layout: "not_authorized"
            })
        }
    }

};
module.exports = HomeController;