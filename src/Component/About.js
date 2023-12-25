import React from 'react'


export const About = () => {
  return (
    <>
    
    <div class="container">
		<div class="jumbotron">
			<h1>About iNotebook</h1>
			<p>iNotebook is a cloud-based note-taking application that allows you to store your notes in the cloud and access them from anywhere.</p>
		</div>
		<div class="row">
			<div class="col-md-6">
				<h2>Features</h2>
				<ul>
					<li>Access notes from anywhere</li>
					<li>Easy to use interface</li>
					<li>Secure login with username and password</li>
					<li>Ability to create, edit, and delete notes</li>
				</ul>
			</div>
			<div class="col-md-6">
				<h2>How to Use</h2>
				<ol>
					<li>Create an account on iNotebook.</li>
					<li>Log in using your username and password.</li>
					<li>Create a new note by clicking on the "Add Note" button.</li>
					<li>Edit a note by clicking on the note you want to edit and making changes in the editor.</li>
					<li>Delete a note by clicking on the note you want to delete and clicking on the "Delete" button.</li>
					<li>Access your notes from anywhere by logging in to iNotebook.</li>
				</ol>
			</div>
		</div>
	</div></>
  )
}
