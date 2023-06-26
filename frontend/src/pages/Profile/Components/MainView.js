import React from 'react'

const MainView = () => {
    return (
        <div class='profile-main'>
            <div class="user-info">
                <h2>Current User Info:</h2>
                <p><strong>Username:</strong> JohnDoe</p>
                <p><strong>Email:</strong> john.doe@example.com</p>
            </div>
            
            {/* <form>
                <label for="photo">Photo:</label>
                <input type="file" id="photo" name="photo">
                
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>
                
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
                
                <input type="submit" value="Save">
            </form> */}
        </div> )
}

export default MainView