let isDark = false
let isSideBarMenu = true

function switchTheme() {
    if (isDark === false) {
        document.getElementById('stylesheet').href = 'darkTheme.css'
        document.getElementById('themeToggle').innerHTML = '☀️'
        isDark = true
    }
    else {
        document.getElementById('stylesheet').href = 'lightTheme.css'
        document.getElementById('themeToggle').innerHTML = '🌙'
        isDark = false
    }
}
function showSideBarMenu() {
    if (isSideBarMenu === false) {
        document.getElementById('sideBarMenu').style.display = 'flex'
        document.getElementById('sideBarMenuBtn').innerHTML = '<p><-</p>'
        isSideBarMenu = true
    }
    else {
        document.getElementById('sideBarMenu').style.display = 'none'
        document.getElementById('sideBarMenuBtn').innerHTML = '<p>-></p>'
        isSideBarMenu = false
    }
}