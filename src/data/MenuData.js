let user = JSON.parse(localStorage.getItem("userData"));
const isAuthenticated = localStorage.getItem("isAuthenticated");

export const MenuData = [
    {title : 'Home', link: '/home'},
    {title : 'Attractions', link: '/attractions'},
    user === null && {title : 'Register', link : '/register'}, 
    user != null && user.role === "ROLE_CLIENT" && {title : 'About', link: '/about'},
    user != null && user.userRole === "ROLE_CLIENT" && {title : "Wishlist", link : '/wishlist'},
]