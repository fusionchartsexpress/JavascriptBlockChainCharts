// webpack.config.js
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );
module.exports = {
   context: __dirname,
   entry: './src/index.js',
   output: {
      path: path.resolve( __dirname, 'dist' ),
      filename: 'main.js',
   },

   plugins: [
      new HtmlWebPackPlugin()
   ],
   devServer: {
       headers: {
           "Access-Control-Allow-Origin": "*",
           "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
           "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
         },
       proxy: {
         '/BlockchainAPI': {
            target: 'https://api.blockchain.info',
            pathRewrite: { '^/BlockchainAPI': 'https://api.blockchain.info/charts/transactions-per-second?timespan=1weeks&format=json'},
            changeOrigin: true,
         },
       },

     }
};
