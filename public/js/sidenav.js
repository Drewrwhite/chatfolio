function toggleNav() {
    var sideNav = document.getElementById("sideNav");
    if (sideNav.style.width === "250px" || sideNav.style.width === "100%") {
        sideNav.style.width = "0";
    } else {
        if (window.innerWidth <= 700) {
            sideNav.style.width = "100%"; // Full screen on mobile
        } else {
            sideNav.style.width = "250px"; // Sidebar on desktop
        }
    }
}
document.addEventListener("DOMContentLoaded", function() {
    // Get all the links in the side navigation
    var links = document.querySelectorAll("#sideNav a");

    // Get the current page's URL path
    var currentPath = window.location.pathname.split('/').pop();

    // Iterate over each link in the side navigation
    links.forEach(function(link) {
        // Get the href attribute of the link and compare it to the current URL path
        if (link.getAttribute("href") === currentPath) {
            // If they match, add the "active" class to the link
            link.classList.add("active");
        }
    });
});