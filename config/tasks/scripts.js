module.exports = () => {
    _.gulp.task('scripts', () => {
        return _.gulp.src('./source/js/app.js')
            .pipe(_.webpack(require('../../webpack.config.js')))
            .pipe(_.gulp.dest('./dist/js'));
    });
}