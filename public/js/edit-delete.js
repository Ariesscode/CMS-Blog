
document.addEventListener('DOMContentLoaded', function() {

    document.body.addEventListener('click', function (event) {
        if (event.target.matches('.deleteBtn')) {
            const postIdToDelete = event.target.dataset.postId;
            deletePost(postIdToDelete);
        }

        if (event.target.matches('#create-post-button')) {
            updatePost();
        }
    });

    // createPostButton.addEventListener('click', updatePost);
});

async function deletePost(id) { //calls delete method to destroy both ui and databse 
    try {
        console.log('Deleting post with id:', id);

        const response = await fetch(`/api/dashboard/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('Deleting post with id:', id);
            window.location.replace('/'); //refresh page

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

            document.querySelector(".input-title").value = post.post_heading;  //fill form with post content title/post body
            document.querySelector(".input-text").value = post.post_body;

            createPostButton.setAttribute("data-edit", postIdToEdit);
            createPostButton.innerText = 'Edit Post';
            createPostForm.setAttribute("action", `/api/dashboard/${postIdToEdit}`);  //remove the method of POST TO PUT, calls put route
            createPostForm.setAttribute("method", "PUT");


        } else {
            console.error('Failed to fetch user post for editing.');
        }
    } catch (error) {
        console.error('Error fetching user post for editing:', error);
    }
}
const createPostButton = document.querySelector("#create-post-button");
const createPostForm = document.querySelector(".edit-create");

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
                    post_heading: title,  //updates database with content
                    post_body: text,
                    postId: postId,
                  }),
                });
        
                if (response.ok) {
                    const responseData = await response.json(); // Parse JSON data
        
                    // Handle the data as needed, e.g., update UI, redirect, etc.
                    console.log('Updated post data:', responseData);
        
                    // Example: Redirect to the dashboard page
                    window.location.replace('/api/dashboard'); //redirect to dashboard page after update 
                } else {
                    console.error('Error updating post:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error updating post:', error);
                // Handle error as needed
            }
        }
    
    
        // createPostButton.addEventListener('click', updatePost);



