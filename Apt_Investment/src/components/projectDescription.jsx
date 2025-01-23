import { Card, CardContent } from "@/components/ui/card";

export function ProjectDescription({ description }) {
  return (
    <div className="mt-12 bg-gray-100"> {/* Set background color here */}
      <h2 className="text-3xl font-semibold mb-4 text-gray-900 mt-10">Project Details</h2>
      <div className="space-y-4">
        <Card className="bg-gray-100 border-none shadow-none p-0"> {/* Set background color and remove shadow */}
          <CardContent className="p-6">
            <p className="text-gray-600 leading-relaxed text-l">{description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
