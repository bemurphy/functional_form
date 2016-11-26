module.exports = function(formId, callback) {
  console.log('getting submissions for formId', formId);

  $.get(`http://localhost:9393/submissions/${formId}`, function(data){
    callback(null, data);
  });
};
