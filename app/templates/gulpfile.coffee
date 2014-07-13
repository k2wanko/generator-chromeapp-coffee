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

jade = require 'gulp-jade'

stylus = require 'gulp-stylus'

gulp.task 'default', ['manifest']

gulp.task 'manifest', ->
  gulp.src 'src/manifest.yml'
  .pipe yml().on( "error", gutil.log )
  .pipe gulp.dest 'app/'

gulp.task 'scripts', ->
  

gulp.task 'html', ->

gulp.task 'style', ->
