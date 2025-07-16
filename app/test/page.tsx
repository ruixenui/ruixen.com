import { ExperienceCard } from "@/components/ruixen/ExperienceCard";

export default function Test() {
    return (
        <div>
            <h1>
            ExperienceCard
            </h1>
            <ExperienceCard work={{
                company: "Company",
                title: "Title",
                description: "Description",
                start: "Start",
                end: "End",
                star_tag: "Star Tag",
                badges: ["Badge 1", "Badge 2", "Badge 3"]
            }} />
        </div>
    )
}