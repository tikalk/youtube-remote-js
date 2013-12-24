/**
 * PlayerController
 *
 * @module      :: Controller
 * @description    :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var socketService = require('../services/socket');
var findPlayer = socketService.findPlayer;
function sendCommand(res, command, playerId, vidId) {
    var playerSocket = findPlayer(playerId);
    if (playerSocket) {

        var cmd = {
            command: command,
            playerId: playerSocket.uuid,
            videoId: vidId
        };
        console.log('Sent command %s to player %s', command, playerSocket.uuid);
        playerSocket.socket.emit('command', cmd);
        return res.json(cmd);
    }
    else {
        return res.json(
            {
                command: command,
                error: true,
                msg: 'No such player',
                playerId: playerId
            }
        );
    }
}
module.exports = {
    /**
     * Action blueprints:
     *    `/player/play`
     */
    play: function (req, res) {
        if(req.method === 'POST') {
            sendCommand(res,'play',req.param('id') || req.body.playerId, req.body.vidId);
        }
        else
            res.status(404).send('Not found');
    },


    /**
     * Action blueprints:
     *    `/player/pause`
     */
    pause: function (req, res) {
        if(req.method === 'POST') {
            sendCommand(res,'pause',req.param('id') || req.body.playerId, req.body.vidId);
        }
        else
            res.status(404).send('Not found');
    },


    /**
     * Action blueprints:
     *    `/player/stop`
     */
    stop: function (req, res) {
        if(req.method === 'POST') {
            sendCommand(res,'stop',req.param('id') || req.body.playerId, req.body.vidId);
        }
        else
            res.status(404).send('Not found');
    },


    /**
     * Action blueprints:
     *    `/player/volUp`
     */
    volUp: function (req, res) {
        if(req.method === 'POST') {
            sendCommand(res,'volUp',req.param('id') || req.body.playerId, req.body.vidId);
        }
        else
            res.status(404).send('Not found');
    },


    /**
     * Action blueprints:
     *    `/player/volDown`
     */
    volDown: function (req, res) {
        if(req.method === 'POST') {
            sendCommand(res,'volDown',req.param('id') || req.body.playerId, req.body.vidId);
        }
        else
            res.status(404).send('Not found');
    },


    /**
     * Action blueprints:
     *    `/player/mute`
     */
    mute: function (req, res) {
        if(req.method === 'POST') {
            sendCommand(res,'mute',req.param('id') || req.body.playerId, req.body.vidId);
        }
        else
            res.status(404).send('Not found');
    },


    /**
     * Action blueprints:
     *    `/player/queue`
     */
    queue: function (req, res) {
        if(req.method === 'POST') {
            sendCommand(res,'queue',req.param('id') || req.body.playerId, req.body.vidId);
        }
        else
            res.status(404).send('Not found');
    },


    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to PlayerController)
     */
    _config: {}
};