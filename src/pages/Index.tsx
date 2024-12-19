import ColorPalette from "@/components/ColorPalette";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f2ebf9] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 flex items-center justify-center gap-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Color Palette Editor
          </h1>
          <Button
            onClick={() => navigate("/gradient")}
            variant="outline"
            className="ml-4"
          >
            Gradient Generation
          </Button>
          <Button
            onClick={() => navigate("/palettes")}
            variant="outline"
            className="ml-4"
          >
            Color Palettes
          </Button>
          <Button
            onClick={() => navigate("/custom-palette")}
            variant="outline"
            className="ml-4"
          >
            Theme Palettes
          </Button>
        </div>
        <p className="mt-3 text-xl text-gray-500 text-center">
          Create and customize your perfect color palette
        </p>

        <ColorPalette />
      </div>
    </div>
  );
};

export default Index;