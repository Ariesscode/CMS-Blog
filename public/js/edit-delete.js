function deletePost(id) {
 

    const response = fetch('/api/dashboard/'+ id, {
        method: 'DELETE',
    })
    if (response.ok) {
        console.log('Post has been deleted');
        document.location.replace('/api/dashboard');
    } else {
        console.error('Post could not be deleted.');
    }
}

function editPost(id) {
    const response = fetch('/api/dashboard/'+ id, {
        method: 'DELETE',
    })
    if (response.ok) {
        console.log('Post has been edited');
        //Reloads the page to show the post has been edited
        document.location.replace('/api/dashboard');
    } else {
        console.error('Post could not be edited.');
    }
}

