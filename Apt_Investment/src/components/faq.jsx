import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

function FAQ() {
  const { t, i18n } = useTranslation()
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch FAQ data based on the selected language
    fetch(`/data/faq_${i18n.language}.json`) // Ensure you have language-specific files like `faq_en.json`, `faq_bn.json`
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch FAQ data')
        }
        return res.json()
      })
      .then((jsonData) => {
        setData(jsonData)
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setIsLoading(false)
      })
  }, [i18n.language]) // Re-fetch when language changes

  if (isLoading) return <div className="text-center py-8">Loading...</div>
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Accordion type="single" collapsible className="w-full space-y-4">
        {data.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index + 1}`}
            className="border rounded-lg px-4"
          >
            <AccordionTrigger className="text-lg font-medium py-4 hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pb-4">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default FAQ
