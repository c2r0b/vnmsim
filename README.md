# Von Neumann machine simulator (VNMS)

A simulator of the Von Neumann machine.
This simulator is meant to be a solution for students and teachers to study how a Von Neumann Machine works.

Online version: [vnmsim.app](https://vnmsim.app)

## Simulator guide

This simulator is fully compatible with the most common commands for the Von Neumann Machine. It is able to load data (LOD), store it (STO), do additions (ADD), subtractions (SUB), multiplications (MUL), divisions (DIV) and perform jumps (JMZ/JMP).

A guide to the simulator is also available from the `Help` section accessible from the menu of the simulator itself.

## Specifications

The simulator is developed as a NextJS app developed using React and Typescript.
The code editor uses CodeMirror.
The chosen design framework is FluentUI by Microsoft.

## How to compile

After downloading the repository and installing the dependencies using `npm install`, a simple `npm run dev` is enough to start a compiled and live updated version at `localhost:3000`.

## AngularJS version

The previous version written in AngularJS is available in the `old` repository and online [here](http://vnsimulator.altervista.org/). 

## Zanichelli version

In 2015 a different simulator of the Von Neumann machine inspired by this one has been developed for Zanichelli Editor S.p.A. as an extension of the work of Giorgio Meini, Fiorenzo Formichi: "Tecnologie e progettazione di sistemi informatici e di telecomunicazioni".

If you were looking for that simulator (available only in italian), you can download it [here](http://goo.gl/hSwG4m).

## License

The MIT license. Please see the [`LICENSE`](./LICENCE) file for more details.
