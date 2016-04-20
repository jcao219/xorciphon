function xorEncrypt(text, key) {
    var key_len = key.length;
    var result = "";
    for(var i = 0; i < text.length; i++) {
        key_pos = i % key_len;
        result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(key_pos));
    }
    return result;
}

function hammingWeight(i) {
    i = i - ((i >> 1) & 0x55555555);
    i = (i & 0x33333333) + ((i >> 2) & 0x33333333);
    return ((i + (i >> 4) & 0xF0F0F0F) * 0x1010101) >> 24;
}

function hammingDistNorm(s1, s2) {
    if(s1.length != s2.length) {
        throw new Error('Cannot do this when they are differing lengths.');
    }

    var len = s1.length;
    var xorResult = xorEncrypt(s1, s2);

    var totalWeight = 0;
    for(var i = 0; i < len; i++) {
        totalWeight += hammingWeight(xorResult.charCodeAt(i));
    }
    var normWeight = totalWeight / len;
    return normWeight;
}
