'use client'

import React from 'react'
import { useUser, useAuth } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Header } from '@/components/header'
import { SignIn } from '@clerk/nextjs'

const TestPage = () => {
  const { user, isLoaded } = useUser()
  const { getToken } = useAuth()

  const [token, setToken] = React.useState<string>('')
  const [sessionData, setSessionData] = React.useState<any>(null)

  React.useEffect(() => {
    const fetchToken = async () => {
      try {
        const tokenValue = await getToken()
        setToken(tokenValue || 'No token available')
      } catch (error) {
        console.error('Error fetching token:', error)
        setToken('Error fetching token')
      }
    }

    if (isLoaded && user) {
      fetchToken()
      // Get session data
      setSessionData({
        userId: user.id,
        emailAddresses: user.emailAddresses,
        phoneNumbers: user.phoneNumbers,
        web3Wallets: user.web3Wallets,
        externalAccounts: user.externalAccounts,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt || null,
        lastSignInAt: user.lastSignInAt,
        imageUrl: user.imageUrl,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        username: user.username,
        primaryEmailAddress: user.primaryEmailAddress,
        primaryPhoneNumber: user.primaryPhoneNumber,
      })
    }
  }, [isLoaded, user, getToken])

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>Please sign in to view your profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <SignIn 
                  appearance={{
                    elements: {
                      logoImage: "hidden",
                      logoBox: "hidden",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      socialButtonsBlockButton: "bg-primary text-primary-foreground hover:bg-primary/90",
                      formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
                      card: "shadow-none border-0",
                      header: "hidden",
                      footer: "hidden"
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto p-6 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">User Profile</h1>
          <p className="text-muted-foreground">Your Clerk authentication details</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* User Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.imageUrl} alt={user.fullName || 'User'} />
                  <AvatarFallback>
                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-xl font-semibold">{user.fullName}</div>
                  <div className="text-sm text-muted-foreground">@{user.username || 'No username'}</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-sm">{user.primaryEmailAddress?.emailAddress || 'No email'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">User ID</label>
                <p className="text-sm font-mono text-xs bg-muted p-2 rounded">{user.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Created</label>
                <p className="text-sm">{user.createdAt ? new Date(user.createdAt).toLocaleString() : 'Not available'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Last Sign In</label>
                <p className="text-sm">{user.lastSignInAt ? new Date(user.lastSignInAt).toLocaleString() : 'Never'}</p>
              </div>
            </CardContent>
          </Card>

          {/* Token Card */}
          <Card>
            <CardHeader>
              <CardTitle>Authentication Token</CardTitle>
              <CardDescription>Your current session token</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">JWT Token</label>
                <div className="bg-muted p-3 rounded-md">
                  <p className="text-xs font-mono break-all">
                    {token.length > 100 ? `${token.substring(0, 100)}...` : token}
                  </p>
                </div>
                <Badge variant="secondary" className="mt-2">
                  {token.length > 100 ? 'Token truncated' : 'Full token'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Session Data Card */}
        <Card>
          <CardHeader>
            <CardTitle>Session Data</CardTitle>
            <CardDescription>Complete user session information</CardDescription>
          </CardHeader>
          <CardContent>
            {sessionData ? (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">First Name</label>
                    <p className="text-sm">{sessionData.firstName || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                    <p className="text-sm">{sessionData.lastName || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Username</label>
                    <p className="text-sm">{sessionData.username || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Updated At</label>
                    <p className="text-sm">{sessionData.updatedAt ? new Date(sessionData.updatedAt).toLocaleString() : 'Not available'}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email Addresses</label>
                  <div className="space-y-1 mt-1">
                    {sessionData.emailAddresses?.map((email: any, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-sm">{email.emailAddress}</span>
                        {email.id === sessionData.primaryEmailAddress?.id && (
                          <Badge variant="default" className="text-xs">Primary</Badge>
                        )}
                      </div>
                    )) || <p className="text-sm text-muted-foreground">No email addresses</p>}
                  </div>
                </div>

                <Separator />

                <div>
                  <label className="text-sm font-medium text-muted-foreground">External Accounts</label>
                  <div className="space-y-1 mt-1">
                    {sessionData.externalAccounts?.map((account: any, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-sm">{account.provider} - {account.emailAddress}</span>
                      </div>
                    )) || <p className="text-sm text-muted-foreground">No external accounts</p>}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">Loading session data...</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TestPage 