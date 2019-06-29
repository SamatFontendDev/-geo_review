const { parsePlugins } = require('../../utils');

module.exports = () => {
    _.gulp.task('inject', function () {
        console.log('API =>', parsePlugins(require('../plugins.json'), { type: 'API' }))
        return _.gulp.src('./dist/index.html')
            .pipe(_.glp.inject(_.gulp.src('./dist/**/*.js', { read: false }), { relative: true }))
            .pipe(_.glp.inject(_.gulp.src('./dist/**/*.css', { read: false }), { relative: true }))
            .pipe(_.glp.htmlReplace({
                sdk: {
                    src: parsePlugins(require('../plugins.json'), { type: 'API' }),
                    tpl: '<script src="%s"></script>'
                }
            }))
            .pipe(_.gulp.dest('./dist'))
    });
}