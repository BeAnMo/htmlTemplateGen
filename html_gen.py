#!/usr/bin/python

# automatically creates in /home/user/ directory
import os

def make_html(js, css):
    html = '<!DOCTYPE html>\n<html lang="en">'
    html += '\n\t<head>\n\t\t<meta charset="utf-8">'
    html += '\n\t\t<link rel="stylesheet" href="' + css + '">'
    html += '\n\t\t<script src="' + js + '"></script>'
    html += '\n\t\t<title></title>\n\t</head>'
    html += '\n\t<body>\n\t\t<h1 id="test">Hi there</h1>'
    html += '\n\t</body>\n</html>'
    return html

def make_css():
    css = '/* your code here */'
    css += '\n#test { color: #00f}'
    return css

def make_js():
    js = 'window.addEventListener("load", function load(event){'
    js += '\n\twindow.removeEventListener("load", load, false);'
    js += '\n// your code here'
    js += '\n\tconsole.log("loaded properly");'
    js += '\n});'
    return js

def get_names():
    """creates a dictionary with with file types as keys
    first value is filename, second is function to make file type
    the directory key is just the path &/or folder name"""

    print('Unspecified path will create a new directory in ' +
    'current working directory\n')
    names = {}

    names['dir'] = input('Enter the new directory name: /')
    print('creating /' + names['dir'])

    cssName = input('enter name for the .css file: ') + '.css'
    jsName = input('enter name for the .js file: ') + '.js'
    htmlName = input('enter name for the .html file: ') + '.html'

    names['css'] = [cssName, make_css()]
    print('created ' + cssName)

    names['js'] = [jsName, make_js()]
    print('created ' + jsName)

    names['html'] = [htmlName, make_html(jsName, cssName)]
    print('created ' + htmlName)

    return names

def write_file(filename):
    """writes a dictionary to the specified directory and
    corresponding html, css, & js files"""
    try:
        # directory must be created first
        os.makedirs(filename['dir'])
        print('created directory')
    except OSError:
            pass

    for key in filename.keys():
        if key != 'dir':
            namePath = filename['dir'] + '/' + filename[key][0]
            with open(namePath, 'w') as file_object:
                file_object.write(filename[key][1])

def generate():
    names = get_names()
    write_file(names)

if __name__ == '__main__':
    generate()
    print('Finito')
else:
    print('Imported into another program.')
