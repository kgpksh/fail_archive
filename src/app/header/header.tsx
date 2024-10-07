import AuthButtons from "../../components/authButtons";

const Header = () => {
    return (
        <nav className="flex mt-5 p-5">
            <div className="ml-auto">
                <AuthButtons/>
            </div>
        </nav>
    )
}

export default Header