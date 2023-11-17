async function deletePost(id) {

    const response = await fetch('http://localhost:3001/api/dashboard/'+ id, {
        method: 'DELETE',
    })
    if (response.ok) {
        console.log('Post has been deleted');
        document.location.replace('/dashboard');
    } else {
        console.log(response)
        console.error('Post could not be deleted.');
    }
}
async function editPost(id) {
    const response = await fetch('http://localhost:3001/api/dashboard/'+ id, {
        method: 'PUT',
    })
    if (response.ok) {
        console.log('Post has been edited');
        document.location.replace('/');    
     } else {
        console.error('Post could not be edited.');
    }
}

