function xorEncrypt(text, key) {
    var key_len = key.length;
    var result = "";
    for(var i = 0; i < text.length; i++) {
        key_pos = i % key_len;
        result += String.fromCharCode(text.charCodeAt(1) ^ key.charCodeAt(key_pos));
    }
    return result;
}
