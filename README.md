# VNMS (AngularJS version)

A simulator of the Von Neumann machine written in Javascript. It is built mainly using Pug (previously Jade), Sass, AngularJS and CodeMirror.
This simulator is meant to be a solution for students and teachers to study how a Von Neumann Machine works.

As of October 2022 this simulator has been rewritten with NextJS, checkout the main branch

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

## License

The MIT license. Please see the `LICENSE` file for more details.
