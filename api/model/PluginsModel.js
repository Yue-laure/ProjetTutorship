/**
 * Description: Plugin model  
 * Author : Ons HAMDI 
 */
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

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
PluginSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('Plugin', PluginSchema);