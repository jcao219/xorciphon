function update() {
    if(this.id == "encrypt_btn") {
        var res = xorEncrypt($("#textbox").val(), $("#key").val());
        $("#textbox").val(btoa(res));
    } else {
        var res = xorEncrypt(atob($("#textbox").val()), $("#key").val());
        $("#textbox").val(res);
    }
}

$(function () {
    $("#userctl").children("button").click(update);
});
