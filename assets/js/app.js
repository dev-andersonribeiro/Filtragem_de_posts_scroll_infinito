// Obtendo a referencia da div container para exibir os posts na tela
const postsContainer = document.querySelector('#posts-container')
// Inserindo o loader container
const loaderContainer = document.querySelector('.loader')
// Inserindo a filtragem dos posts
const filterInput = document.querySelector('#filter')



// Fazento uma requisição para obter os posts em url externa
// Utilizando async await
let page = 1

const getPosts = async () => {
    // Executando invocaçao para a requisioção acontecer
    const response = await
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`)
    // Formatando a response em json
    return response.json() 
    
}

const generatePostTemplate = posts => posts.map(({ id, title, body }) => `
    <div class="post">
        <div class="number">${id}</div>
        <div class="post-info">
        <h2 class="post-title">${title}</h2>
        <p class="post-body">${body}</p>
        </div>
    </div>
`).join('')// <-- transformou o array de posts em string
           //usou join com atributo string vazia para não ter nenhum separador


// Inserindo os posts na DOM do HTML
const addPostIntoDOM = async () => {
    const posts = await getPosts()
    const postsTemplate = generatePostTemplate(posts)
    //inserindo as divs dos posts dentro das divs containers
    postsContainer.innerHTML += postsTemplate
}

const getNextPosts = () => {
    // incrementando o valor da page
    setTimeout(() => {
        
        page++
        addPostIntoDOM()
    }, 300)
}
const removeLoader = () => {
    setTimeout(() => {
        loaderContainer.classList.remove('show')
        // inserindo o request e exibição dos próximos posts
        getNextPosts()
    }, 1000)
}
//Adicionando o loader no final da página
const showLoader = () => {
    loaderContainer.classList.add('show')
    // Removendo a classe show do loader
    removeLoader()
}

const handleScrollToPageBottom = () => {
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement
    const isPageBottomAlmostReached = scrollTop + clientHeight
    >= scrollHeight - 10
    if (isPageBottomAlmostReached){
        showLoader()
    }
}

//exibir posts se são compatíveis com os valores digitados no input / show post if match input value

const showPostIfMatchInputValue = inputValue => post => {
    const postTitle = post.querySelector('.post-title').textContent.toLowerCase()
    const postBody = post.querySelector('.post-body').textContent.toLowerCase()

    const postContainsInputValue = postTitle.includes(inputValue)
    | postBody.includes(inputValue)
    
    if (postContainsInputValue){
        post.style.display = 'flex'
        return
    }


    post.style.display = 'none'

}
const handleInputValue = event => {
    const inputValue = event. target.value.toLowerCase()
    const posts = document.querySelectorAll('.post')
    
    posts.forEach(showPostIfMatchInputValue(inputValue))
}

addPostIntoDOM()

//Adicionando o scroll na página
window.addEventListener('scroll', handleScrollToPageBottom )

//Adicionando um event listener no input

filterInput.addEventListener('input', handleInputValue)

