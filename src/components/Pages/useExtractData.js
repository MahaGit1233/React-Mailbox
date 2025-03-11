const useExtractMailData = (text = "") => {
    const parts = text.split(".");
    return {
        greeting: parts[0] ? parts[0] + "." : "",
        body: parts[1] ? parts[1] + "." : "",
        closing: parts[2] ? parts[2].trim() : "",
        senderEmail: parts[3] ? parts[3].trim() : "",
        com: parts[4] ? parts[4].trim() : "",
    };
};

export default useExtractMailData;
