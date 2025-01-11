'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PlusCircle, Trash2, UserPlus, Send } from 'lucide-react'

interface Item {
  id: number
  name: string
  quantity: number
  assignedTo: string
  status: 'Pending' | 'Acquired'
}

interface Participant {
  id: number
  name: string
  avatar: string
}

interface Comment {
  id: number
  author: string
  avatar: string
  content: string
  timestamp: string
}

export default function ManifestPage({ id }: { id: string }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [items, setItems] = useState<Item[]>([])
  const [newItem, setNewItem] = useState({ name: '', quantity: 1, assignedTo: '' })
  const [participants, setParticipants] = useState<Participant[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    // Fetch manifest details from API
    // This is a placeholder. Replace with actual API call.
    setTitle(`Camping Trip to Yosemite (ID: ${id})`)
    setDescription("Our annual camping trip to Yosemite National Park")
    setItems([
      { id: 1, name: "Tent", quantity: 2, assignedTo: "John", status: "Acquired" },
      { id: 2, name: "Sleeping Bags", quantity: 4, assignedTo: "Sarah", status: "Pending" },
      { id: 3, name: "Camping Stove", quantity: 1, assignedTo: "Mike", status: "Pending" },
      { id: 4, name: "First Aid Kit", quantity: 1, assignedTo: "Emily", status: "Acquired" },
    ])
    setParticipants([
      { id: 1, name: "John Doe", avatar: "/placeholder.svg" },
      { id: 2, name: "Sarah Smith", avatar: "/placeholder.svg" },
      { id: 3, name: "Mike Johnson", avatar: "/placeholder.svg" },
      { id: 4, name: "Emily Brown", avatar: "/placeholder.svg" },
    ])
    setComments([
      { id: 1, author: "John Doe", avatar: "/placeholder.svg", content: "I'll bring the extra tent!", timestamp: "2023-05-10T14:30:00Z" },
      { id: 2, author: "Sarah Smith", avatar: "/placeholder.svg", content: "Great! I'll take care of the sleeping bags.", timestamp: "2023-05-10T15:45:00Z" },
    ])
  }, [id])

  const handleAddItem = () => {
    const item: Item = {
      id: Date.now(),
      ...newItem,
      status: 'Pending'
    }
    setItems([...items, item])
    setNewItem({ name: '', quantity: 1, assignedTo: '' })
  }

  const handleItemStatusChange = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, status: item.status === 'Pending' ? 'Acquired' : 'Pending' } : item
    ))
  }

  const handleDeleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        author: "You", // Replace with actual user name
        avatar: "/placeholder.svg", // Replace with actual user avatar
        content: newComment,
        timestamp: new Date().toISOString()
      }
      setComments([...comments, comment])
      setNewComment('')
    }
  }

  const progress = Math.round((items.filter(item => item.status === 'Acquired').length / items.length) * 100)

  return (
    <div className="bg-background dark:bg-[#181C14] min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-foreground">{title}</h1>
        <p className="text-muted-foreground dark:text-[#697565] mb-4">{description}</p>
        
        <Tabs defaultValue="items" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="items">
            <Card>
              <CardHeader>
                <CardTitle>Manifest Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 space-y-2">
                  <Input
                    type="text"
                    placeholder="Item name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    className="bg-input dark:bg-[#3C3D37] text-foreground"
                  />
                  <Input
                    type="number"
                    placeholder="Quantity"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value)})}
                    className="bg-input dark:bg-[#3C3D37] text-foreground"
                  />
                  <Input
                    type="text"
                    placeholder="Assigned to"
                    value={newItem.assignedTo}
                    onChange={(e) => setNewItem({...newItem, assignedTo: e.target.value})}
                    className="bg-input dark:bg-[#3C3D37] text-foreground"
                  />
                  <Button onClick={handleAddItem} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Item
                  </Button>
                </div>
                
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={item.status === 'Acquired'}
                          onCheckedChange={() => handleItemStatusChange(item.id)}
                          id={`item-${item.id}`}
                        />
                        <Label htmlFor={`item-${item.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {item.name} (x{item.quantity}) - {item.assignedTo}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={item.status === 'Acquired' ? 'default' : 'secondary'}>
                          {item.status}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
            
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="w-full" />
                <p className="mt-2 text-sm text-muted-foreground dark:text-[#697565]">
                  {items.filter(item => item.status === 'Acquired').length} out of {items.length} items acquired
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="participants">
            <Card>
              <CardHeader>
                <CardTitle>Participants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src={participant.avatar} alt={participant.name} />
                        <AvatarFallback>{participant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{participant.name}</span>
                    </div>
                  ))}
                </div>
                <Button className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <UserPlus className="mr-2 h-4 w-4" /> Invite Participant
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="comments">
            <Card>
              <CardHeader>
                <CardTitle>Comments</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-4 mb-4">
                      <Avatar>
                        <AvatarImage src={comment.avatar} alt={comment.author} />
                        <AvatarFallback>{comment.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold">{comment.author}</h4>
                          <span className="text-xs text-muted-foreground dark:text-[#697565]">
                            {new Date(comment.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="mt-1 text-sm">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
                <div className="mt-4 flex space-x-2">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-1 bg-input dark:bg-[#3C3D37] text-foreground"
                  />
                  <Button onClick={handleAddComment} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

