import axios from "axios";
import { useEffect, useState } from "react";

export function Home() {
    const [stars, setStars] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState("all");

    useEffect(() => {
        setLoading(true);
        axios
            .get("https://api.le-systeme-solaire.net/rest/bodies/")
            .then((result) => {
                setStars(result.data.bodies);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const filteredStars = stars.filter((star: any) => {
        return (
            (selectedType === "all" || star.isPlanet === (selectedType === "planet")) &&
            star.englishName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <>
            <input
                type="text"
                placeholder="Search for a star"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                <option value="all">All</option>
                <option value="planet">Planets</option>
                <option value="star">Stars</option>
                <option value="moon">Moons</option>
                <option value="dwarf_planet">Dwarf Planets</option>
            </select>
            {loading && "Loading..."}
            {filteredStars.map((star: any) => (
                <p key={star.id}>{star.englishName}</p>
            ))}
        </>
    );
}
