/**
 * SearchController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
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
var GapiHandler = require('../services/gapi');
// Browser apps key
var API_KEY='AIzaSyCgrK5ds9uCSRM-WBUFm8V8jPX66q8-Od0';

var youtubeHandler = GapiHandler.create({
    key: API_KEY,
    template: 'youtube',
    discover: ['youtube', 'v3'],
    apis: 'youtube.search.list'
});

module.exports = { 
  index: function function_name (req, res) {
    return res.view({
      title: "the search module...",
      user: req.user
    });
  },
  /**
   * Action blueprints:
   *    `/search/list`
   */
   list: function (req, res) {
    youtubeHandler.set('q', req.param('q'));
    return youtubeHandler.request(res);
  },


  /**
   * Action blueprints:
   *    `/search/more`
   */
   more: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },


  /**
   * Action blueprints:
   *    `/search/select`
   */
   select: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SearchController)
   */
  _config: {}

  
};