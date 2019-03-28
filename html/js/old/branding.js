// No longer used... brand now in config.php and filled in from frags
let brand = "Pubbly";
window.setTimeout(function () {
    let title = document.head.getElementsByTagName("title")[0].innerHTML;
    document.head.getElementsByTagName("title")[0].innerHTML = brand + " " + title;
}, 1);
