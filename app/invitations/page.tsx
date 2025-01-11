'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'

interface Invitation {
  id: number
  eventName: string
  creatorName: string
}

export default function Invitations() {
  const [invitations, setInvitations] = useState<Invitation[]>([])

  useEffect(() => {
    // Fetch invitations from API
    // This is a placeholder. Replace with actual API call.
    setInvitations([
      { id: 1, eventName: "Camping Trip to Yosemite", creatorName: "John Doe" },
      { id: 2, eventName: "Beach Day", creatorName: "Jane Smith" },
    ])
  }, [])

  const handleAccept = (id: number) => {
    // Accept invitation logic
    console.log(`Accepted invitation ${id}`)
  }

  const handleDecline = (id: number) => {
    // Decline invitation logic
    console.log(`Declined invitation ${id}`)
  }

  return (
    <div className="bg-background dark:bg-[#181C14] min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4 text-foreground">Invitations</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {invitations.map((invitation) => (
          <Card key={invitation.id} className="bg-card dark:bg-[#3C3D37]">
            <CardHeader>
              <CardTitle className="text-card-foreground">{invitation.eventName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground dark:text-[#697565]">Created by: {invitation.creatorName}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={() => handleAccept(invitation.id)} className="bg-primary text-primary-foreground hover:bg-primary/90">Accept</Button>
              <Button variant="outline" onClick={() => handleDecline(invitation.id)} className="border-primary text-primary hover:bg-primary/10">Decline</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

