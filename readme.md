# Jekyll Gulp

Use Gulp on top of Jekyll

> I actually won't maintain this repo anymore as I migrated to laravel mix : https://github.com/fredericpfisterer/jekyll-mix

## Features
* Bourbon Bitters and Neat preinstalled
* Gulp yaml config file
* Automatically inject bower dependencies (SASS and JavaScript)
* Clean and build Jekyll
* Sass compilation and prefixing
* JavaScript concatenation
* Built-in BrowserSync server
* Travis deployment ready
* For production builds:
	* CSS compression
	* JavaScript compression
	* Minify PNG, JPEG, GIF and SVG images
* Deploy with rsync

## Requirements
* Nodejs
* Gulp
* Bower
* Jekyll
* Bundler

##  Installation
	git clone https://github.com/fredericpfisterer/jekyll-bower-plate.git
	cd jekyll-bower-plate
	npm install or yarn
	bower install --save yourfavoriteframework
	bundle install

## dev
	gulp

## production
	gulp build --production

