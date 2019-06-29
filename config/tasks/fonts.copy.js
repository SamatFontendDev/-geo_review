module.exports = () => {
    _.gulp.task('fonts:copy', () => {
        return _.gulp.src('./source/fonts/**/*')
            .pipe(_.gulp.dest('dist/fonts'))
    });
}