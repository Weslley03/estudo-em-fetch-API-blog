const url = 'https://jsonplaceholder.typicode.com/posts' , //determina url da nossa api
$loadingElement = document.querySelector('#loading') , 
$postsContainer = document.querySelector('#posts-container');

const postPage = document.querySelector('#post') 
const postContainer = document.querySelector('#post-container');
const commentContainer = document.querySelector('#comment-form') 

const commentForm = document.querySelector('#comment-form');
const emailInput = document.querySelector('#email')
const bodyInput = document.querySelector('#body');

//get id from URL7
const usp = new URLSearchParams(window.location.search); //cria um objetico, com determinados parametros de consulta, nesse caso 'window.location' (URL ATUAL).search retonar a parte da url que possui os paramtros de consulto, após o ?
const postId = usp.get("id") //utilizado metodo .GET dos objetos URLSearchParams, aparitr do ?, caso tenho um parametro intitulado ID, será armazenado valor na conts

//get all posts
async function getAllPosts() { //declarado uma função assincrona
    const response = await fetch(url); //a resposta do fetch vai ser armazenada no response, caso não tivesse o await, a varialve response receberia Promisse como valor, e os demais codigos não iria funcionar como deveria, await trava essa linha até a resposta da requisição chegar
    const data = await response.json(); //a variavel DATA passa a ser a response, porém convertida de json para objeto
    console.log(data)

    $loadingElement.classList.add('hide'); //no css a gente criou uma classe com o nome HIDE, adicioanmos o $loadingElement a essa classe, a classe está comodisplay: none;, resumindo, deixamos o loadingElement inviisivel

    data.map((post) => { //o .map executa o código em cada item do array
        const divP = document.createElement('div');
        const title =  document.createElement('h2');
        const body =  document.createElement('p');
        const link =  document.createElement('a');

        title.innerText = post.title //pegando o title do post em cada array e passando para title criado acima
        body.innerText = post.body //pegando o body do post em cada array e passando para title criado acima
        link.innerText = 'ler'
        link.setAttribute('href', `/post.html?id=${post.id}`);
    
        divP.appendChild(title) //aqui, se acressenta os dados
        divP.appendChild(body)
        divP.appendChild(link)

        $postsContainer.appendChild(divP)
    })
}

//get individual post
async function getPost(id) {
    const [responsePost, responseComment] = await Promise.all([
        fetch(`${url}/${id}`),
        fetch(`${url}/${id}/comments`)
    ])
    const dataPost = await responsePost.json()
    const dataComment = await responseComment.json()

    $loadingElement.classList.add('hide')
    postPage.classList.remove('hide') //deixa visivel

    const title =  document.createElement('h1');
    const body =  document.createElement('p');
    
    title.innerText = dataPost.title
    body.innerText = dataPost.body

    postContainer.appendChild(title)
    postContainer.appendChild(body)

    dataComment.map((comment) => {
        createComment(comment)
    })
}

function createComment(comment) {
    const div = document.createElement('div');
    const email = document.createElement('h3');
    const commentBody = document.createElement('p');
    
    email.innerText = comment.email
    commentBody.innerText = comment.body

    div.appendChild(email)
    div.appendChild(commentBody)
    
    commentContainer.appendChild(div)
}

async function postComment(comment) {
    const response = await fetch(`${url}/${postId}/comments`, {
        method: 'POST',
        body: comment,
        headers: {
            'Content-type': 'application/json'
        }
    }) 
    const data = await response.json() 
    createComment(data)
}


if (!postId) {
    getAllPosts();
} else {
    getPost(postId)

    //add event comment to form
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault()

        let comment = {
            email: emailInput.value,
            body : bodyInput.value 
        }
        comment = JSON.stringify(comment);

        postComment(comment);
    })
}


