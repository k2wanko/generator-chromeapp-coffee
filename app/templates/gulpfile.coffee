
gulp = require 'gulp'
gutil = require 'gulp-util'

yml = require 'gulp-yml'

include = require 'gulp-include'
coffee = require 'gulp-coffee'
sourcemaps = require 'gulp-sourcemaps'
uglify = require 'gulp-uglify'

jade = require 'gulp-jade'

stylus = require 'gulp-stylus'

zip = require 'gulp-zip'

bower = require 'gulp-bower-files'

gulp.task 'default', ['manifest', 'locales', 'js', 'html', 'css']

gulp.task 'watch', ['default'], ->
  gulp.watch 'src/manifest.yml', ['manifest']
  gulp.watch 'src/_locales/**/*.yml', ['locales']
  gulp.watch 'src/*.coffee', ['js']
  gulp.watch 'src/*.jade', ['html']
  gulp.watch 'src/*.styl', ['css']

gulp.task 'manifest', ->
  gulp.src 'src/manifest.yml'
  .pipe yml().on( 'manifest:error', gutil.log )
  .pipe gulp.dest 'app/'

gulp.task 'bower', ->
  bower()
  .pipe gulp.dest 'app/lib/'

gulp.task 'locales', ->
  gulp.src 'src/_locales/**/*.yml'
  .pipe yml().on( 'manifest:error', gutil.log )
  .pipe gulp.dest 'app/_locales/'

gulp.task 'js', ->
  gulp.src 'src/*.coffee'
  .pipe include()
  .pipe coffee().on( 'coffee:error', gutil.log )
  .pipe sourcemaps.init()
  .pipe uglify()
  .pipe sourcemaps.write( './maps' )
  .pipe gulp.dest 'app/'
    
gulp.task 'html', ->
  gulp.src 'src/*.jade'
  .pipe jade()
  .pipe gulp.dest 'app/'
    
gulp.task 'css', ->
  gulp.src 'src/*.styl'
  .pipe stylus()
  .pipe gulp.dest 'app/'

gulp.task 'package', ['default'], ->
  gulp.src 'app/*'
  .pipe zip 'package.zip'
  .pipe gulp.dest './'
