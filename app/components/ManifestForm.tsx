'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ManifestForm() {
  const [title, setTitle] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/manifest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
    if (response.ok) {
      setTitle('')
      // You might want to add some feedback here, like updating a global state
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter manifest title (e.g., Camping Trip)"
        className="mb-2"
      />
      <Button type="submit">Create Manifest</Button>
    </form>
  )
}

