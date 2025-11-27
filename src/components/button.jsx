const Button = ({ children, variant = "primary", className, ...props }) => {
    const base = "transition select-none flex items-center justify-center";
    const variants = {
        primary: "px-6 py-3 rounded-md bg-indigo-600 text-white hover:bg-indigo-500",
        secondary: "px-6 py-3 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300",
        tertiary: "px-6 py-3 rounded-md text-gray-700 hover:text-indigo-600 font-medium",
        pagination: "w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center",
        danger: "px-6 py-3 rounded-md bg-red-600 text-white hover:bg-red-700",
    };

    return (
        <button className={`${base} ${variants[variant]} ${className}`} {...props}>
            <span className="flex items-center justify-center">{children}</span>
        </button>
    );
};

export default Button;
