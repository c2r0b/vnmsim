import gulp from 'gulp';
import argv from 'yargs';
import gulpif from 'gulp-if';
import pug from 'gulp-pug';
import sass from 'gulp-sass';
import compass from 'compass-importer';
import sassInlineImage from 'sass-inline-image';
import fontAwesome from 'node-font-awesome';
import merge from 'merge-stream';
import rename from 'gulp-rename';
import zip from 'gulp-zip';
import uglifycss from 'gulp-uglifycss';
import concat from 'gulp-concat';
import concatFilenames from 'gulp-concat-filenames';
import server from 'gulp-express';
import bro from 'gulp-bro';
import babelify from 'babelify';
import uglifyify from 'uglifyify';

// production mode indicator
const production = argv.argv.production;

// use 'dist' folder for production output, dest otherwise
const dest = production ? 'dist' : 'build';

// tasks to be executed during build
const tasks = [
  'styles',
  'scripts',
  'samplesList',
  'samplesFolder',
  'samplesZip',
  'templates',
  'fonts'
];

// pug templates
gulp.task('templates', () => {
  gulp.src('src/templates/index.pug')
    .pipe(pug().on('error', console.error.bind(console)))
    .pipe(gulp.dest(dest));
});

// compile sass using compass
gulp.task('styles', () => {
  let sassStream = gulp.src('src/sass/main.sass')
    .pipe(sass(
      {
        importer: compass,
        outputStyle: production ? 'compressed' : 'nested',
        functions: sassInlineImage({}),
        includePaths: [fontAwesome.scssPath]
      }
    ).on('error', sass.logError));

  let codeMirror = gulp.src('node_modules/codemirror/lib/codemirror.css');
  let codeMirrorLint = gulp.src('node_modules/codemirror/addon/lint/lint.css');

  merge(sassStream, codeMirrorLint, codeMirror)
    .pipe(concat('app.css'))
    .pipe(rename('style.min.css'))
    .pipe(gulpif(production, uglifycss({ 'uglyComments': true })))
    .pipe(gulp.dest(dest + '/src'));
});

// font awesome
gulp.task('fonts', () => {
  gulp.src(fontAwesome.fonts)
    .pipe(gulp.dest(dest + '/fonts'));
});

// produce uglified app js code
gulp.task('scripts', () => {
  gulp.src('src/js/index.js')
    .pipe(
      bro({
        transform: [
          babelify.configure( { presets: ['es2015'] } ),
          production ? [ 'uglifyify', { global: true } ] : ''
        ]
      })
    )
    .pipe(rename('app.js'))
    .pipe(gulp.dest(dest + '/src'));
});

// create list of samples file names
let fileNameFormatter = filename => filename.split('.')[0];

gulp.task('samplesList', () => {
  gulp.src('samples/*.json')
    .pipe(concatFilenames('list.txt', {
      root: 'samples/',
      template: fileNameFormatter
    }))
    .pipe(gulp.dest(dest + '/samples'));
});

// copy samples folder
gulp.task('samplesFolder', () => {
  gulp.src('samples/**/*')
    .pipe(gulp.dest(dest + '/samples'));
});

// generate samples ZIP
gulp.task('samplesZip', () => {
  gulp.src('samples/*')
    .pipe(zip('samples.zip'))
    .pipe(gulp.dest(dest));
});

// default task
gulp.task('default', tasks, () => {

  // in development start server and watchers
  if (!production) {
    server.run(['app.js']);

    gulp.watch('src/templates/**/*', ['templates']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/locale/*.json', ['scripts']);
    gulp.watch('src/img/**/*', ['styles']);
    gulp.watch('src/sass/**/*.sass', ['styles']);
    gulp.watch('samples/*.json', ['samplesList', 'samplesFolder', 'samplesZip']);
    gulp.watch('build/**/*', server.notify);

  }
});
