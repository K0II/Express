// 静态资源映射器

var baseUrl = '';

// 从配置文件中读取 baseUrl 的值

exports.map = function(name){
        return baseUrl + name;
};
