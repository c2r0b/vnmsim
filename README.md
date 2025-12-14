# Von Neumann Machine Sim <img align="left" width="45" height="45" src="/src-tauri/icons/128x128.png" style="margin-right:15px" />

[![Vercel Deploy](https://deploy-badge.vercel.app/vercel/vnmsim?name=webapp)](https://vnmsim.c2r0b.ovh/)
[![publish](https://github.com/c2r0b/vnmsim/actions/workflows/tauri.yml/badge.svg?branch=release)](https://github.com/c2r0b/vnmsim/actions/workflows/tauri.yml)

A simulator of the Von Neumann machine.  
This simulator is meant to be a solution for students and teachers to study how a Von Neumann Machine works.

Online version: [vnmsim.c2r0b.ovh](https://vnmsim.c2r0b.ovh/)  
Windows, Linux and MacOS (unsigned) desktop version: [releases](https://github.com/c2r0b/vnmsim/releases) 

[<img src="https://is1-ssl.mzstatic.com/image/thumb/PurpleSource116/v4/ef/a6/08/efa60861-f6b9-6943-1018-9db026374842/acb89f71-72cc-4ec5-8340-79f805c2fd62_Screenshot_2023-12-21_at_14.37.22.png/313x0w.webp">](https://vnmsim.c2r0b.ovh/)


## How to use

This simulator is fully compatible with the most common commands for the Von Neumann Machine. It is able to load data (LOD), store it (STO), do additions (ADD), subtractions (SUB), multiplications (MUL), divisions (DIV) and perform jumps (JMZ/JMP).

A guide to the simulator is also available from the `Help` section accessible from the menu of the simulator itself.

## Development

The simulator is developed as a NextJS app developed using React, Redux, Typescript and Rust. The code editor uses CodeMirror.  
The chosen design framework is FluentUI by Microsoft.  
The offline version of the simulator is built using Tauri.

After downloading the repository and installing the dependencies using `pnpm install`, a simple `pnpm run dev` is enough to start a compiled and live updated version at `localhost:3000`.

## Translations

The simulator is available in multiple languages using Transifex.  
If you want to contribute to the translation of the simulator, you can do it [here](https://www.transifex.com/lorenzo-ganni/vnmsim/).

## Other versions

### Zanichelli version

In 2015 a different simulator of the Von Neumann machine inspired by this one has been developed for Zanichelli Editor S.p.A. as an extension of the work of Giorgio Meini, Fiorenzo Formichi: "Tecnologie e progettazione di sistemi informatici e di telecomunicazioni".

If you were looking for that simulator (available only in italian), you can download it [here](http://goo.gl/hSwG4m).

## License

The MIT license. Please see the [`LICENSE`](./LICENSE) file for more details.
