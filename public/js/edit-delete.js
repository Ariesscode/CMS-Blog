
document.body.addEventListener('click', function (event) {
    if (event.target.matches('.deleteBtn')) {
        const postIdToDelete = event.target.dataset.postId;

        deletePost(postIdToDelete);
    }

    if (event.target.matches('.editBtn')) {
        const postIdToEdit = event.target.dataset.postId;
        editPost(postIdToEdit);
        // fetchUserPosts(postIdToEdit);
    }
   
});
async function deletePost(id) {
    try {
        console.log('Deleting post with id:', id);

        const response = await fetch(`/api/dashboard/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('Deleting post with id:', id);
            window.location.replace('/api/dashboard');

            console.log('Post has been deleted');
           
        } else {
            console.error('Error deleting post:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error deleting post:', error);
    }
}

async function editPost(postIdToEdit) {
    
    try {
        document.getElementById('create-post-button').innerText = 'Edit Post';


        const post = userPosts.findOne(post => post.id === postIdToEdit);
        console.log(userPosts)

        if (post) {
            console.log(post);
            document.querySelector(".title").value = post.title;
            document.querySelector(".text").value = post.text;

            document.querySelector("#create-post-button").setAttribute("data-edit", postIdToEdit);
        } else {
            console.error('Post not found in user\'s post history.');
        }
    } catch (error) {
        console.error('Error editing post:', error);
    }
}

async function editPost(id) {
    try {
        console.log(id);
        const response = await fetch(`/api/dashboard/${id}`, {
            method: 'GET',
        }); 

        if (response.ok) {
            const userPosts = await response.json();
            console.log(userPosts);
           return userPosts;
           
        } else {
            console.error('Failed to fetch user posts.');
            
        }
    } catch (error) {
        console.error('Error fetching user posts:', error);
        
    }
}
// // async function editPost(postIdToEdit) {
    
//     try {
//         document.getElementById('create-post-button').innerText = 'Edit Post';


//         const post = userPosts.findOne(post => post.id === postIdToEdit);
//         console.log(userPosts)

//         if (post) {
//             console.log(post);
//             document.querySelector(".title").value = post.title;
//             document.querySelector(".text").value = post.text;

//             document.querySelector("#create-post-button").setAttribute("data-edit", postIdToEdit);
//         } else {
//             console.error('Post not found in user\'s post history.');
//         }
//     } catch (error) {
//         console.error('Error editing post:', error);
//     }
// }





