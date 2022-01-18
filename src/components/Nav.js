import React, { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

function Nav() {

    const [show, handleShow] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100){
                handleShow(true);
            }
            else {
                handleShow(false)
            }
        });
    }, [])

    return (
        <div className={`nav ${show && "nav-black"}`}>
            <img
                onClick={() => navigate("/")}
                className="nav-logo"
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                alt="Griff Reviews"
            />
            <img
                onClick={() => navigate("/search")}
                className="nav-search"
                src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik03Mi4yNCwxMC4zMmMtMzIuMjYzNDQsMCAtNTguNDgsMjYuMjE2NTYgLTU4LjQ4LDU4LjQ4YzAsMzIuMjYzNDQgMjYuMjE2NTYsNTguNDggNTguNDgsNTguNDhjMTIuNzY1NjMsMCAyNC41NjM3NSwtNC4xMTE4NyAzNC4xODUsLTExLjA3MjVsNDUuMjU3NSw0NS4xNWw5LjY3NSwtOS42NzVsLTQ0LjcyLC00NC44Mjc1YzguNzg4MTMsLTEwLjIzOTM3IDE0LjA4MjUsLTIzLjUyOTA2IDE0LjA4MjUsLTM4LjA1NWMwLC0zMi4yNjM0NCAtMjYuMjE2NTYsLTU4LjQ4IC01OC40OCwtNTguNDh6TTcyLjI0LDE3LjJjMjguNTQxMjUsMCA1MS42LDIzLjA1ODc1IDUxLjYsNTEuNmMwLDI4LjU0MTI1IC0yMy4wNTg3NSw1MS42IC01MS42LDUxLjZjLTI4LjU0MTI1LDAgLTUxLjYsLTIzLjA1ODc1IC01MS42LC01MS42YzAsLTI4LjU0MTI1IDIzLjA1ODc1LC01MS42IDUxLjYsLTUxLjZ6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4="
                alt="Search"
            />
            <img
                onClick={() => navigate("/profile")}
                className="nav-avatar"
                src="https://www.pinclipart.com/picdir/big/526-5262740_rammy-from-castle-crashers-clipart.png"
                alt="Your Avatar"
            />
        </div>
    )
}

export default Nav
