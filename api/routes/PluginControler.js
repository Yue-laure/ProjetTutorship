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
      console.log("hhhhhhhhhhhhhhhhhhhhhhhhhh");
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

  plugin.save((err) => {
    if (err) {
      console.log("Can't post plugin : ", err);
    }
    console.log(`${plugin.name} saved! `);
  });
}
function postPlugin(req, res) {
  let plugin = new Plugin();
  plugin.id = req.body.id;
  plugin.identifier = req.body.identifier;
  plugin.name = req.body.name;
  plugin.vendor = req.body.vendor;
  plugin.description = req.body.description;
  plugin.version = req.body.version;
  plugin.apiVersion = req.body.apiVersion;
  plugin.thumbnail = req.body.thumbnail;
  plugin.keywords = req.body.keywords;
  plugin.isInstrument = req.body.isInstrument;
  plugin.website = req.body.website;
  plugin.hasAudioInput = req.body.hasAudioInput;
  plugin.hasAudioOutput = req.body.hasAudioOutput;
  plugin.hasMidiInput = req.body.hasMidiInput;
  plugin.hasMidiOutput = res.body.hasMidiOutput;

  console.log = "Post Plugin received : ";
  console.log(plugin);

  plugin.save((err) => {
    if (err) {
      res.send("Can't post plugin : ", err);
    }
    res.json({ message: "${plugin.name} saved! " });
  });
}
/*
function postPlugin(plugin) {
  let newPlugin = new Plugin(plugin);

  return new Promise((resolve, reject) => {
    newPlugin.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(newPlugin);
      }
    });
  });
}
*/
function deletePlugin(req, res) {
  Plugin.findByIdAndRemove(req.params.id, (err, plugin) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `${pluginname.nom} deleted` });
  });
}

function updatePlugin(req, res) {
  console.log("Update on plugin : ");
  console.log(req.body);
  Pluggin.findByIdAndUpdate(
    res.body._id,
    req.body,
    { new: true },
    (err, plugin) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json({ message: "${plugin.name} updated" });
      }
    }
  );
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

module.exports = {
  putPluginsInDB,
  getPlugins,
  getPlugin,
  deletePlugin,
  updatePlugin,
  postPlugin,
};
