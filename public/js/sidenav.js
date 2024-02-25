function toggleNav() {
    var sideNav = document.getElementById("sideNav");
    // Toggle based on current width and screen width
    if (sideNav.style.width === "250px" || (sideNav.style.width === "100%" && window.innerWidth <= 700)) {
        sideNav.style.width = "0"; // Close nav
    } else {
        // Open nav with appropriate width based on device
        sideNav.style.width = window.innerWidth <= 700 ? "100%" : "250px";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var links = document.querySelectorAll("#sideNav a");

    var currentPath = window.location.pathname.endsWith('/') ? window.location.pathname.slice(0, -1) : window.location.pathname;
    currentPath = currentPath.split('/').pop();

    links.forEach(function(link) {
        var linkHref = link.getAttribute("href").endsWith('/') ? link.getAttribute("href").slice(0, -1) : link.getAttribute("href");
        linkHref = linkHref.split('/').pop();

        if (linkHref === currentPath) {
            link.classList.add("active");
        }

        // Close nav on link click for mobile
        link.addEventListener("click", function() {
            if (window.innerWidth <= 700) {
                sideNav.style.width = "0"; // Close nav
            }
        });
    });
});