const { parsePlugins } = require('../../utils');

module.exports = () => {
    _.gulp.task('vendor:js', (done) => {
        try {
            console.log("VENDOR_JS =>", parsePlugins(require('../plugins.json'), { type: 'js' }))
            _.gulp.src(parsePlugins(require('../plugins.json'), { type: 'js' }))
                .pipe(_.glp.concat('libs.js'))
                .pipe(_.glp.uglify())
                .pipe(_.glp.rename({ suffix: '.min' }))
                .pipe(_.gulp.dest('dist/js'))
            done();
        } catch (error) {
            console.log(`${error.message} vendor:js`);
            done();
        }
    });
}