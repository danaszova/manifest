'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface Manifest {
  id: number
  title: string
}

export default function Dashboard() {
  const [manifests, setManifests] = useState<Manifest[]>([])

  useEffect(() => {
    // Fetch manifests from API
    // This is a placeholder. Replace with actual API call.
    setManifests([
      { id: 1, title: "Camping Trip to Yosemite" },
      { id: 2, title: "Beach Day" },
    ])
  }, [])

  return (
    <div className="bg-background dark:bg-[#181C14] min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4 text-foreground">Dashboard</h1>
      <Button asChild className="mb-4 bg-primary text-primary-foreground hover:bg-primary/90">
        <Link href="/manifest/new">Create New Manifest</Link>
      </Button>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {manifests.map((manifest) => (
          <Card key={manifest.id} className="bg-card dark:bg-[#3C3D37]">
            <CardHeader>
              <CardTitle className="text-card-foreground">{manifest.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href={`/manifest/${manifest.id}`} className="w-full">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                  View Manifest
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

