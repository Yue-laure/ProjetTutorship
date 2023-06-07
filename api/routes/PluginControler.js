//let Assignment = require('../model/assignment');
// Include fs module
const MongoClient = require("mongodb").MongoClient;
const fs = require("fs");
const path = require("path");
let Plugin = require("../model/PluginsModel");
let currentDir = process.cwd();
let pluginsBaseDir = "/plugins";
let pluginsDir = currentDir + pluginsBaseDir;

let pluginsDirURL = "https://localhost:8080/…";
/**  cette fonction lit le dossier des plugins (pour le moment codé en dur), et renvoie la liste des descripteurs sous la forme d'un
tableau appelé plugins */

function readPluginsFromDisk(dir, vendor) {
  //dir : plugin directory

  console.log("getPlugins");

  let plugins = [];

  //files = fs.readdirSync();
  console.log("Building Repositiry.json...Reading " + dir + "...");

  fs.readdirSync(dir).forEach((name) => {
    var filePath = path.join(dir, name);
    var stat = fs.statSync(filePath);
    if (stat.isFile()) {
      console.log("Ignoring file : " + name);
    } else if (stat.isDirectory()) {
      const descriptorPath = filePath + "/descriptor.json";

      let descriptor;
 
      if (fs.existsSync(descriptorPath)) {
        descriptor = fs.readFileSync(descriptorPath, {
          encoding: "utf8",
          flag: "r",
        });
        // transform the string into a JSON object
        descriptor = JSON.parse(descriptor);
        // add the directory name to the descriptor
        descriptor.dirName = vendor + "/" + name;

        console.log(descriptor);

        plugins.push(descriptor);
      }
    }
  });
  return plugins;
}

async function getPlugins(req, res) {
  var aggregateQuery = Plugin.aggregate();
  let repository = {
    name: "WAP Repo from Faust IDE",
    root: pluginsBaseDir,
    plugins: [],
  };
  Plugin.find((err, plugins) => {
    if (err) {
      res.send(err);
    } else {
      repository.plugins = plugins;
      Plugin.aggregatePaginate(aggregateQuery,
        {page : parseInt(req.query.page) || 1, limit : parseInt(req.query.limit)|| 20,}, 
        (err, repository) => {
          if (err) {
            res.send(err);
          } 
      res.json(repository);
    });
    }
  }); 
}

function getPlugin(req, res) {
  let pluginID = req.params.id;
  Plugin.findOne({ id: pluginID }, (err, plugin) => {
    if (err) {
      res.send(err);
    }
    res.json(plugin);
  });
}
function savePluginToDB(p) {
  let plugin = new Plugin();
  plugin.id = p.id;
  plugin.identifier = p.identifier;
  plugin.name = p.name;
  plugin.vendor = p.vendor;
  plugin.description = p.description;
  plugin.version = p.version;
  plugin.apiVersion = p.apiVersion;
  plugin.thumbnail = p.thumbnail;
  plugin.keywords = p.keywords;
  plugin.isInstrument = p.isInstrument;
  plugin.website = p.website;
  plugin.hasAudioInput = p.hasAudioInput;
  plugin.hasAudioOutput = p.hasAudioOutput;
  plugin.hasMidiInput = p.hasMidiInput;
  plugin.hasMidiOutput = p.hasMidiOutput;
  plugin.dirName = p.dirName;
  console.log(p.dirName);
  console.log(" Plugin to save received : ");
  //console.log(plugin);
  Plugin.findOne({identifier: plugin.identifier}, (err, p) => {
    if (err) {
      console.log("Can't post plugin : ", err);
    }
    if (p) {
      console.log("Plugin already exists : ", p);
    } else {  
  plugin.save((err) => {
    if (err) {
      console.log("Can't post plugin : ", err);
    }
    console.log(`${plugin.name} saved! `);
  });
}
});
}
function postPlugin(descriptor, callback) {
  let plugin = new Plugin();
  
  plugin.id = descriptor.id;
  plugin.identifier = descriptor.identifier;
  plugin.name = descriptor.name;
  plugin.vendor = descriptor.vendor;
  plugin.description = descriptor.description;
  plugin.version = descriptor.version;
  plugin.apiVersion = descriptor.apiVersion;
  plugin.thumbnail = descriptor.thumbnail;
  plugin.keywords = descriptor.keywords;
  plugin.isInstrument = descriptor.isInstrument;
  plugin.website = descriptor.website;
  plugin.hasAudioInput = descriptor.hasAudioInput;
  plugin.hasAudioOutput = descriptor.hasAudioOutput;
  plugin.hasMidiInput = descriptor.hasMidiInput;
  plugin.hasMidiOutput = descriptor.hasMidiOutput;
  plugin.dirName = descriptor.dirName;

  console.log("Post Plugin received : ");
  console.log(plugin);

  Plugin.findOne({identifier: plugin.identifier}, (err, p) => {
    if (err) {
      console.log("Can't post plugin : ", err);
      callback(err, null);
    }
    if (p) {
      console.log("Plugin already exists : ", p);
      callback(new Error(`${plugin.name} already exists`), null);
    } else {  
      plugin.save((err) => {
        if (err) {
          console.log("Can't post plugin : ", err);
          callback(err, null);
        }
        console.log(`${plugin.name} saved! `);
        callback(null, plugin);
      });
    }
  });
}


function putPluginsInDB(req, res) {
  console.log("here");
  // On parcours le dossier pluginsDir et on récupère les sous-dossiers
  fs.readdirSync(pluginsDir).forEach((name) => {
    var filePath = path.join(pluginsDir, name);
    var stat = fs.statSync(filePath);

    if (stat.isFile()) {
      console.log("Ignoring file : " + name);
    } else if (stat.isDirectory()) {
      const plugins = readPluginsFromDisk(filePath, name);
      // console.log(plugins)
      plugins.forEach((p) => {
        const existingPlugin = Plugin.findOne({ identifier: p.identifier });
        /* if (existingPlugin) {
      console.log(
        `Plugin with name ${p.identifier} already exists in the database`
      );
    } else {*/
        savePluginToDB(p);
        // }
      });
    }
  });
  res.send("All plugins saved to the database");
}


function getKeywordsFromDB (req, res){
  Plugin.distinct('keywords', function(err, keywords) {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    } else {
      res.status(200).send(keywords);
    }
  });
}
  
function getPluginsWithKeyWord (req,res) {
 keyword =  req.query.keyword;
  console.log("keyword received : " + keyword);
  Plugin.find({keywords: keyword}, (err, plugins) => {
    if (err) {
      res.send(err);
    }
    res.json(plugins);
  });
}

module.exports = {
  putPluginsInDB,
  getPlugins,
  getPlugin,

  postPlugin,
  savePluginToDB,
  getKeywordsFromDB,
  getPluginsWithKeyWord,
};
