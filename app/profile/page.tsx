'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

interface NotificationPreferences {
  email: boolean
  push: boolean
}

export default function ProfilePage() {
  const { user, isLoaded } = useUser() // Fetch Clerk user data
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    notificationPreferences: {
      email: true,
      push: true,
    },
  })

  const [loading, setLoading] = useState(true)

  // Initialize profile data
  useEffect(() => {
    if (isLoaded) {
      if (user) {
        // User is logged in, fetch actual data
        const initializeProfile = async () => {
          try {
            const response = await fetch('/api/preferences')
            if (!response.ok) throw new Error('Failed to fetch preferences')

            const data = await response.json()

            setProfile({
              name: user.fullName || 'User',
              email: user.emailAddresses[0]?.emailAddress || '',
              notificationPreferences: {
                email: data?.emailNotifications || false,
                push: data?.pushNotifications || false,
              },
            })
          } catch (error) {
            console.error('Error initializing profile:', error)
          } finally {
            setLoading(false)
          }
        }

        initializeProfile()
      } else {
        // User is not logged in, show mock data
        setProfile({
          name: 'Jon Doe',
          email: 'jon@acme.com',
          notificationPreferences: {
            email: false,
            push: false,
          },
        })
        setLoading(false)
      }
    }
  }, [isLoaded, user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleNotificationChange = (type: keyof NotificationPreferences) => {
    setProfile((prev) => ({
      ...prev,
      notificationPreferences: {
        ...prev.notificationPreferences,
        [type]: !prev.notificationPreferences[type],
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      console.log('Cannot save changes in mock mode')
      return
    }

    try {
      // Update Clerk user data
      await user.update({
        firstName: profile.name.split(' ')[0] || user.firstName || '',
        lastName: profile.name.split(' ')[1] ?? user.lastName,
      })

      // Update app-specific preferences
      await fetch('/api/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile.notificationPreferences),
      })

      console.log('Profile updated successfully:', profile)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="bg-background dark:bg-[#181C14] min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4 text-foreground">Profile Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
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
        {/* Email */}
        <div>
          <Label htmlFor="email" className="text-foreground">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={profile.email}
            readOnly={!user} // Only editable when logged in
            className="bg-input dark:bg-[#3C3D37] text-foreground"
          />
        </div>
        {/* Notification Preferences */}
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
        {/* Save Changes */}
        <Button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={!user} // Disable button in mock mode
        >
          Save Changes
        </Button>
      </form>
    </div>
  )
}
