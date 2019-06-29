module.exports = () => {
    _.gulp.task("sprite:svg", () => {
        return _.gulp
            .src('source/images/icons/sprite-icons/*.svg')
            .pipe(_.glp.svgmin({
                js2svg: {
                    pretty: true
                }
            })
            )
            .pipe(_.glp.cheerio({
                run($) {
                    $("[fill], [stroke], [style], [width], [height]")
                        .removeAttr("fill")
                        .removeAttr("stroke")
                        .removeAttr("style");
                },
                parserOptions: { xmlMode: true }
            })
            )
            .pipe(_.glp.replace("&gt;", ">"))
            .pipe(_.glp.svgSprite({
                mode: {
                    symbol: {
                        sprite: "../sprite.svg"
                    }
                }
            })
            )
            .pipe(_.gulp.dest('dist/images/icons'));
    });
}