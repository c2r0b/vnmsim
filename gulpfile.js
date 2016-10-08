var gulp = require('gulp'),
    argv = require('yargs').argv,
    gulpif = require('gulp-if'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    compass = require('compass-importer'),
    sassInlineImage = require('sass-inline-image'),
    fontAwesome = require('node-font-awesome'),
    merge = require('merge-stream'),
    rename = require("gulp-rename"),
    zip = require('gulp-zip'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    concat = require('gulp-concat'),
    concatFilenames = require('gulp-concat-filenames'),
    server = require('gulp-express'),
    browserify = require('gulp-browserify');

// use 'dist' folder for production output, dest otherwise
var dest = argv.production ? 'dist' : 'build';

// pug templates
gulp.task('templates', function() {
  return gulp.src('src/templates/index.pug')
    .pipe(pug().on('error', console.error.bind(console)))
    .pipe(gulp.dest(dest));
});

// compile sass using compass
gulp.task('styles', function() {
  var sassStream = gulp.src('src/sass/main.sass')
    .pipe(sass(
      {
        importer: compass,
        outputStyle: argv.production ? 'compressed' : 'nested',
        functions: sassInlineImage({}),
        includePaths: [fontAwesome.scssPath]
      }
    ).on('error', sass.logError));

  var codeMirror = gulp.src('node_modules/codemirror/lib/codemirror.css');
  var codeMirrorLint = gulp.src('node_modules/codemirror/addon/lint/lint.css');

  return merge(sassStream, codeMirrorLint, codeMirror)
    .pipe(concat('app.css'))
    .pipe(rename('style.min.css'))
    .pipe(gulpif(argv.production, uglifycss({ 'uglyComments': true })))
    .pipe(gulp.dest(dest));
});

// font awesome
gulp.task('fonts', function() {
  return gulp.src(fontAwesome.fonts)
    .pipe(gulp.dest(dest + '/fonts'));
});

// produce uglified app js code
gulp.task('scripts', function() {
  return gulp.src('src/js/index.js')
    .pipe(browserify(
      {
        debug: !argv.production
      }
    ).on('error', console.error.bind(console)))
    .pipe(
      gulpif(
        argv.production,
        uglify().on('error', console.error.bind(console))
      )
    )
    .pipe(rename('app.js'))
    .pipe(gulp.dest(dest));
});

// create list of samples file names
function fileNameFormatter(filename) {
   return filename.split('.')[0];
}
gulp.task('samplesList', function () {
  return gulp.src('samples/*.json')
    .pipe(concatFilenames('list.txt', {
      root: 'samples/',
      template: fileNameFormatter
    }))
    .pipe(gulp.dest(dest + '/samples'));
});

// copy samples folder
gulp.task('samplesFolder', function () {
  return gulp.src('samples/**/*')
    .pipe(gulp.dest(dest + '/samples'));
});

// generate samples ZIP
gulp.task('samplesZip', () => {
    return gulp.src('samples/*')
      .pipe(zip('samples.zip'))
      .pipe(gulp.dest(dest));
});

// server and watchers
gulp.task('server', function () {
  server.run(['app.js']);

  gulp.watch('src/templates/**/*', ['templates']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/locale/*.json', ['scripts']);
  gulp.watch('src/img/**/*', ['styles']);
  gulp.watch('src/sass/**/*.sass', ['styles']);
  gulp.watch('samples/*.json', ['samplesList', 'samplesFolder', 'samplesZip']);
  gulp.watch('build/**/*', server.notify);
});

// tasks to be executed during build
var tasks = [
  'styles',
  'scripts',
  'samplesList',
  'samplesFolder',
  'samplesZip',
  'templates',
  'fonts',
  'server'
];
// remove server task in production mode
if (argv.production) tasks.pop();

// default task
gulp.task('default', tasks, function() {
  // end message
  console.log('Build ended');
});
