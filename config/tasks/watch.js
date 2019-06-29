module.exports = () => {
    _.gulp.task('watch', () => {
        _.gulp.watch('./source/sass/**/*.scss', _.gulp.series('scss', 'inject'));
        _.gulp.watch('./source/view/**/*.hbs', _.gulp.series('handlebars', 'inject'))
            .on("change", _.bSync.reload);
        _.gulp.watch('./source/js/**/*.js', _.gulp.series('scripts', 'inject'))
            .on("change", _.bSync.reload);
    });
};