const url = 'https://jsonplaceholder.typicode.com/posts' ,
$loadingElement = document.querySelector('#loading') , 
$postsContainer = document.querySelector('#posts-container');

const postPage = document.querySelector('#post') 
const postContainer = document.querySelector('#post-container');
const commentContainer = document.querySelector('#comment-form') 

const commentForm = document.querySelector('#comment-form');
const emailInput = document.querySelector('#email')
const bodyInput = document.querySelector('#body');

//get id from URL7
const urlSearchParams = new URLSearchParams(window.location.search);
const postId = urlSearchParams.get("id") 

//get all posts
async function getAllPosts() {
    const response = await fetch(url);
    const data = await response.json();

    $loadingElement.classList.add('hide');

    data.map((post) => {
        const divP = document.createElement('div');
        const title =  document.createElement('h2');
        const body =  document.createElement('p');
        const link =  document.createElement('a');

        title.innerText = post.title
        body.innerText = post.body
        link.innerText = 'ler'
        link.setAttribute('href', `/post.html?id=${post.id}`);
    
        divP.appendChild(title)
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
    postPage.classList.remove('hide')

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


