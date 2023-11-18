
const createPostButton = document.querySelector("#create-post-button");

document.body.addEventListener('click', function (event) {
    if (event.target.matches('.deleteBtn')) {
        const postIdToDelete = event.target.dataset.postId;

        deletePost(postIdToDelete);
    }
    // if (event.target.matches('.editBtn')) {
    //     const postIdToDelete = event.target.dataset.postId;

    //     editPost(postIdToDelete);
    // }


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
    console.log('Starting editPost with postIdToEdit:', postIdToEdit);
    try {

        console.log('Making GET request for post with ID:', postIdToEdit);

        const response = await fetch('/api/dashboard/' + postIdToEdit, {
            method: 'GET', // Use 'GET' to retrieve the post data
        });

        if (response.ok) {
            const post = await response.json();
            console.log(post);

            document.querySelector(".input-title").value = post.post_heading;
            document.querySelector(".input-text").value = post.post_body;

            createPostButton.setAttribute("data-edit", postIdToEdit);
            createPostButton.innerText = 'Edit Post';
            createPostButton.addEventListener('click', updatePost);

        } else {
            console.error('Failed to fetch user post for editing.');
        }
    } catch (error) {
        console.error('Error fetching user post for editing:', error);
    }
}

    async function updatePost() {
        try {
            const title = document.querySelector(".input-title").value
            const text = document.querySelector(".input-text").value
            const postId = createPostButton.getAttribute('data-edit')
            console.log('Editing post with id:', postId);
    
            const response = await fetch(`/api/dashboard/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    post_heading: title,
                    post_body: text,
                    postId: postId,
                  }),
                });
        
                if (response.ok) {
                  console.log('Post updated successfully');
                  res.redirect('/');
                } else {
                  console.error('Error updating post:', response.status, response.statusText);
                }
              
        
            
        } catch (error) {
            console.error('Error updating post:', error);
            res.status(500).json({ message: 'Internal Server Error' });
          }
        }
    
    



// document.querySelector('.editBtn').addEventListener('click', () => editPost(postIdToEdit));
