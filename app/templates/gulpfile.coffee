###
#
# #
#
###

gulp = require 'gulp'
gutil = require 'gulp-util'

yml = require 'gulp-yml'

include = require 'gulp-include'
coffee = require 'gulp-coffee'
sourcemaps = require 'gulp-sourcemaps'
uglify = require 'gulp-uglify'

jade = require 'gulp-jade'

stylus = require 'gulp-stylus'

gulp.task 'default', ['manifest', 'scripts']

gulp.task 'manifest', ->
  gulp.src 'src/manifest.yml'
  .pipe yml().on( 'manifest:error', gutil.log )
  .pipe gulp.dest 'app/'

gulp.task 'scripts', ->
  gulp.src 'src/*.coffee'
  .pipe include()
  .pipe coffee().on( 'coffee:error', gutil.log )
  .pipe sourcemaps.init()
  .pipe uglify()
  .pipe sourcemaps.write( './maps' )
  .pipe gulp.dest 'app/'
    
gulp.task 'html', ->

gulp.task 'style', ->