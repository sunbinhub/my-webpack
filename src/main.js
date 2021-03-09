//导入aa模块
require("./aa");
//导入jquery
const $ = require("jquery");
//导入css
require("./css/base.css");
require("./css/index.css");

//导入less
require("./less/head.less");

console.log("hello world!");

//需求：通过jquery实现隔行变色
$(function () {
  $("#app li:nth-child(odd)").css("color", "red");
  $("#app li:nth-child(even)").css("color", "green");
});
