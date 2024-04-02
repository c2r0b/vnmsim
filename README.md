<img align="left" width="80" height="80" src="https://github.com/c2r0b/vnmsim/blob/main/src-tauri/icons/Square89x89Logo.png" />

# Von Neumann Machine Sim

A simulator of the Von Neumann machine.
This simulator is meant to be a solution for students and teachers to study how a Von Neumann Machine works.


[<img src="images/mac-app-store.svg">](https://apps.apple.com/it/app/von-neumann-machine-simulator/id6474739902)

Online version: [vnmsim.app](https://vnmsim.app)  
Windows, Linux and MacOS desktop version: [releases](https://github.com/c2r0b/vnmsim/releases)

## How to use

This simulator is fully compatible with the most common commands for the Von Neumann Machine. It is able to load data (LOD), store it (STO), do additions (ADD), subtractions (SUB), multiplications (MUL), divisions (DIV) and perform jumps (JMZ/JMP).

A guide to the simulator is also available from the `Help` section accessible from the menu of the simulator itself.

## Development

The simulator is developed as a NextJS app developed using React, Redux, Typescript and Rust. The code editor uses CodeMirror.  
The chosen design framework is FluentUI by Microsoft.  
The offline version of the simulator is built using Tauri.

After downloading the repository and installing the dependencies using `npm install`, a simple `npm run dev` is enough to start a compiled and live updated version at `localhost:3000`.

## Translations

The simulator is available in multiple languages using Transifex.  
If you want to contribute to the translation of the simulator, you can do it [here](https://www.transifex.com/lorenzo-ganni/vnmsim/).

## Other versions

### AngularJS version

The previous version written in AngularJS is available in the `old` repository.

### Zanichelli version

In 2015 a different simulator of the Von Neumann machine inspired by this one has been developed for Zanichelli Editor S.p.A. as an extension of the work of Giorgio Meini, Fiorenzo Formichi: "Tecnologie e progettazione di sistemi informatici e di telecomunicazioni".

If you were looking for that simulator (available only in italian), you can download it [here](http://goo.gl/hSwG4m).

## License

The MIT license. Please see the [`LICENSE`](./LICENSE) file for more details.
