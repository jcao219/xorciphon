function update() {
    var MAX_STRIDES = 7;

    var text = $("#textbox").val();
    var textlen = text.length;
    var max_key_len = textlen / 2;
    
    var all_strides = {};
    for(var l = 1; l <= max_key_len; l++) {
        var strides = [];
        for(var i = 0; i + l < textlen; i += l) {
            var the_substr = text.substring(i, i + l);
            strides.push(the_substr);
            if(strides.length >= MAX_STRIDES) {
                break; 
            }
        }
        all_strides[l] = strides;
    }

    all_H_dists = {};

    $.each(all_strides, function(len, strides) {
        for(var i = 0; i < strides.length - 1; i++) {
            all_H_dists[len] = hammingDistNorm(strides[i], strides[i+1]);
        }
    });

    console.log(all_H_dists);
}

$(function () {
    $("#decrypt_btn").click(update);
});
