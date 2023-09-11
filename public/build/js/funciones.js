function toggleSidebar() {
  let sidebar = document.getElementById("sidebar");
  let menu = document.getElementById("menu-toggle");
  if (sidebar.style.translate === "0px") {
    sidebar.style.translate = "-200px";
    menu.style.marginLeft = "0px";
    menu.style.rotate = "0deg";
    document.getElementById("menu-toggle").innerHTML =
      '<i class="fa fa-bars"></i>';
  } else {
    sidebar.style.translate = "0px";
    menu.style.marginLeft = "195px";
    menu.style.transition = "0.5s";
    menu.style.rotate = "180deg";
    document.getElementById("menu-toggle").innerHTML =
      '<i class="fa fa-bars"></i>';
  }
}
document.getElementById("menu-toggle").addEventListener("click", toggleSidebar);

const servicio = () => {
  let flecha = document.getElementById("flecha");
  if (flecha.style.rotate === "-180deg") {
    flecha.style.rotate = "0deg";
  } else {
    flecha.style.rotate = "-180deg";
    flecha.style.transition = "0.5s";
  }
};
document.getElementById("servicio").addEventListener("click", servicio);

$(document).ready(function () {
  $("#servicio").click(function () {
    $("#servUl").slideToggle(500);
    $("#servUl").show();
  });
});

$(document).click(function (event) {
  if (
    !$(event.target).closest("#servicio").length &&
    !$(event.target).closest("#servUl").length
  ) {
    if ($("#servUl").is(":visible")) {
      document.getElementById("flecha").style.rotate = "0deg";
      $("#servUl").hide();
    }
  }
});

const venta = () => {
  let flecha = document.getElementById("flecha2");
  if (flecha.style.rotate === "-180deg") {
    flecha.style.rotate = "0deg";
  } else {
    flecha.style.rotate = "-180deg";
    flecha.style.transition = "0.5s";
  }
};
document.getElementById("venta").addEventListener("click", venta);

$(document).ready(function () {
  $("#venta").click(function () {
    $("#venUl").slideToggle(500);
    $("#venUl").show();
  });
});

$(document).click(function (event) {
  if (
    !$(event.target).closest("#venta").length &&
    !$(event.target).closest("#venUl").length
  ) {
    if ($("#venUl").is(":visible")) {
      document.getElementById("flecha2").style.rotate = "0deg";
      $("#venUl").hide();
    }
  }
});
