/**
 * Description: Plugin model  
 * Author : Ons HAMDI 
 */
var mongoose = require('mongoose');  
var PluginSchema = new mongoose.Schema({  
  id: Number,
  dirName: String,
  identifier: String,
  name : String,
  vendor: String,
  description: String,
  version: String,
  apiVersion: String, 
  thumbnail : String, 
  keywords : [String] , 
  isInstrument : Boolean, 
  website : String ,
  hasAudioInput : Boolean, 
  hasAudioOutput : Boolean,
  hasMidiInput : Boolean, 
  hasMidiOutput : Boolean,

});


module.exports = mongoose.model('Plugin', PluginSchema);