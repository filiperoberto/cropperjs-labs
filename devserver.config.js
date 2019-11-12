module.exports = {
    /*proxy: {
        '/api/*': 'http://url.of.prod.api/'
    },*/
    publicPaths: {
        '/assets': 'assets'
    },
    mockPath: 'mock',
    app: '/index.html', // this can also be an express app
    //serverConfig: {}, // config for webpack-hot-server-middleware
    port: 5450, // 3000 by default
};