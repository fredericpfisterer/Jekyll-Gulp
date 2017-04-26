var fs = require('fs');
var yargs = require('yargs');
var yaml = require('js-yaml');
var sequence = require('run-sequence');
var del = require('del');
var gulp = require('gulp');
var spawn = require('cross-spawn');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var eslint = require('gulp-eslint');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var webpack = require('webpack-stream');
var rsync = require('gulp-rsync');

var PRODUCTION = !!(yargs.argv.production);

function loadConfig() {
    var ymlFile = fs.readFileSync('gulpconfig.yml', 'utf8');
    return yaml.load(ymlFile);
}
var config = loadConfig();
module.exports = config;

gulp.task('clean', function (done) {
    del(config.clean);
    done();
});

gulp.task('copy', function () {
    browserSync.notify(config.copy.notification);
    return gulp.src(config.copy.assets)
        .pipe(gulpif(PRODUCTION, imagemin()))
        .pipe(gulp.dest(config.copy.dist));
});

gulp.task('sass', function () {
    return gulp.src(config.sass.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(config.sass.compatibility))
        .pipe(gulpif(PRODUCTION, cssnano()))
        .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
        .pipe(gulp.dest(config.sass.dest.jekyllRoot))
        .pipe(gulp.dest(config.sass.dest.buildDir))
        .pipe(browserSync.stream());
});

gulp.task('eslint', function () {
    return gulp.src(config.javascript.src)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('javascript', ['eslint'], function () {
    browserSync.notify(config.javascript.notification);
    var webpackConfig = {
        output: {
            filename: "bundle.js"
        },
        devtool: 'source-map',
        module: {
            loaders: [{
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }]
        }
    }
    if (PRODUCTION){
        webpackConfig.devtool = '';
    }
    return gulp.src(config.javascript.src)
        .pipe(webpack(webpackConfig))
        .pipe(gulpif(PRODUCTION, uglify()))
        .pipe(gulp.dest('_site/assets/js/'))
});

gulp.task('jekyll-build', function (done) {
    browserSync.notify(config.jekyll.notification);
    return spawn('jekyll', ['build'], {
            stdio: 'inherit'
        })
        .on('close', done);
});

gulp.task('build', function (done) {
    sequence('clean', 'jekyll-build', ['sass', 'javascript'], 'copy', done);
});

gulp.task('browser-sync', function () {
    browserSync.init({
        notify: config.browsersync.notify,
        open: config.browsersync.open,
        port: config.browsersync.port,
        server: {
            baseDir: config.browsersync.server.basedir
        },
        xip: config.browsersync.xip,
        browser: config.browsersync.browser
    });
});

gulp.task('rsync', function() {
  return gulp.src('_site/**')
    .pipe(rsync({
      root: '_site/',
      hostname: config.deploy.hostname,
      destination: config.deploy.destination,
      username: config.deploy.username,
      incremental: true,
    }));
});

gulp.task('deploy', function(done){
    sequence('build', 'rsync', done);
});

gulp.task('default', function (done) {
    sequence('build', 'browser-sync', 'watch', done);
});

gulp.task('watch', function () {
    gulp.watch(config.watch.pages, ['build', browserSync.reload]);
    gulp.watch(config.watch.javascript, ['javascript', browserSync.reload]);
    gulp.watch(config.watch.sass, ['sass']);
    gulp.watch(config.watch.images, ['copy', browserSync.reload]);
});