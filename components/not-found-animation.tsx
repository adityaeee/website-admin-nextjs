import Lottie from "lottie-react";
import animationNotFound from "../public/animation/page-not-found.json"; // Sesuaikan path jika di Next.js

const NotFoundAnimation = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[9999]">
            <Lottie
                animationData={animationNotFound}
                loop={true}
                className="w-[50rem] h-[50rem]"
            />
        </div>
    );
};

export default NotFoundAnimation;
