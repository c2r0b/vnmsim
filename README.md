# Von Neumann machine simulator

A simulator of the Von Neumann machine written in Javascript. It is built mainly using Pug (previously Jade), Sass, AngularJS and CodeMirror.

This simulator is meant to be a solution for students and teachers to study how a Von Neumann Machine works.

## How to use

A guide to the simulator is available from the information menu at the top of the page of the simulator itself.

## Online version

You can try out the simulator on [vnsimulator.altervista.org](http://vnsimulator.altervista.org/)

## How to compile

If you have Git installed on your computer you can execute the following command, otherwise you can manually download the repository from Github.

```
git clone https://github.com/lorenzoganni/vnmsim.git
```

You'll need NodeJS, use this command to access the main branch and install the dependencies.

```
cd vnmsim && npm install
```

You'll need Gulp and Express to compile it. For debugging mode (it will start a web server on `localhost`, the port will be displayed as soon as the compilation ends and you'll find the compiled simulator source in `build`) just run:

```
gulp
```

To compile it for production (it won't start the server and the output will be located in `dist`):

```
gulp --production
```

## Contribute

Please feel free to create an issue or a pull request.

If you'd like to add a new language or improve the translations, you can do that from the official Transifex project of this simulator available [here](https://www.transifex.com/lorenzo-ganni/von-neumann-machine-simulator/).

## Zanichelli version

In 2015 a different simulator of the Von Neumann machine inspired by this one has been developed for Zanichelli Editor S.p.A. as an extension of the work of Giorgio Meini, Fiorenzo Formichi: "Tecnologie e progettazione di sistemi informatici e di telecomunicazioni".

If you were looking for that simulator (available only in italian), you can download it [here](http://goo.gl/hSwG4m).

## Changelog

This changelog refers to the online version of the simulator.

### v2018.05.16
+ Major refactoring
+ AngularJS ES6 Way
+ Solve issue #2

### v2017.01.27
+ Bug fix: storing large values in memory cells resulted in misplaced digits

### v2017.01.04
+ All samples download button
+ Clear log button
+ German language support

### v2016.10.09
+ Statistics section
+ Settings panel
+ Reset button for the PC field
+ Compilation button
+ Improved UI
+ 5 new samples
+ Log startup message
+ Warning message on page leave and on file change

### v2016.10.02
+ Editable PC increment value (can be negative)
+ Angular Translate removed (unnecessary)
+ Colors in the log console
+ Samples panel (with new "basic_operations" sample)
+ Improved panels layout

### v2016.09.04
+ Simulator rebuilt from the ground up with AngularJS
+ Major UI improvements
+ New memory cells editor: CodeMirror
+ Removed instructions and variables limit
+ New translation system: Angular Translate
+ Store data inside memory cells too
+ Comments with //
+ Log console
+ New I/O system with JSON file to save the current status of the simulator
+ Source code available on Github

### v2015.10.20
+ Added new languages
+ JMP and JMZ commands bug fixed

### v2015.10.15
+ Dinamically change the steps delay
+ Sound off as default
+ Simulator second run bug fixed

### v2015.10.14
+ Menu UI improvements
+ Instructions counter bug fixed
+ Blank instruction syntax check bug fixed

## License

The MIT license. Please see the `LICENSE` file for more details.
