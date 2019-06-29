module.exports = () => {
    _.gulp.task('clean', (cb) => {
        return _.delete('./dist', cb);
    });
};