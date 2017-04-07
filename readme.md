# Jekyll Gulp

Use Gulp on top of Jekyll

## Features
* Bourbon Bitters and Neat preinstalled
* gulp yaml config file
* Automatically inject bower dependencies (SASS and JavaScript)
* Clean and build Jekyll
* Sass compilation and prefixing
* JavaScript concatenation
* Built-in BrowserSync server
* Travis deployment ready
* For production builds:
	* CSS compression
	* JavaScript compression

## Requirements
* Nodejs
* Gulp
* Bower
* Jekyll
* Bundler

##  Installation
	git clone https://github.com/fredericpfisterer/jekyll-bower-plate.git
	cd jekyll-bower-plate
	npm install
	bower install --save yourfavoriteframework
	bundle install

## dev
	gulp

## production
	gulp build --production

