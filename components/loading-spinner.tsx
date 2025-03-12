import Lottie from "lottie-react";
import loadingAnimation from "../public/animation/loading.json"; // Sesuaikan path jika di Next.js

const LoadingSpinner = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <Lottie
                animationData={loadingAnimation}
                loop={true}
                className="w-32 h-32"
            />
        </div>
    );
};

export default LoadingSpinner;
