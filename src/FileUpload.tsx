import React, { useState } from "react";

const FileUploader = () => {
    const [message, setMessage] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<
        "initial" | "uploading" | "success" | "fail"
    >("initial");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setStatus("initial");
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (file) {
            setStatus("uploading");

            const formData = new FormData();
            formData.append("file", file);

            try {
                const result = await fetch("http://localhost:4000/api/v1/record", {
                    method: "POST",
                    body: formData,
                });

                if (result.status === 400) {
                    const jsonData = await result.json();
                    setMessage(jsonData.message);
                    setStatus("fail");
                    return;
                }

                const data = await result.blob();

                showInOtherTab(data);
                setStatus("success");
                setMessage("Report created!")
            } catch (error) {
                console.error(error);
                setStatus("fail");
            }
        }
    };

    const showInOtherTab = (blob: any) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url);
    }

    return (
        <>
            <div className="input-group">
                <label htmlFor="file" className="sr-only">
                    Choose a file
                </label>
                <input id="file" type="file" onChange={handleFileChange} />
            </div>
            {file && (
                <section>
                    File details:
                    <ul>
                        <li>Name: {file.name}</li>
                        <li>Type: {file.type}</li>
                        <li>Size: {file.size} bytes</li>
                    </ul>
                </section>
            )}

            {file && (
                <button onClick={handleUpload} className="submit">
                    Upload a file
                </button>
            )}

            <Result status={status} message={message} />
        </>
    );
};

const Result = ({ status, message }: { status: string, message: string }) => {
    if (status === "success") {
        return <p>✅ File uploaded successfully! {message}</p>
    } else if (status === "fail") {
        return <p>❌ File upload failed! {message}</p>;
    } else if (status === "uploading") {
        return <p>⏳ Uploading selected file...</p>;
    } else {
        return null;
    }
};

export default FileUploader;