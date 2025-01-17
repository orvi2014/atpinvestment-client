import { Card, CardContent } from "@/components/ui/card"

export function ProjectDescription({ description }) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Project Details</h2>
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-600 leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

