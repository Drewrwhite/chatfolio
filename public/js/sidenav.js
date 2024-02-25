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

    // Normalize the current path
    var currentPath = window.location.pathname;
    // Remove trailing slash if present
    currentPath = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;
    // Ensure a consistent comparison, especially if hosted in a subdirectory
    currentPath = currentPath.split('/').pop();

    links.forEach(function(link) {
        // Normalize href attribute for comparison
        var linkHref = link.getAttribute("href");
        linkHref = linkHref.endsWith('/') ? linkHref.slice(0, -1) : linkHref;
        linkHref = linkHref.split('/').pop();

        if (linkHref === currentPath) {
            link.classList.add("active");
        }
    });
});
