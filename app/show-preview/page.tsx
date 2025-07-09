import Link from "next/link";
import { notFound } from "next/navigation";
import sectionsMap from "../map";

export default function ShowPreviewList() {
  const previews = Object.keys(sectionsMap);

  if (previews.length === 0) {
    return notFound();
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Previews</h1>
      <div className="grid gap-4">
        {previews.map((preview) => (
          <Link 
            key={preview}
            href={`/show-preview/${preview}`}
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-xl font-semibold">{preview}</h2>
            <p className="text-gray-600">/show-preview/{preview}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
