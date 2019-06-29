const { parsePlugins } = require('../../utils');

module.exports = () => {
    _.gulp.task('vendor:css', (done) => {
        try {
            console.log("VENDOR_CSS =>", parsePlugins(require('../plugins.json'), { type: 'css' }))
            _.gulp.src(parsePlugins(require('../plugins.json'), { type: 'css' }))
                .pipe(_.glp.concat('libs.css'))
                .pipe(_.glp.if(!_.dev, _.glp.csso()))
                .pipe(_.glp.if(!_.dev, _.glp.rename({ suffix: '.min' })))
                .pipe(_.gulp.dest('dist/css'));
            done();
        } catch (error) {
            console.log(`${error.message} vendor:css`);
            done();
        }
    });
}
