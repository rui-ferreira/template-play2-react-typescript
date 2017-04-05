# Play 2 / React / Typescript sample application

This is a sample project to illustrate how to setup [Play 2](https://playframework.com/) to work with [React](https://facebook.github.io/react) and [Typescript](https://www.typescriptlang.org).

Checkout the project to use it as base for your own clone or rebuild it step by step by following instructions below.

After checkout, type `cd frontend && yarn install` to install all frontend dependencies (you just need to do this once).

To start the application, just type `activator run`.

## Tools

- [Play 2](https://playframework.com/)
- [React](https://facebook.github.io/react)
- [Typescript](https://www.typescriptlang.org)
- [Webpack 2](https://webpack.js.org/)
- [Yarn](https://yarnpkg.com/) (NPM works fine as well)
- [Apache Ant](http://ant.apache.org/) (optional)

## Project structure

This project has the standard Play 2 folder structure, with an additional `frontend` folder where all client-side code written with React/Typescript will reside.

## Build workflow

You should use the documented Play commands to [run your application](https://playframework.com/documentation/2.5.x/PlayConsole) or to prepare the [distributable package](https://playframework.com/documentation/2.5.x/Deploying) for deployment.

### Development

While developing the application, use the `run` command in the SBT console. The SBT console can be started with any of these commands: `sbt`, `activator` or `play`.

In this mode, the server will be launched with the auto-reload feature enabled, meaning that for each request Play will check your project and recompile required sources. If needed the application will restart automatically.

Our SBT build (`build.sbt`) registers a Play hook to also watch for changes in the frontend code. Take a look at `project/FrontendWatch.scala`: it starts `webpack` in watch mode when the Play app starts and stops the process when the app stops. Webpack will bundle all frontend code nicely and put it in `public/frontend` (btw, you should `git-ignore` this folder), which is already under Play's standard umbrella.

Simply put, just run your old known `activator run`, write your code and reload the browser to see it coming to life.


### Production

The best and usual approach to create a production distributable in Play is to use the `dist` task. This task builds a binary version of your application that you can deploy to a server without any dependency on SBT, the only thing the server needs is a Java installation.

To build the frontend assets production-ready, we use `webpack -p`. Unfortunately, there's no simple way to automate this in the SBT stages in a way that it would run only when `sbt dist` is called. This means you first need to build the frontend assets and then run the SBT task, as follows:
    
    cd frontend
    yarn run dist
    cd ..
    activator dist

If you use Apache ANT, you can automate this easily by creating a simple target and making your main dist task depend on it:

```xml
<target name="frontend-dist" description="Generates frontend dist">
    <exec executable="yarn" dir="frontend">
        <arg value="install" />
    </exec>

    <exec executable="yarn" dir="frontend">
        <arg value="run" />
        <arg value="dist" />
    </exec>
</target>

<target name="zipdist" depends="frontend-dist" description="Generate the distribution package">
    <exec executable="activator">
        <arg value="clean"/>
        <arg value="dist"/>
    </exec>
    <!--...-->
</target>    
```    
