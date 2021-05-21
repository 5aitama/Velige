
<h1 align=center>Velige</h1>
<p align=center>A Very Little Graphic Engine</p>

<p align=center>
<img alt="GitHub package.json version (branch)" src="https://img.shields.io/github/package-json/v/5aitama/velige/main?label=version">
<img alt="GitHub closed issues" src="https://img.shields.io/github/issues-closed/5aitama/velige">
<img alt="GitHub closed pull requests" src="https://img.shields.io/github/issues-pr-closed/5aitama/velige">
<img alt="GitHub contributors" src="https://img.shields.io/github/contributors/5aitama/velige">
<img alt="GitHub last commit (branch)" src="https://img.shields.io/github/last-commit/5aitama/velige/main">
</p>

### Description
**Velige** is a little Graphics Engine created especially for a school project (*a game named [CodeCar]()*). Why ? because I like suffering... Seriously the reason why I make this is because I want to learn more about how game engines work the best way for me to learn how they work is to create one. 

This Graphics Engine is based on WebGL1 *(not compatible with WebGL2 for now)*. The code is quite well commented for me (I hope is the same for you) so you can see how the Graphics Engine works without too much trouble.

I use [TypeScript](https://www.typescriptlang.org/) especially for typed data *(is very very lot more easier to code with typed data!)* with [Snowpack](https://www.snowpack.dev/) to build / debug the project (*very useful !*). 

For the package manager I use [Yarn](https://yarnpkg.com/) for speed and it have a better package management compared to [NPM](https://www.npmjs.com/) (sorry for NPM users) but you can use both.

### How to build
To build the project you must :

```bash
# For yarn users
yarn build
```

```bash
# For npm users
npm run build
```

once it finished to build, you must need have a `build/` folder at the project root directory that contains the production ready code.

### How to dev
When you modify the code you want to see in real time (when you saved the file that you are modified) the modification. You can't use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for [Visual Studio Code](https://code.visualstudio.com/) for that but hopefuly we have [Snowpack](https://www.snowpack.dev/). Just do :

```bash
# For yarn users
yarn dev
```

```bash
# For npm users
npm run dev
```

and voila ! when you save a file the browser automaticaly refresh and apply your modifications.

### Contributions
You can contribute on this project. Free feel to you to create pull request !