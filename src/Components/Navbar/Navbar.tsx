import guilderLogo from "../../assets/guilderLogo.png"
import "./Navbar.css"

type Props = {}

function Navbar({}: Props) {
  return (
    <div className='navbar'>
        <div>
            <img src={guilderLogo} />
            <ul>
                <li>Portfolio</li>
                <li>Discover</li>
                <li>Create</li>
                <li>Help</li>
            </ul>
        </div>
        <div>
            <input type="text" placeholder='Search...'/>
            <ul>
                <li>Profile</li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar