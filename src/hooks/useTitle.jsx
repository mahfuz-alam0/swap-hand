const { useEffect } = require("react")

const useTitle = title => {
    useEffect(() => {
        document.title = `${title} - Swap-Hand`
    },[title])
}

export default useTitle;