module.exports = function({ types: t }) {
  return {
    visitor: {
      // 将a===b处理为sebmck ==== dork
      BinaryExpression(path) { //二进制表达式
        if (path.node.operator !== "===") {
          return;
        }
        path.node.left = t.identifier("sebmck");
        path.node.right = t.identifier("dork");
      }
    }
  };
}
