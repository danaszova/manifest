'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Item {
  id: number
  name: string
  assignedTo: string
}

export default function ItemList() {
  const [items, setItems] = useState<Item[]>([])
  const [newItem, setNewItem] = useState('')
  const [assignee, setAssignee] = useState('')

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const response = await fetch('/api/items')
    if (response.ok) {
      const data = await response.json()
      setItems(data)
    }
  }

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newItem, assignedTo: assignee }),
    })
    if (response.ok) {
      setNewItem('')
      setAssignee('')
      fetchItems()
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Manifest Items</h2>
      <form onSubmit={handleAddItem} className="mb-4">
        <Input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="New item"
          className="mb-2"
        />
        <Input
          type="text"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          placeholder="Assigned to"
          className="mb-2"
        />
        <Button type="submit">Add Item</Button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="mb-2">
            {item.name} - Assigned to: {item.assignedTo}
          </li>
        ))}
      </ul>
    </div>
  )
}

