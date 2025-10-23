let isDark = false
let isSideBarMenu = true
const apiKey = '6ef6b1a8dccc40828289087a7d441e33'
let articlesShown = 0
let i = 0
let galleryImages = {
  0: '',
  1: '',
  2: '',
  3: '',
  4: ''
}
let galleryTitle = {
  0: '',
  1: '',
  2: '',
  3: '',
  4: ''
}
let galleryUrl = {
  0: '',
  1: '',
  2: '',
  3: '',
  4: ''
}
let isGuest = true

let accounts = []
fetch('accounts.JSON').then(function(response) {
    return response.json()
}).then(function(data) {
    accounts = Object.values(data)
})



let apiUrl = ''


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
        document.getElementById('sideBarMenuBtn').style.left = '15rem'
        document.getElementById('sideBarMenuBtn').innerHTML = '<p><-</p>'
        isSideBarMenu = true
    }
    else {
        document.getElementById('sideBarMenu').style.display = 'none'
        document.getElementById('sideBarMenuBtn').style.left = '0'
        document.getElementById('sideBarMenuBtn').innerHTML = '<p>-></p>'
        isSideBarMenu = false
    }
}


function getAPI() {
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        let numberOfResults = data.totalResults
        console.log(data.totalResults)
        let articleTitle = data.articles[0].title
        let articleUrl = data.articles[0].url
        let articleImage = data.articles[0].urlToImage
        if (numberOfResults < 5) {
            articlesShown = numberOfResults
        }
        else {
            articlesShown = 5
        }
        for (a = articlesShown; a != -1; a--) {
            galleryImages[a] = data.articles[a].urlToImage
            galleryTitle[a] = data.articles[a].title
            galleryUrl[a] = data.articles[a].url
        }
        document.getElementById('imgInGallery').src = articleImage
        document.getElementById('galleryDesc').innerHTML = articleTitle
        document.getElementById('descLink').href = articleUrl
    })
}
function nextImg() {
    if (i === articlesShown) {
        i = 0
    }
    else {
        i++
    }
    let img = document.getElementById('imgInGallery')
    img.crossOrigin = 'anonymous'
    img.src = galleryImages[i]
    document.getElementById('galleryDesc').innerHTML = galleryTitle[i]
    document.getElementById('descLink').href = galleryUrl[i]
}

function previousImg() {
    if (i === 0) {
        i = articlesShown
    }
    else {
        i--
    }
    document.getElementById("imgInGallery").src = galleryImages[i]
    document.getElementById('galleryDesc').innerHTML = galleryTitle[i]
    document.getElementById('descLink').href = galleryUrl[i]
}

function login() {
    let loginNameOrEmail = document.getElementById('loginName').value;
    let loginPassword = document.getElementById('loginPassword').value;

    accounts.forEach(function(account) {
        if ((account.name == loginNameOrEmail || account.email == loginNameOrEmail) && account.password == loginPassword) {
            let numberOfTags = 0
            account.tags.forEach(function() {
                numberOfTags++
            })

            let tags = account.tags.join(' OR ')
            
            document.getElementById('userName').innerHTML = String(account.name)
            apiUrl = 'https://newsapi.org/v2/everything?language=' + account.language + '&q=' + tags + '&sortBy=popularity&apiKey=' + apiKey
            console.log(apiUrl)
            getAPI()
            isGuest = false
        }
        else {
            console.log('Failure to Login into account ', account.name)
        }
    })
    if (isGuest === true) {
        apiUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + apiKey
        getAPI()
    }
    document.getElementById('loginModal').style.display = 'none'
}

document.addEventListener('keydown', function(keys) {
    if (keys.key == 'Enter') {
            login()
        }
})
    

window.onload = function() {
    document.getElementById('loginModal').style.display = 'block';
};
document.getElementById('loginButton').onclick = function() {
    document.getElementById('loginModal').style.display = 'block'
}
document.getElementById('continueAsGuest').onclick = function() {
    isGuest = true
    apiUrl = 'https://newsapi.org/v2/everything?language=pt&q=saúde&sortBy=popularity&apiKey=' + apiKey
    getAPI()
    document.getElementById('loginModal').style.display = 'none';
};
document.getElementById('login').onclick = function() {
    login()
}