import { useEffect, useState } from "react";
import { getImages } from "../services/Problemas";

export const ImageGallery = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            const data = await getImages();
            setImages(data);
            console.log(data);
            const urls = data.map(function (obj) {
                return obj.url;
            });
console.log(urls);
        };
        fetchImages();
    }, []);

    return (
        <div>
            {images.map((image, index) => (
                <img
                    key={index}
                    src={`http://localhost:8080${image.url}`}
                    alt={image.filename}
                />
            ))}
        </div>
    );
};


