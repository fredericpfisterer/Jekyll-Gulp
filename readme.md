# Jekyll bower-plate

Bower install your favorite framework on top of Jekyll

## Features
* Framework agnostic
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

##  Installation
	git clone https://github.com/fredericpfisterer/jekyll-bower-plate.git
	npm install
	bower install --save yourfavoriteframework
	gulp

## build for production
	gulp build --production

###  Examples

#### [Zurb Foundation for Sites] (http://foundation.zurb.com/sites.html)
Learn more about Foundation for Sites

	bower install --save foundation-sites
Make sure you [include foundation] (http://foundation.zurb.com/sites/docs/sass.html) in your sass :

	@include foundation-everything;

#### [Bootstrap v4] (http://v4-alpha.getbootstrap.com/)

	bower install --save bootstrap#v4.0.0-alpha.2

#### [Susy] (http://susy.oddbird.net/)
Learn more about Sush

	bower install --save susy
