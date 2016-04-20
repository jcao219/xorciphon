function updateResults() {
    $("#frequent_sequences").empty();

    var ciphertext = atob($("#ciphertext").val());
    var cribtext = $("#crib").val();
    var crib_len = cribtext.length;

    if(crib_len == 0) {
        // Nothing inputed for crib.
        return;
    }

    for(var i = 0; i < ciphertext.length - crib_len; i++) {
        var curr_thing = "";
        for(var j = 0; j < crib_len; j++) {
            var single_xor_result = cribtext.charCodeAt(j) ^ ciphertext.charCodeAt(i + j);
            curr_thing += String.fromCharCode(single_xor_result);
        }

        if(/^[\x20-\x7E]+$/.test(curr_thing)) {
            if(/^[A-Za-z ]+$/.test(curr_thing)) {
                $("#frequent_sequences").append(
                    '<strong><p data-starti="'+ i +'" data-endi="' + (i + j) + '">' + curr_thing + "</p></strong>"); 
            } else {
                $("#frequent_sequences").append(
                    '<div><p data-starti="'+ i +'" data-endi="' + (i + j) + '">' + curr_thing + "</p></div>"); 
            }
        }
    }
}

$(function () {
    $("#do_it").click(updateResults);
});
