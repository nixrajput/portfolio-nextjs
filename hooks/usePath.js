import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function usePath() {
    const router = useRouter();
    const [currPath, setCurrPath] = useState("");

    useEffect(() => {
        if (router) {
            let path = router.asPath.slice(1);
            if (path === "") {
                path = "#home";
            }
            setCurrPath(path);
        }
    }, [router]);

    return currPath;
}

export default usePath;