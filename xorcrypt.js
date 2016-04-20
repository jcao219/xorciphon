function update() {
    var res = xorEncrypt($("#textbox").val(), $("#key").val());
    if(this.id == "encrypt_btn") {
        $("#textbox").val(btoa(res));
    } else {
        $("#textbox").val(atob(res));
    }
}

$(function () {
    $("#userctl").children("button").click(update);
});
