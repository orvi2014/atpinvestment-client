import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const expenses = [
  
]

export default function ExpenseTable() {
  return (
    <Table>
      <TableHeader className="bg-blue-500">
        <TableRow>
          <TableHead className="text-white">Description</TableHead>
          <TableHead className="text-white">Amount</TableHead>
          <TableHead className="text-white">Date</TableHead>
          <TableHead className="text-white">Category</TableHead>
          <TableHead className="text-white">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense , index) => (
          <TableRow key={expense.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
            <TableCell>{expense.description}</TableCell>
            <TableCell>${expense.amount.toFixed(2)}</TableCell>
            <TableCell>{expense.date}</TableCell>
            <TableCell>{expense.category}</TableCell>
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

