import { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Button from "../components/button";
import SignupForm from "./signup";
import LoginForm from "./login";
const WelcomePage = () => {
    const [activeForm, setActiveForm] = useState("signup"); // 'signup', 'login'

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header onLoginClick={() => setActiveForm('login')} onSignupClick={() => setActiveForm('signup')} />

            <main className="flex-grow flex flex-col lg:flex-row items-center justify-center px-8 lg:px-20 py-12">
                <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                        Simplify your e-commerce business
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Manage products, inventory, and orders in one place. Start in minutes, no installation required.
                    </p>
                    <div className="flex justify-center lg:justify-start gap-4">
                        <Button onClick={() => setActiveForm('signup')}>Sign Up</Button>
                        <Button variant="secondary" onClick={() => setActiveForm('login')}>Login</Button>
                    </div>
                </div>

                <div className="w-full max-w-md mx-auto">
                    {activeForm === 'signup' && <SignupForm />}
                    {activeForm === 'login' && <LoginForm />}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default WelcomePage;