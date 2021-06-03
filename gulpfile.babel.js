import gulp, { src, dest, task, watch, series, parallel } from 'gulp';
// HTML
import htmlmin from 'gulp-htmlmin';
// CSS
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import cleancss from 'gulp-clean-css';
import autoprefixer from 'autoprefixer';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps'
// JS
import babel from 'gulp-babel';
import terser from 'gulp-terser';
import concat from 'gulp-concat';
// PRODUCTION
import replace from 'gulp-replace';
import gulpif from 'gulp-if';
import yargs from 'yargs';
import del from 'del';
// BROWSERSYNC
import {init as server, stream, reload} from 'browser-sync';

const PRODUCTION = yargs.argv.prod;


const paths = {
  html: {
    files: 'sources/html/*.html',
    dest: 'app/'
  },
  styles: {
    cssSources: 'sources/assets/css/*.css',
    scss: 'sources/scss/*.scss',
    dest: 'app/css'
  },
  js: {
    jsSources: 'sources/assets/js/*.js',
    jsMain: 'sources/js/main.js',
    dest: 'app/js'
  },
  maps: {
    files: 'sources/assets/maps/*.js',
    dest: 'app/js/maps'
  },
  images: {
    files: 'sources/assets/images/**',
    dest: 'app/img'
  },
  production: {
    files: 'app/**',
    dest: 'docs/'
  }
}

task('compilehtml', () => {
  return(src(paths.html.files))
  .pipe(gulpif(PRODUCTION, htmlmin({collapseWhitespace: true, removeComments: true})))
  .pipe(rename('index.html'))
  .pipe(gulpif(PRODUCTION, replace('styles.css', 'styles.min.css')))
  .pipe(gulpif(PRODUCTION, replace('main.js', 'main.min.js')))
  .pipe(dest(paths.html.dest))
})

task('styles', () => {
  return src(paths.styles.scss)
  .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
  .pipe(gulpif(!PRODUCTION, sass({outputStyle: 'expanded'}).on('error', sass.logError), sass({outputStyle: 'compressed'})))
  .pipe(postcss([autoprefixer()]))
  .pipe(gulpif(!PRODUCTION, rename('styles.css'), rename('styles.min.css')))
  .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
  .pipe(dest(paths.styles.dest))
  .pipe(stream())
})

task('compileCss', () => {
  return src(paths.styles.cssSources)
  .pipe(concat('resources.min.css'))
  .pipe(cleancss({compatibility: 'ie8'}))
  .pipe(dest(paths.styles.dest))
})

task('mainJs', () => {
  return(src(paths.js.jsMain))
  .pipe(babel())
  .pipe(gulpif(PRODUCTION, terser()))
  .pipe(gulpif(!PRODUCTION, rename('main.js'), rename('main.min.js')))
  .pipe(dest(paths.js.dest))
})

task('compileJs', () => {
  return(src(paths.js.jsSources))
  .pipe(concat('resources.min.js'))
  .pipe(terser())
  .pipe(dest(paths.js.dest))
})

task('maps', () => {
  return(src(paths.maps.files))
  .pipe(terser())
  .pipe(dest(paths.maps.dest))
})

task('compileImages', () => {
  return(src(paths.images.files))
  .pipe(dest(paths.images.dest))
})

task('compileProd', () => {
  return(src(paths.production.files))
  .pipe(dest(paths.production.dest))
})

task('clean', () => del(['app']))

task('cleanProd', () => del(['docs']))

task('startServer', (done) => {
  server({
    server: './app',
    injectChanges: true,
    open: false
  })
  done();
})


task('watch', () => {
  watch(paths.html.files,  series('compilehtml')).on('change', reload)
  watch(paths.styles.scss, series('styles'))
  watch(paths.js.jsSources, series('compileJs'))
  watch(paths.maps.files, series('maps')).on('change', reload)
  watch(paths.js.jsMain, series('mainJs')).on('change', reload)
  watch(paths.images.files, series('compileImages')).on('change', reload)
})

task('default', series('clean', 'cleanProd', parallel('compilehtml', 'styles', 'mainJs', 'compileJs', 'maps', 'compileImages'), 'startServer', 'watch'))

task('prod', series('clean', 'cleanProd', parallel('compilehtml', 'styles', 'mainJs', 'compileJs', 'maps', 'compileImages'), 'compileProd'))