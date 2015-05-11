# SFCrimeMapping

This project is built with Yeoman.io
## Versioning

```sh
$ node -v
v0.12.2
$ npm -v
2.7.4
$ bower -v
1.4.1
```

## Setup
run this to install our dependencies
```sh
npm install -g yo
bower install && npm install
```


##Serve the development server with
```sh
grunt server
```

That will start a livereloading server


Docker will build the container automatically then you just need to run:

```
docker run -d -p 2000:800 anabranch/sfcrime-viewer
```

The app will be available on port 2000 with that code.
