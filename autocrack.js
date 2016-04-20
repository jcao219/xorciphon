function update() {
    var text = $("#textbox").val();
    var textlen = text.length;
    var max_key_len = textlen / 2;
    
    var all_strides = {};
    for(var l = 1; l <= max_key_len; l++) {
        var strides = [];
        for(var i = 0; i + l < textlen; i += l) {
            var the_substr = text.substring(i, i + l);
            strides.push(the_substr);
            if(l == 6) console.log(the_substr);
        }
        all_strides[l] = strides;
    }
}

$(function () {
    $("#decrypt_btn").click(update);
});
