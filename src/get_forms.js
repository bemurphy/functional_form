module.exports = function(callback) {
  $.get("http://localhost:9393/forms/", function(data){
    callback(null, data);
  });
};
