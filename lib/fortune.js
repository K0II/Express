// 定义一个幸运饼干数组
var fortuneCookies = [
  "Conquer your fears or they will conquer you.",
  "Rivers need spring.",
  "Do not fear what you don`t know.",
  "You will have a pleasant surprise.",
  "Whenever possible, keep it simple."
];
exports.getFortune = function() {
  var index = Math.floor( Math.random() * fortuneCookies.length );
  return fortuneCookies[index];
}
