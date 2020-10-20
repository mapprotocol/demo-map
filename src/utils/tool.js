const checkEthereum = () => {
    if (window.ethereum) {
        return true
    } else {
        return false
    }
}


export {checkEthereum}
