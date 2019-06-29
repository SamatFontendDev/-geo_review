module.exports = () => {
    _.gulp.task('images', (done) => {
        return _.gulp.src('./source/images/**/*')
            .pipe(_.gulp.dest('dist/images'))
    });
}