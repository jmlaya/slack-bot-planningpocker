module.exports = function(string){

    var find = /(\-\w)/g;
    var convert =  function(matches){
        return matches[1].toUpperCase();
    };

    return string.replace(
        find,
        convert
    );
};
