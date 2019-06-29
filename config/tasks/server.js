module.exports = () => {
    _.gulp.task('server', () => {
        _.bSync.init({
            server: "./dist",
            port: 8080
        });
    });
}