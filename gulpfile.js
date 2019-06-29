global._ = {
    gulp: require('gulp'),
    delete: require('del'),
    bSync: require('browser-sync').create(),
    webpack: require('webpack-stream'),
    tasks: require('./config/path.json').tasks,
    dev: process.env.NODE_ENV == 'development' ? true : false,
    es: require('event-stream'),
    glp: require('gulp-load-plugins')({
        rename: {
            'gulp-replace-task': 'replaceTask'
        }
    })
}

for (const key in _.tasks) {
    require(_.tasks[key])();
}

_.gulp.task('default', _.gulp.series(
    'clean',
    'scss',
    'scripts',
    'vendor:css',
    'vendor:js',
    'handlebars',
    'images',
    'sprite:svg',
    'fonts:copy',
    'inject',
    _.gulp.parallel(
        'watch',
        'server'
    )
));

_.gulp.task('build', _.gulp.series(
    'clean',
    'handlebars',
    'scripts',
    'vendor:css',
    'vendor:js',
    'scss',
    'images',
    'sprite:svg',
    'fonts:copy',
    'inject'
));