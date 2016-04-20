function update() {
    var res = xorEncrypt($("#textbox").val(), $("#key").val());
    if(this.id == "encrypt_btn") {
        $("#textbox").val(atob(res));
    } else {
        $("#textbox").val(btoa(res));
    }
}

$(function () {
    $("#userctl").children("button").click(update);
});
