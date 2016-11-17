var webpack=require('webpack'),path=require('path');
module.exports={
	// devServer: {
 //        inline: true,
        
 //        port: 3000
 //    },
	// context: __dirname+'/app',
	entry: {
		app: './app/app.js',		
	},
	output: {
		path: __dirname+'/public',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ['babel-loader']
			},
			{
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
			{
                test: /\.css$/,
                loader: 'style-loader!css-loader!'
            }
		]
	},
	watch: true,
	//devtool:'cheap-source-map',
	plugins: [
        new webpack.SourceMapDevToolPlugin({})
    ]
}

// module.exports={
// 	entry: './app.js',
// 	output: {
// 		path: 'public',
// 		filename: 'bundle.js'
// 	},
// 	module: {
// 		loaders: [
// 			{
// 				test: /\.js$/,
// 				exclude: /node_modules/,
// 				loaders: ['babel-loader']
// 			},
// 			{
// 				test: /\.scss$/,
//                 loader: 'style-loader!css-loader!sass-loader'
// 			}
// 		]
// 	}
// };

// var HtmlWebpackPlugin = require("html-webpack-plugin");

// var webpackConfig = {
// 	entry: "./src/app.js",
// 	output: {
// 		path: "build",
// 		filename: "bundle.js"
// 	},
// 	module: {
// 		loaders: [
// 			{
// 				loader: "babel-loader",
// 				test: /\.js$/
// 			},
// 			{
//                 test: /\.scss/,
//                 loader: 'style-loader!css-loader!sass-loader'
//             }
// 		]
// 	},
// 	plugins: [
// 		new HtmlWebpackPlugin({
// 			template: "src/index.ejs"
// 		})
// 	]
// };

// module.exports = webpackConfig;
