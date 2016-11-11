/*
TODOS:
- need ability to write files to specified directory
- call make_()'s in prompt.get()
*/
var fs = require('fs');
var prompt = require('prompt');

var schema = {
  properties: {
    dirName: {
      description: 'Path and name for your new directory',
      required: true
    },
    htmlName: {
      description: 'Name for your html file',
      required: true
    },
    cssName: {
      description: 'Name for your CSS file ',
      required: true
    },
    jsName: {
      description: 'Name for your JS file  ',
      required: true
    }
  }
};

get_names();

var project = {};

prompt.start();

prompt.get(schema, function(err, result){
  if(err){
    return onErr(err);
  }
  // result.names need to be called
  // file name is attached to file function
  // and both are used to write actual file
  project.dirName = result.dirName;
  project.htmlName = result.htmlName + '.html';
  project.cssName = result.cssName + '.css';
  project.jsName = result.jsName + '.js';

  // file creation needs to wait on folder creation
  make_project();
});

function onErr(err){
  console.log(err);
  return 1;
}

function make_project(){
  // need to check if new directory exists before
  // making files
  make_dir();

  for(var key in project){
    switch(key){
      case 'htmlName':
        make_file(project.dirName + '/' + project[key], make_html);
        break;
      case 'cssName':
        make_file(project.dirName + '/' + project[key], make_css);
        break;
      case 'jsName':
        make_file(project.dirName + '/' + project[key], make_js);
        break;
      default:
        console.log('creating files....');
    }
  }
}

function make_file(fileName, fileFunction){
  fs.writeFile(fileName, fileFunction(), function(err){
    if(err){
      console.log('error: ' + err);
    } else {
      console.log(fileName + ' created');
    }
  })
}

function make_dir(){
  fs.mkdir(project.dirName, function(err){
    if(err){
      throw err;
    } else {
      console.log('directory created');
    }
  });
}

function make_html(js, css){
  var html = '<!DOCTYPE html>\n<html lang="en">' +
    '\n\t\<head><meta charset="utf-8">' +
    '\n\t\t<link rel="stylesheet" href="' + project.cssName + '">' +
    '\n\t\t<script src="' + project.jsName + '"></script>' +
    '\n\t\t<title></title>\n\t</head>' +
    '\n\t<body>\n\t\t<h1 id="test">Helloaf</h1>' +
    '\n\t</body>\n</html>';
    return html;
}

function make_css(){
  var css = '/* your code below */' +
    '\n#test { color: #00f}';
  return css;
}

function make_js(){
  var js = 'window.onload = main;' +
    '\n\nfunction main(){' +
    '\n\tconsole.log("I work");' +
    '\n}'
  return js;
}

function get_names(){
  console.log('\t***** Template Generator *****\n\nUnspecified path will create a new directory ' +
  'in current working directory.\n');
}
