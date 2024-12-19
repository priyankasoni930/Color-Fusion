import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AiColorSuggestion from "@/components/AiColorSuggestion";

const AiColorGenerator = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            AI Color Generator
          </h1>
          <Button variant="outline" asChild>
            <Link to="/custom-palette">Back to Custom Palette</Link>
          </Button>
        </div>

        <div className="space-y-8">
          <p className="text-lg text-gray-600">
            Describe a theme or mood, and our AI will generate a perfect color and its shades for you.
          </p>
          <AiColorSuggestion />
        </div>
      </div>
    </div>
  );
};

export default AiColorGenerator;