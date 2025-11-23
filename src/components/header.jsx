import Button from "./button";

const Header = ({ onLoginClick, onSignupClick }) => (
    <header className="flex justify-between items-center p-6 bg-white shadow">
        <h1 className="text-2xl font-bold text-indigo-600">MyERP</h1>
        <div className="flex gap-4">
            <Button onClick={onSignupClick} variant="tertiary"> Sign Up </Button>
            <Button onClick={onLoginClick} variant="tertiary"> Login </Button>
        </div>
    </header>
);

export default Header;