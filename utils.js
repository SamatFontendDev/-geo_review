const sortPath = (paths) => {
    const pathList = [];
    (function recursiveSortPath(paths) {
        paths.forEach(path => {
            if (Array.isArray(path)) {
                recursiveSortPath(path);
            } else {
                pathList.push(path);
            }
        });
    })(paths);


    return pathList;
}

exports.parsePlugins = (plugins = [], settings) => {
    if (plugins.length) {
        const paths = plugins
            .filter((plugin) => {
                if (plugin.activated) return true;
            })
            .filter((plugin) => {
                if (plugin.type === settings.type) {
                    return true;
                }

                if (plugin.type === 'plugin' && (settings.type === 'css' || settings.type === 'js')) {
                    return true;
                }
            })
            .map((plugin) => {
                if (plugin.type === settings.type) {
                    return plugin.url;
                } else {
                    return plugin[settings.type];
                }
            });

        return sortPath(paths);
    } else {
        throw new Error('plugins in not found');
    }
}
