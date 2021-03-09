//导入path模块
const path = require("path");
//引入自动生成 html的插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
//引入分离css文件的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//引入清除插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

//配置webpack的配置文件，需要将配置的对象导出，给webpack使用
module.exports = {
  //1、入口 entry，从哪个文件开始打包
  entry: "./src/main.js",

  //2、出口 output， 打包到哪里去
  output: {
    //打包输出的目录（输出的目录必须是一个绝对路径）
    path: path.join(__dirname, "dist"),
    //打包后生成的文件名
    filename: "js/bundle.js",
  },

  //3、模式mode development未压缩的，production压缩
  mode: "development",

  //4、配置module模块加载规则
  //默认，webpack只认识json、JavaScript，不认识其他文件，如果希望打包处理其他文件，需要配置对应loader
  module: {
    rules: [
      //（1）配置css文件的解析
      {
        //正则：匹配所有以css结尾的文件
        test: /\.css$/,
        //实际处理顺序：从右往左
        //css-loader让webpack能够识别解析css文件
        //style-loader通过动态创建style标签的方式，让解析后的css内容，能够作用到页面中
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          "css-loader",
        ],
      },
      //（2）配置less文件的解析
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          "css-loader",
          "less-loader",
        ],
      },
      //（3）配置图片文件的解析 i 表示忽视大小写 .PNG
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          //url-loader 如果不配置，默认都会将文件转成base64字符串的格式
          {
            loader: "url-loader",
            options: {
              //超过17K就不转base64，小于17K才转字符串
              limit: 17 * 1024,
              //配置输出的文件名
              name: "[name].[ext]",
              //配置静态资源的引用路径
              publicPath: "../images",
              //配置输出的文件目录
              outputPath: "images",
            },
          },
        ],
      },
    ],
  },

  //5、配置插件
  plugins: [
    //处理自动生成html的插件
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    //分离css的插件，定义打包好的文件的存放路径和文件名
    new MiniCssExtractPlugin({ filename: "css/index.css" }),
    //调用清除dist目录插件
    new CleanWebpackPlugin(),
  ],
};
