import { useEffect, useState } from "react";

const useAuthor = (seller_email, email) => {
    const [isSeller, setIsSeller] = useState(false);
    useEffect(() => {
        if (seller_email === email) {
            setIsSeller(true);
        }
    },[seller_email,email])
    return [isSeller];

};

export default useAuthor;