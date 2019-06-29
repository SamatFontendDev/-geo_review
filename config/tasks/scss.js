module.exports = () => {
    _.gulp.task('scss', function () {
        return _.gulp.src('./source/sass/main.scss')
            .pipe(_.glp.if(_.dev, _.glp.sourcemaps.init()))
            .pipe(_.glp.sassGlob())
            .pipe(_.glp.sass()).on('error', _.glp.sass.logError)
            .pipe(_.glp.autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(_.glp.if(!_.dev, _.glp.csso()))
            .pipe(_.glp.if(!_.dev, _.glp.rename({ suffix: '.min' })))
            .pipe(_.glp.if(_.dev, _.glp.sourcemaps.write()))
            .pipe(_.gulp.dest('dist/css'))
            .pipe(_.bSync.stream());
    });
};