'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

interface UserProfile {
  name: string
  email: string
  notificationPreferences: {
    email: boolean
    push: boolean
  }
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    notificationPreferences: {
      email: true,
      push: true,
    },
  })

  useEffect(() => {
    // Fetch user profile from API
    // This is a placeholder. Replace with actual API call.
    setProfile({
      name: "John Doe",
      email: "john@example.com",
      notificationPreferences: {
        email: true,
        push: false,
      },
    })
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleNotificationChange = (type: 'email' | 'push') => {
    setProfile({
      ...profile,
      notificationPreferences: {
        ...profile.notificationPreferences,
        [type]: !profile.notificationPreferences[type],
      },
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Submit profile changes to API
    console.log('Profile updated:', profile)
  }

  return (
    <div className="bg-background dark:bg-[#181C14] min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4 text-foreground">Profile Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-foreground">Name</Label>
          <Input
            id="name"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            className="bg-input dark:bg-[#3C3D37] text-foreground"
          />
        </div>
        <div>
          <Label htmlFor="email" className="text-foreground">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleInputChange}
            className="bg-input dark:bg-[#3C3D37] text-foreground"
          />
        </div>
        <div>
          <Label className="text-foreground">Notification Preferences</Label>
          <div className="flex items-center space-x-2">
            <Switch
              id="email-notifications"
              checked={profile.notificationPreferences.email}
              onCheckedChange={() => handleNotificationChange('email')}
            />
            <Label htmlFor="email-notifications" className="text-foreground">Email Notifications</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="push-notifications"
              checked={profile.notificationPreferences.push}
              onCheckedChange={() => handleNotificationChange('push')}
            />
            <Label htmlFor="push-notifications" className="text-foreground">Push Notifications</Label>
          </div>
        </div>
        <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
      </form>
    </div>
  )
}

