import React from 'react';

const Navbar = () => {

    const user = JSON.parse(localStorage.getItem('currentUser'))

    function logout(){
        
        localStorage.removeItem('currentUser')
        window.location.href='/login'
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="/">YourRooms</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"><i class="fa-solid fa-bars" style={{color:'white'}}></i></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav mr-5">
                        {user ? (<>
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className='fa fa-user'></i>&nbsp;&nbsp;{user.name}
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a class="dropdown-item" href="/profile">Profile</a></li>
                                    <li><a class="dropdown-item" href="#" onClick={logout}>Logout</a></li>
                                    
                                </ul>
                            </div>
                        </>) : (<>
                            <li class="nav-item active">
                                <a class="nav-link" href="/register">Register</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/login">Login</a>
                            </li>
                        </>)}
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
