import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const discounts = [
  { id: 1, name: "Summer Sale", code: "SUMMER20", percentage: 20, startDate: "2023-06-01", endDate: "2023-08-31" },
  { id: 2, name: "New User", code: "NEWUSER10", percentage: 10, startDate: "2023-01-01", endDate: "2023-12-31" },
  { id: 3, name: "Holiday Special", code: "HOLIDAY15", percentage: 15, startDate: "2023-12-01", endDate: "2023-12-25" },
]

export default function DiscountTable() {
  return (
    <Table>
      <TableHeader className="bg-blue-500">
        <TableRow>
          <TableHead className="text-white">Name</TableHead>
          <TableHead className="text-white">Code</TableHead>
          <TableHead className="text-white">Percentage</TableHead>
          <TableHead className="text-white">Start Date</TableHead>
          <TableHead className="text-white">End Date</TableHead>
          <TableHead className="text-white">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {discounts.map((discount, index) => (
          <TableRow key={discount.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
            <TableCell>{discount.name}</TableCell>
            <TableCell>{discount.code}</TableCell>
            <TableCell>{discount.percentage}%</TableCell>
            <TableCell>{discount.startDate}</TableCell>
            <TableCell>{discount.endDate}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" className="mr-2">
                Edit
              </Button>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
