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

function printable(s) {
    return /^[\x20-\x7E]+$/m.test(s);
}

function printable_char(c) {
    var ord = c.charCodeAt(0);
    return ord >= 32 && ord <= 126;
}

function freq_score(s) {
    var inner = function(s, score) {
        if(s == "") return score;

        switch(s[0].toLowerCase()) {
            case 'e':
                score += 21.9;
                break;
            case 't':
                score += 16.6;
                break;
            case 'a':
                score += 14.8;
                break;
            case 'o':
                score += 14.0;
                break;
            case 'i':
                score += 13.3;
                break;
            case 'n':
                score += 12.6;
                break;
            case 's':
                score += 11.4;
                break;
            case 'r':
                score += 10.9;
                break;
            case 'h':
                score += 10.7;
                break;
            case 'd':
                score += 7.8;
                break;
            case 'l':
                score += 7.2;
                break;
            case 'u':
                score += 5.3;
                break;
            case 'c':
                score += 5.0;
                break;
            case 'm':
                score += 4.7;
                break;
            case 'f':
                score += 4.2;
                break;
            case 'y':
            case 'w':
                score += 3.8;
                break;
            case 'g':
                score += 3.7;
                break;
            case 'p':
                score += 3.3;
                break;
            case 'b':
                score += 2.7;
                break;
            case 'v':
                score += 2.0;
                break;
            case '.':
                score += 1.9;
                break;
            case '\n':
                score += 1.7;
                break;
            case 'k':
                score += 1.2;
                break;
            case 'x':
                score += 0.3;
                break;
            case 'q':
            case 'j':
            case 'z':
                score += 0.1;
                break;
            default:
                if(printable_char(s[0])) {
                    score += 0.1;
                } else {
                    score += -11; 
                }
                break;
        }
        return inner(s.substring(1), score);
    };

    return inner(s, 0);
}
