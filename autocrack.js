function tranpose(s, len) {
    var result = [];
    for(var pos = 0; pos < len; pos++) {
        for(var i = pos; i < s.length; i += len) {
            curr_res += s[i];
        }
        result.push(curr_res);
    }
    return result;
}

function retry() {
    if(window.H_dists == undefined) {
        console.log(":(");
        return;
    }
    if(window.H_dists.length == 0) {
        alert("Nothing more to work with.");
    }
    var item = all
}

function update() {
    var MAX_STRIDES = 15;

    var text = atob($("#textbox").val());
    var textlen = text.length;
    var max_key_len = textlen / 2;
    
    var all_strides = {};
    for(var l = 1; l < max_key_len; l++) {
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

    all_H_dists = [];

    $.each(all_strides, function(len, strides) {
        if(strides.length < 2) {
            console.log(len + " <- this len is giving me trouble.");
            return;
        }
        var total = 0;
        for(var i = 0; i < strides.length - 1; i++) {
            total += hammingDistNorm(strides[i], strides[i+1]);
        }
        // Average peephole-pairwise Hamming weight:
        var abs_dist = total / (strides.length - 1);
        var biased_dist = abs_dist + len / max_key_len;
        all_H_dists.push({len: len, dist: max_key_len});
    });

    all_H_dists.sort(function(a, b) {return a.dist - b.dist; } );

    console.log(all_H_dists[0]);
    window.H_dists = all_H_dists;

    retry();
}

$(function () {
    $('#textbox').bind('input propertychange', function() {
        window.H_dists = undefined;
        $("#decrypt_btn").text("Decrypt");
    }); 
    $("#decrypt_btn").click(function() { 
        window.H_dists == undefined ? update() : retry();
        $("#decrypt_btn").text("Next");
    });
});
