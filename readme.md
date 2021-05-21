

<h1 align=center>Velige</h1>
<p align=center>A Very Little Graphic Engine</p>

### Description
**Velige** is a little Graphics Engine created especially for a school project (*a game named [CodeCar]()*). Why ? because I like suffering... Seriously the reason why I make this is because I want to learn more about how game engines work the best way for me to learn how they work is to create one. 

This Graphics Engine is based on WebGL1 *(not compatible with WebGL2 for now)*. The code is quite well commented for me (I hope is the same for you) so you can see how the Graphics Engine works without too much trouble.

I use [TypeScript]() especially for typed data *(is very very lot more easier to code with typed data!)* with [Snowpack]() to build / debug the project (*very useful !*). 

For the package manager I use [Yarn]() for speed and it have a better package management compared to [NPM]() (sorry for NPM users) but you can use both.

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
When you modify the code you want to see in real time (when you saved the file that you are modified) the modification. You can't use the [Live Server]() extension for [Visual Studio Code]() for that but hopefuly we have [Snowpack](). Just do :

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